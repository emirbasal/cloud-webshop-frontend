import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/classes/order';

@Component({
  selector: '[admin-orders-entry]',
  templateUrl: './admin-orders-entry.component.html',
  styleUrls: ['./admin-orders-entry.component.css']
})
export class AdminOrdersEntryComponent implements OnInit {

  @Input() order: Order

  constructor() { }

  ngOnInit(): void {
  }

}
