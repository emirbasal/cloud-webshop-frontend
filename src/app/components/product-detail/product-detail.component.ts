import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/classes/product';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  public currentProduct: Product
  private productId: string = ""
  private productIdSub: Subscription = Subscription.EMPTY
  private currentProductSub: Subscription = Subscription.EMPTY

  public base64Base: string = "data:image/png;base64,"

  public isLoading: boolean = false

  constructor(private apiService: ApiService, private cartService: CartService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true
    this.productIdSub = this.route.paramMap.subscribe((params: ParamMap) => {
      this.productId = params.get('id');

      this.apiService.requestProduct(this.productId)
    })

    this.currentProductSub = this.apiService.getRequestedProduct().subscribe((product: Product) => {
      if (product != null) {
        this.currentProduct = product
        this.isLoading = false
      }
    })
  }

  public addToCart(): void {
    this.cartService.addToCart(this.currentProduct)
  }

  ngOnDestroy() {
    this.productIdSub.unsubscribe()
    this.currentProductSub.unsubscribe()
  }
}
