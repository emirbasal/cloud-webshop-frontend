import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/classes/cartItem';
import { CartService } from 'src/app/services/cart.service';
import { CartUserInformationComponent } from '../cart-user-information/cart-user-information.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  @ViewChild('cartUserInformation') userInformation: CartUserInformationComponent

  private itemsInCartSub: Subscription = Subscription.EMPTY
  private currentSumSub: Subscription = Subscription.EMPTY

  public itemsInCart: CartItem[] = []
  public currentSumCart: number = 0

  private shopCurrency: string = 'EUR'

  private resetUserInputSub: Subscription = Subscription.EMPTY

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.itemsInCartSub = this.cartService.getCurrentCart().subscribe((items: CartItem[]) => {
      this.itemsInCart = items
    })

    this.currentSumSub = this.cartService.getCurrentSum().subscribe((sum: number) => {
      this.currentSumCart = sum
    })

    this.resetUserInputSub = this.cartService.getResetInput().subscribe(() => {
      this.userInformation.onReset()
    })

  }

  public changeQuantity(productId: string, amount: number): void {
    this.cartService.updateQuantity(productId, amount)
  }

  public removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId)
  }

  public createOrder(cardNumber: string, email: string): void {
    this.cartService.createOrder(this.currentSumCart, this.shopCurrency, email, this.itemsInCart, cardNumber)
  }

  ngOnDestroy(): void {
    this.itemsInCartSub.unsubscribe()
    this.currentSumSub.unsubscribe()
    this.resetUserInputSub.unsubscribe()
  }

}
