import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/classes/product';

@Component({
  selector: '[product-list-entry]',
  templateUrl: './product-list-entry.component.html',
  styleUrls: ['./product-list-entry.component.css']
})
export class ProductListEntryComponent implements OnInit {

  public base64Base: string = "data:image/png;base64,"

  @Output() addToCart = new EventEmitter()
  @Input() product: Product

  constructor() { }

  ngOnInit(): void {
  }

  public onAddToCart(): void {
    this.addToCart.emit(this.product.id)
  }


}
