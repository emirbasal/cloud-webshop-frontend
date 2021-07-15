
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/classes/product';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  @Input() products: Product[] = []
  @Output() deleteProduct = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  public onDeleteProduct(id: string): void {
    this.deleteProduct.emit(id)
  }
}
