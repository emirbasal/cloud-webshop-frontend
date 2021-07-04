import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/classes/product';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  public products: Product[] = []

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.products = this.apiService.getProducts()
  }

}
