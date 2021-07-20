import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/classes/country';
import { Order } from 'src/app/classes/order';
import { OrderItem } from 'src/app/classes/orderItem';
import { Product } from 'src/app/classes/product';
import { ApiService } from 'src/app/services/api.service';

import { countryNamesInEnglish } from 'src/assets/countries/countries_en';
import { countryNamesInGerman } from 'src/assets/countries/countries_de';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  public base64Base: string = "data:image/png;base64,"

  public currentOrder: Order
  private orderId: string = ""

  private orderIdSub: Subscription = Subscription.EMPTY
  private currentOrderSub: Subscription = Subscription.EMPTY

  private requestedProductsSub: Subscription = Subscription.EMPTY

  public isLoading: boolean = false

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.orderIdSub = this.route.paramMap.subscribe((params: ParamMap) => {
      this.orderId = params.get('id');
      this.isLoading = true
    });

    this.currentOrderSub = this.apiService.getRequestedOrder().subscribe((order: Order) => {
      if (order != null && order.id === this.orderId) {
        let itemIds = order.items.map((orderItem: OrderItem) => {
          return orderItem.id
        })

        this.currentOrder = this.adjustDeliveryData(order)
        this.apiService.requestMultipleProductsForOrder(itemIds)
      }
    })

    this.requestedProductsSub = this.apiService.getRequestedProductsForOrder().subscribe((products: Product[]) => {
      if (products != null) {
        for (let orderItem of this.currentOrder.items) {
          let productIndex = products.findIndex((product: Product) => {
            return product?.id === orderItem?.id
          });

          if (productIndex >= 0) {
            orderItem.image = products[productIndex].image
          }
        }
        this.isLoading = false
      }
    })

    setTimeout(() => {
      if (this.currentOrder === undefined) {
        this.apiService.requestOrder(this.orderId)
      } else {
        this.isLoading = false
      }
    }, 1500)

  }

  public refreshPageButtonEvent(): void {
    window.location.reload()
  }

  private adjustDeliveryData(order: Order): Order {
    if (order.deliveryStatus !== undefined) {
      switch (order.deliveryStatus.status) {
        case "sent":
          order.deliveryStatus.status = "wurde versendet"
          order.deliveryStatus.comment = order.deliveryStatus.comment.replace("I've sent: ", 'Folgendes wurde versendet: \n')
          order.deliveryStatus.comment = order.deliveryStatus.comment.replace('\n\nto:\n', "\n\nan:\n")
          order.deliveryStatus.comment = order.deliveryStatus.comment.replace(`\n\n${order.address.state}`,
           `\n\n${this.getGermanCountryName(order.address.country)}`)
          break
        case "confused":
          order.deliveryStatus.status = "fehlerhafte Angabe"

          if (order.deliveryStatus.comment.indexOf("I don't have any ") !== -1) {
            order.deliveryStatus.comment = order.deliveryStatus.comment.replace("I don't have any ", 'Das Produkt gibt es nicht: ')
          } else {
            order.deliveryStatus.comment = order.deliveryStatus.comment.replace("I don't know this country:", 'Dieses Land gibt es nicht:')
            order.deliveryStatus.comment = order.deliveryStatus.comment.replace('!', '')
          }
          break
      }
    }
    return order

  }

  private getGermanCountryName(countryName: string): string {
    const countryNamesEN = countryNamesInEnglish.map((country: Country) => {
      return country.name
    })

    const countryCodesDE = countryNamesInGerman.map((country: Country) => {
      return country.code
    })

    let targetIndexCountry = countryNamesEN.indexOf(countryName)
    let targetCodeCountry = countryNamesInEnglish[targetIndexCountry].code
    let targetIndex = countryCodesDE.indexOf(targetCodeCountry)

    return countryNamesInGerman[targetIndex].name
  }

  ngOnDestroy() {
    this.orderIdSub.unsubscribe()
    this.currentOrderSub.unsubscribe()
    this.requestedProductsSub.unsubscribe()
  }
}
