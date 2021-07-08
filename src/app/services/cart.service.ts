import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../classes/cartItem';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private productsInCart: CartItem[] = []
  public currentSum: number = 0

  public cartItemCounter: BehaviorSubject<number> = new BehaviorSubject(0)
  public cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject([])
  public cartSum: BehaviorSubject<number> = new BehaviorSubject(0)

  private itemsInCart = 0

  constructor() {
    this.setupLocalStorage()
  }

  private setupLocalStorage(): void {
    if (localStorage.getItem("userCart") === null) {
      let emptyCart = {}

      localStorage.setItem("userCart", JSON.stringify(emptyCart))

    } else {
      let parsedCart = JSON.parse(localStorage.getItem("userCart"))

      Object.keys(parsedCart).forEach((key: string) => {
        this.productsInCart.push(parsedCart[key])
      });

      this.calcSum()
    }
  }

  private updateLocalStorage(): void {
    let updatedCart = {}

    this.productsInCart.forEach((item: CartItem) => {
      updatedCart[item.product.id] = {
        quantity: item.quantity,
        product: item.product
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
}
