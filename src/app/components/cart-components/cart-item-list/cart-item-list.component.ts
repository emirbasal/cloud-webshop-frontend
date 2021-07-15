import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'src/app/classes/cartItem';

@Component({
  selector: 'cart-item-list',
  templateUrl: './cart-item-list.component.html',
  styleUrls: ['./cart-item-list.component.css']
})
export class CartItemListComponent implements OnInit, OnChanges {

  @Output() changeItemQuantity = new EventEmitter()
  @Output() removeItemFromCart = new EventEmitter()

  @Input() items: CartItem[] = []
  @Input() totalSum: number

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  public editQuantity(productId: string, amount: number): void {
    this.changeItemQuantity.emit({ id: productId, amount})
  }

  public removeItem(productId: string): void {
    this.removeItemFromCart.emit(productId)
  }


}
