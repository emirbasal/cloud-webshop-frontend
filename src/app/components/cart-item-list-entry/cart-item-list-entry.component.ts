import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CartItem } from 'src/app/classes/cartItem';

@Component({
  selector: '[cart-item-list-entry]',
  templateUrl: './cart-item-list-entry.component.html',
  styleUrls: ['./cart-item-list-entry.component.css']
})
export class CartItemListEntryComponent implements OnInit, OnChanges {

  @Input() item: CartItem

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

}
