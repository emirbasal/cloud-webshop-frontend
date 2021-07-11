import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/classes/order';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  public currentOrder: Order
  private orderId: string = ""

  private orderIdSub: Subscription = Subscription.EMPTY
  private currentOrderSub: Subscription = Subscription.EMPTY

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.orderIdSub = this.route.paramMap.subscribe((params: ParamMap) => {
      this.orderId = params.get('id');
    });

    this.currentOrderSub = this.apiService.getRequestedOrder().subscribe((order: Order) => {
      if (order != null && order.id === this.orderId) {
        this.currentOrder = order
      }
    })

    setTimeout(() => {
      if (this.currentOrder === undefined) {
        this.apiService.requestInvoice(this.orderId)
      }
    }, 2000)
  }

  ngOnDestroy() {
    this.orderIdSub.unsubscribe()
    this.currentOrderSub.unsubscribe()
  }
}
