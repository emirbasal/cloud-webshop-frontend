import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/classes/order';
import { OrderItem } from 'src/app/classes/orderItem';
import { Product } from 'src/app/classes/product';
import { ApiService } from 'src/app/services/api.service';


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

        this.currentOrder = order
        this.apiService.requestMultipleProductsForOrder(itemIds)
      }
    })

    this.requestedProductsSub = this.apiService.getRequestedProductsForOrder().subscribe((products: Product[]) => {
      if (products != null) {
        for (let orderItem of this.currentOrder.items) {
          let produdctIndex = products.findIndex((product: Product) => {
            return product.id === orderItem.id
          });

          orderItem.image = products[produdctIndex].image
          this.isLoading = false
        }

      }
    })

    setTimeout(() => {
      if (this.currentOrder === undefined) {
        this.apiService.requestOrder(this.orderId)
      }
    }, 1500)
  }

  ngOnDestroy() {
    this.orderIdSub.unsubscribe()
    this.currentOrderSub.unsubscribe()
    this.requestedProductsSub.unsubscribe()
  }
}
