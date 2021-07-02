import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/classes/product';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges {

  @Input() products: Product[]

  public currentProducts: Product[]
  public initialPage: number = 1
  public currentPage: number = this.initialPage
  private productsInPage: number = 12
  public amountOfPages: number = 0
  
  public pageArray: number[] = []


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.calcPages()
  }

  private calcPages(): void {
    let totalProducts: number = this.products.length
    let pages: number = totalProducts / this.productsInPage
    this.amountOfPages = Math.ceil(pages)

    this.currentProducts = this.products.slice(0, 12)

    for(let i = 0; i < this.amountOfPages; i++) {
      this.pageArray.push(i + 1)
    }
  }

  private setProductsForPage(pageNumber: number): void {
    this.currentProducts = this.products.slice(pageNumber * 12 - 12, pageNumber * 12)
  }

  public nextPage(): void {
    this.currentPage += 1

    this.setProductsForPage(this.currentPage)
  }

  public previousPage(): void {
    this.currentPage -= 1

    this.setProductsForPage(this.currentPage)
  }

  public setPage(pageNumber: number): void {

    if (this.currentPage === pageNumber) {
      return
    }

    this.currentPage = pageNumber

    this.setProductsForPage(this.currentPage)
  }

  public counter(i: number) {
    return new Array(i);
  }
}
