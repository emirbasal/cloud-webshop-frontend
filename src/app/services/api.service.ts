import { Injectable, OnDestroy } from '@angular/core';
import { Product } from '../classes/product';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../classes/order';
import { Router } from '@angular/router';
import { Account } from '../classes/account';


@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnDestroy {

  // API urls and extensions
  public baseUrl: string = "https://e2s1lbvuee.execute-api.us-east-1.amazonaws.com/prod/"
  public productsUrl: string = "api/products/"
  public ordersUrl: string = "api/orders/"

  // BehaviorSubject to next all products to subscribers
  private productData: BehaviorSubject<Product[]> = new BehaviorSubject(null)
  private allProducts: Product[] = []

  // BehaviorSubjects to next requested product/s to subscribers
  private requestedProduct: BehaviorSubject<Product> = new BehaviorSubject(null)
  private requestedOrder: BehaviorSubject<Order> = new BehaviorSubject(null)

  private cartReqProducts: BehaviorSubject<any> = new BehaviorSubject(null)
  private orderReqProducts: Subject<any> = new Subject()

  // BehaviorSubject to next orderIds to subscribers
  private createdOrders: BehaviorSubject<any> = new BehaviorSubject(null)

  // Subject to tell subscribers an order was declined (likely because of card)
  private orderDeclined: Subject<any> = new Subject()

  // BehaviorSubject to tell subscribers if the get request for products was successful
  private $ready: BehaviorSubject<boolean> = new BehaviorSubject(false)

  // Subscriptions for products to wait until $ready is true
  private readySubProduct: Subscription = Subscription.EMPTY
  private readySubProducts: Subscription = Subscription.EMPTY

  private specificIsLoading: Subject<boolean> = new Subject()


  constructor(public http: HttpClient, public toastr: ToastrService, private router: Router) {
    this.getProductData()
  }

  // Sends the initial request to get all products from the specified api endpoint and nexts the returned value
  private getProductData(): void {
    this.http.get(this.baseUrl + this.productsUrl).subscribe((data: Product[]) => {
      this.toastr.info('wurden geladen', 'Produkte')
      this.productData.next(data)
      this.allProducts = data
      this.$ready.next(true)
    }, error => {
      this.toastr.error('konnten nicht geladen werden', 'Produkte')
    })
  }

  public getIsReady(): Observable<boolean> {
    return this.$ready.asObservable()
  }

  public getAllProducts(): Observable<any> {
    return this.productData.asObservable()
  }

    // Nexts specified product by id if all products were already requested
  public requestProduct(id: string): void {
    this.readySubProduct = this.$ready.subscribe((isReady: boolean) => {
      if (isReady) {
        let productIndex = this.allProducts.findIndex((product: Product) => {
          return id === product.id
        })

        this.requestedProduct.next(this.allProducts[productIndex])
        this.readySubProduct.unsubscribe()
      }
    })
  }

  private requestMultipleProducts(ids: any, behaviorSubject: any): void {
    this.readySubProducts = this.$ready.subscribe((isReady: boolean) => {
      if (isReady) {
        const requestedProducts = []
        for (let id of ids) {
          let productIndex = this.allProducts.findIndex((product: Product) => {
            return id === product.id
          })
          requestedProducts.push(this.allProducts[productIndex])
        }
        behaviorSubject.next(requestedProducts)

        this.readySubProducts.unsubscribe()
      }
    })
  }

  public requestMultipleProductsForCart(ids: any): void {
    this.requestMultipleProducts(ids, this.cartReqProducts)
  }

  public requestMultipleProductsForOrder(ids: any): void {
    this.requestMultipleProducts(ids, this.orderReqProducts)
  }


  public getRequestedProduct(): Observable<Product> {
    return this.requestedProduct.asObservable()
  }

  public getRequestedProductsForCart(): Observable<Product[]> {
    return this.cartReqProducts.asObservable()
  }

  public getRequestedProductsForOrder(): Observable<Product[]> {
    return this.orderReqProducts.asObservable()
  }

  // Creates an order in the backend and after a set time requests the corresponding invoice
  public postOrder(order: Order): void {
    this.http.post(this.baseUrl + this.ordersUrl, order).subscribe((createdOrder: any) => {
      this.toastr.success('wurde aufgegeben', 'Bestellung')

      this.createdOrders.next(createdOrder.id)

      setTimeout(() => {
          this.router.navigate(['order/' + createdOrder.id])
        }, 1500)
      }, error => {
        console.log(error)
        this.toastr.error('wurde nicht aufgegeben', 'Bestellung')
      })
  }

  public requestOrder(orderId: string): void {
    this.http.get(this.baseUrl + this.ordersUrl + orderId).subscribe((order: any) => {
      switch (order.status) {
        case 'pending':
          this.toastr.success('ist in Bearbeitung', 'Bestellung')
          break
        case 'accepted':
          this.toastr.success('war erfolgreich', 'Bestellung')
          break
        default:
          break
      }
      this.requestedOrder.next(order)
    }, error => {
      console.log(error)
      this.toastr.error('wurde abgelehnt', 'Bestellung')

      this.orderDeclined.next()
    })
  }

  public getCreatedOrders(): Observable<any> {
    return this.createdOrders.asObservable()
  }

  public getOrderDeclined(): Observable<any> {
    return this.orderDeclined.asObservable()
  }

  public getRequestedOrder(): Observable<any> {
    return this.requestedOrder.asObservable()
  }

  public createProduct(product: Product): void {
    this.http.post(this.baseUrl + this.productsUrl, product).subscribe((createdProduct: any) => {
      this.specificIsLoading.next(false)
      this.toastr.success('wurde angelegt', createdProduct.name)

      this.router.navigate(['product/' + createdProduct.id])

      setTimeout(() => {
        window.location.reload();
      }, 1500)
    }, error => {
      console.log(error)
      this.specificIsLoading.next(false)
      this.toastr.error('konnte nicht angelegt werden', 'Produkt')
    })
  }

  public getIsLoading(): Observable<any> {
    return this.specificIsLoading.asObservable()
  }

  public sendAuthDataToApi(account: Account, endpoint: string): void {
    this.http.post(this.baseUrl + endpoint, account).subscribe((response: any) => {
      let token:string = response.token
      if (token.length > 0) {
        this.toastr.success('Erfolgreich authentifiziert')
        localStorage.setItem("token", token)
        this.router.navigate([''])
      } else {
        this.toastr.error('Username oder Passwort falsch')
        return
      }

      setTimeout(() => {
        }, 1500)
      }, error => {
        console.log(error)
        this.toastr.error('Konnte nicht authentifizert werden')
      })
  }

  ngOnDestroy() {
    this.readySubProduct.unsubscribe()
    this.readySubProducts.unsubscribe()
  }

}
