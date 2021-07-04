import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartItem } from 'src/app/classes/cartItem';

@Component({
  selector: 'cart-item-list',
  templateUrl: './cart-item-list.component.html',
  styleUrls: ['./cart-item-list.component.css']
})
export class CartItemListComponent implements OnInit, OnChanges {

  @Input() items: CartItem[] = []
  @Input() totalSum: number

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
}
