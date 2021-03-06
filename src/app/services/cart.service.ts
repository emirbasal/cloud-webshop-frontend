import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, Subject } from 'rxjs';
import { CartItem } from '../classes/cartItem';
import { Product } from '../classes/product';
import { Order } from '../classes/order';
import { OrderItem } from '../classes/orderItem';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Address } from '../classes/address';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {

  private productsInCart: CartItem[] = []
  private parsedCart: { [id: string]: CartItem } = {}

  private cartItemCounter: BehaviorSubject<number> = new BehaviorSubject(0)
  private cartItems: BehaviorSubject<CartItem[]> = new BehaviorSubject(null)
  private cartSum: BehaviorSubject<number> = new BehaviorSubject(0)

  private resetUserInput: Subject<any> = new Subject()

  private requestedProductsSub: Subscription = Subscription.EMPTY

  private itemsInCart = 0
  public currentSum: number = 0

  private createdOrdersSub: Subscription = Subscription.EMPTY
  private orderDeclinedSub: Subscription = Subscription.EMPTY

  private cachedProductsInCart: CartItem[] = []


  constructor(private apiService: ApiService, private toastr: ToastrService, private router: Router) {
    this.setupLocalStorage()
    this.createdOrdersSub = this.apiService.getCreatedOrders().subscribe((orderId: string) => {
      if (orderId != null) {
        // Create deep copy of products in cart in case order is declined
        this.cachedProductsInCart = JSON.parse(JSON.stringify(this.productsInCart))

        // Reset cart
        this.setOrderToLocalStorage(orderId)
        this.emptyCart()
        this.resetUserInput.next()
      }
    })

    this.orderDeclinedSub = this.apiService.getOrderDeclined().subscribe(() => {
      if (this.cachedProductsInCart.length > 0) {
        this.router.navigate(['cart'])

        // Create deep copy of cache
        this.productsInCart = JSON.parse(JSON.stringify(this.cachedProductsInCart))

        // Restore cart
        this.updateLocalStorage()
        this.calcSum()
        this.cachedProductsInCart = []
        this.toastr.info("wurde wiederhergestellt", 'Warenkorb')
      }
    })
  }

  private setupLocalStorage(): void {
    this.requestedProductsSub = this.apiService.getRequestedProductsForCart().subscribe((products: Product[]) => {
      if (products) {
        for (let product of products) {
          if (product) {
            this.productsInCart.push({
              quantity: this.parsedCart[product.id].quantity,
              product
            })
          }

        }
      }
    })
    this.apiService.getIsReady().subscribe((ready: boolean) => {
      if (ready) {
        if (localStorage.getItem("userCart") === null) {
          let emptyCart = {}

          localStorage.setItem("userCart", JSON.stringify(emptyCart))
        } else {
          // Get stored ids in localstorage and request products by ids
          this.parsedCart = JSON.parse(localStorage.getItem("userCart"))

          this.apiService.requestMultipleProductsForCart(Object.keys(this.parsedCart))

          this.calcSum()
        }
      }
    })
  }

  // Synchronize localstorage with productsInCart variable
  private updateLocalStorage(): void {
    let updatedCart = {}

    this.productsInCart.forEach((item: CartItem) => {
      updatedCart[item.product.id] = {
        quantity: item.quantity
      }
    })

    localStorage.setItem("userCart", JSON.stringify(updatedCart))
  }

  public getResetInput(): Observable<any> {
    return this.resetUserInput.asObservable()
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

  // Calculate sum in cart and set values properly
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

    if (productIndex >= 0) {
      this.productsInCart[productIndex].quantity += 1
      this.toastr.success(`${product.name} wurde erneut hinzugef??gt`, 'Warenkorb')
    } else {
      let newCartItem: CartItem = { quantity: 1, product}
      this.productsInCart.push(newCartItem)
      this.toastr.success(`${product.name} wurde hinzugef??gt`, 'Warenkorb')
    }

    this.updateLocalStorage()
    this.calcSum()
  }

  public removeFromCart(productId: string): void {
    let productIndex = this.productsInCart.findIndex((item: CartItem) => {
      return productId === item.product.id
    });

    if (productIndex >= 0) {
      this.toastr.success(`${this.productsInCart[productIndex].product.name} wurde entfernt`, 'Warenkorb');
      this.productsInCart.splice(productIndex, 1)

      this.updateLocalStorage()
      this.calcSum()
    }
  }

  public updateQuantity(productId: string, quantity: number): void {
    let productIndex = this.productsInCart.findIndex((item: CartItem) => {
      return productId === item.product.id
    });

    if (productIndex >= 0) {
      // Check if changing quantity should remove the item
      if (this.productsInCart[productIndex].quantity + quantity <= 0) {
        this.removeFromCart(productId)
      } else {
        this.productsInCart[productIndex].quantity += quantity
        this.toastr.success(`Menge von ${this.productsInCart[productIndex].product.name} wurde angepasst`, 'Warenkorb')
      }

      this.updateLocalStorage()
      this.calcSum()
    }
  }

  public createOrder(email: string, items: CartItem[], cardNumber: string, address: Address): boolean {
    let adjustedItems: any[] = []
    if (items.length <= 0) {
      this.toastr.error('Keine Produkte im Warenkorb', 'Warenkorb')
      return false
    }

    for (let cartItem of items) {
      let adjustedItem: any = {
        quantity: cartItem.quantity,
        id: cartItem.product.id,
      }
      adjustedItems.push(adjustedItem)
    }

    let order: any = {
      id: '',
      invoice: '',
      email,
      items: adjustedItems,
      status: 'new',
      card: {
        id: '',
        number: cardNumber
      },
      address
    }

    this.apiService.postOrder(order)
    return true
  }

  // Save created orders id from user in localstorage
  private setOrderToLocalStorage(orderId: string): void {
    let parsedOrders: string[]

    if (localStorage.getItem('userOrders') === null) {
      localStorage.setItem('userOrders', JSON.stringify([]))
    }

    parsedOrders = JSON.parse(localStorage.getItem('userOrders'))

    if (parsedOrders.indexOf(orderId) === -1) {
      parsedOrders.push(orderId)

      localStorage.setItem('userOrders', JSON.stringify(parsedOrders))
    }
  }

  public emptyCart(): void {
    this.productsInCart = []

    this.updateLocalStorage()
    this.calcSum()
  }

  ngOnDestroy() {
    this.requestedProductsSub.unsubscribe()
    this.createdOrdersSub.unsubscribe()
    this.orderDeclinedSub.unsubscribe()
  }
}
