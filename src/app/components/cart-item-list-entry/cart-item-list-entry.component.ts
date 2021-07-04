import { Component, Input, OnChanges, OnInit, EventEmitter, Output } from '@angular/core';
import { CartItem } from 'src/app/classes/cartItem';

@Component({
  selector: '[cart-item-list-entry]',
  templateUrl: './cart-item-list-entry.component.html',
  styleUrls: ['./cart-item-list-entry.component.css']
})
export class CartItemListEntryComponent implements OnInit, OnChanges {

  @Output() editQuantity = new EventEmitter
  @Output() removeItem = new EventEmitter


  @Input() item: CartItem

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
  }

  public onEditQuantity(amount: number): void {
    this.editQuantity.emit(amount)
  }

  public onRemoveItem(): void {
    this.removeItem.emit()
  }


}
