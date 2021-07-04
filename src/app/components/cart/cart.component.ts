import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/classes/cartItem';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  private itemsInCartSub: Subscription = Subscription.EMPTY
  private currentSumSub: Subscription = Subscription.EMPTY

  public itemsInCart: CartItem[] = []
  public currentSumCart: number = 0

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.itemsInCartSub = this.cartService.getCurrentCart().subscribe((items: CartItem[]) => {
      this.itemsInCart = items
    })

    this.currentSumSub = this.cartService.getCurrentSum().subscribe((sum: number) => {
      this.currentSumCart = sum
    })
  }

  ngOnDestroy(): void {
    this.itemsInCartSub.unsubscribe()
    this.currentSumSub.unsubscribe()
  }

}
