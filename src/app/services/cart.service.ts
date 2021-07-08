import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CartItem } from '../classes/cartItem';
import { Product } from '../classes/product';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {

  private productsInCart: CartItem[] = []
  private parsedCart: { [id: string]: CartItem } = {}
  public currentSum: number = 0

  public cartItemCounter: BehaviorSubject<number> = new BehaviorSubject(0)
  public cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject([])
  public cartSum: BehaviorSubject<number> = new BehaviorSubject(0)

  private requestedProductsSub: Subscription = Subscription.EMPTY

  private itemsInCart = 0

  constructor(private apiService: ApiService) {
    this.setupLocalStorage()
  }

  private setupLocalStorage(): void {
    this.requestedProductsSub = this.apiService.getRequestedProducts().subscribe((products: Product[]) => {
      if (products != null) {
        for (let product of products) {
          this.productsInCart.push({
            quantity: this.parsedCart[product.id].quantity,
            product
          })
        }
      }
    })
    this.apiService.getIsReady().subscribe((ready: boolean) => {
      if (ready) {
        if (localStorage.getItem("userCart") === null) {
          let emptyCart = {}

          localStorage.setItem("userCart", JSON.stringify(emptyCart))
        } else {
          this.parsedCart = JSON.parse(localStorage.getItem("userCart"))

          this.apiService.requestMultipleProducts(Object.keys(this.parsedCart))

          this.calcSum()
        }
      }
    })
  }

  private updateLocalStorage(): void {
    let updatedCart = {}

    this.productsInCart.forEach((item: CartItem) => {
      updatedCart[item.product.id] = {
        quantity: item.quantity
      }
    })

    localStorage.setItem("userCart", JSON.stringify(updatedCart))
  }

  public getCurrentCart(): Observable<CartItem[]> {
    return this.cartItems.asObservable()
  }

  public getCurrentSum(): Observable<number> {
    return this.cartSum.asObservable()
  }

  public getCounter(): Observable<number> {
    return this.cartItemCounter.asObservable()
  }

  private calcSum(): void {
    this.currentSum = 0
    this.itemsInCart = 0
    this.productsInCart.forEach((item: CartItem) => {
      this.currentSum += item.quantity * item.product.amount

      this.itemsInCart += item.quantity
    })

    this.currentSum = Math.round((this.currentSum + Number.EPSILON) * 100) / 100

    this.cartItemCounter.next(this.itemsInCart)
    this.cartSum.next(this.currentSum)
    this.cartItems.next(this.productsInCart)
  }

  public addToCart(product: Product): void {
    let productIndex = this.productsInCart.findIndex((item: CartItem) => {
      return product.id === item.product.id
    });

    if (productIndex > -1) {
      this.productsInCart[productIndex].quantity += 1
    } else {
      let newCartItem: CartItem = { quantity: 1, product}
      this.productsInCart.push(newCartItem)
    }

    this.updateLocalStorage()
    this.calcSum()
  }

  public removeFromCart(productId: string): void {
    let productIndex = this.productsInCart.findIndex((item: CartItem) => {
      return productId === item.product.id
    });

    if (productIndex > -1) {
      this.productsInCart.splice(productIndex, 1)
    } else {
      return
    }

    this.updateLocalStorage()
    this.calcSum()
  }

  public updateQuantity(productId: string, quantity: number): void {
    let productIndex = this.productsInCart.findIndex((item: CartItem) => {
      return productId === item.product.id
    });

    if (productIndex > -1) {
      if (this.productsInCart[productIndex].quantity + quantity === 0) {
        this.removeFromCart(productId)
      } else {
        this.productsInCart[productIndex].quantity += quantity
      }

    } else {
      return
    }

    this.updateLocalStorage()
    this.calcSum()
  }

  ngOnDestroy() {
    this.requestedProductsSub.unsubscribe()
  }
}
