import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/classes/product';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {

  public products: Product[] = []
  private productsSub: Subscription = Subscription.EMPTY

  constructor(
    private apiService: ApiService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.productsSub = this.apiService.getAllProducts().subscribe((products: Product[]) => {
      if (products != null) {
        this.products = products
      }
    })
  }

  public addToCart(productId: string): void {
    let productIndex = this.products.findIndex((product: Product) => {
      return product.id === productId
    })

    this.cartService.addToCart(this.products[productIndex])
  }

  ngOnDestroy(): void {
    this.productsSub.unsubscribe()
  }

}
