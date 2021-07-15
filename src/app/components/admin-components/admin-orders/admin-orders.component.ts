import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/classes/order';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  @Input() orders: Order[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
