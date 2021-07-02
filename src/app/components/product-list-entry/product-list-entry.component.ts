import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/classes/product';

@Component({
  selector: '[product-list-entry]',
  templateUrl: './product-list-entry.component.html',
  styleUrls: ['./product-list-entry.component.css']
})
export class ProductListEntryComponent implements OnInit {

  @Input() product: Product
  constructor() { }

  ngOnInit(): void {
  }

}
