import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/classes/product';

@Component({
  selector: '[admin-products-entry]',
  templateUrl: './admin-products-entry.component.html',
  styleUrls: ['./admin-products-entry.component.css']
})
export class AdminProductsEntryComponent implements OnInit {

  @Input() product: Product
  @Output() deleteProduct = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  public onDeleteProduct(): void {
    this.deleteProduct.emit(this.product.id)
  }

}
