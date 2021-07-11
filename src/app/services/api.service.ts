import { Injectable, OnDestroy } from '@angular/core';
import { Product } from '../classes/product';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../classes/order';
import { CartItem } from '../classes/cartItem';
import { OrderItem } from '../classes/orderItem';



@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnDestroy {

  // API urls and extensions
  private baseUrl: string = "https://1z3pci4hcf.execute-api.us-east-1.amazonaws.com/dev/"
  private productsUrl: string = "api/products/"
  private ordersUrl: string = "api/orders"
  private invoiceUrl: string = "/api/orders/invoice/"

  // BehaviorSubject to next all products to subscribers
  private productData: BehaviorSubject<Product[]> = new BehaviorSubject(null)
  private allProducts: Product[] = []

  // BehaviorSubjects to next requested product/s to subscribers
  private requestedProduct: BehaviorSubject<Product> = new BehaviorSubject(null)
  private requestedProducts: BehaviorSubject<Product[]> = new BehaviorSubject(null)

  // BehaviorSubject to next orderIds to subscribers
  private createdOrders: BehaviorSubject<any> = new BehaviorSubject(null)

  // Subject to tell subscribers an order was declined (likely because of card)
  private orderDeclined: Subject<any> = new Subject()

  // BehaviorSubject to tell subscribers if the get request for products was successful
  private $ready: BehaviorSubject<boolean> = new BehaviorSubject(false)

  // Subscriptions for products to wait until $ready is true
  private readySubProduct: Subscription = Subscription.EMPTY
  private readySubProducts: Subscription = Subscription.EMPTY


  constructor(private http: HttpClient, private toastr: ToastrService) {
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

  // Nexts specified products by ids if all products were already requested
  public requestMultipleProducts(ids: any): void {
    this.readySubProducts = this.$ready.subscribe((isReady: boolean) => {
      if (isReady) {
        const requestedProducts = []
        for (let id of ids) {
          let productIndex = this.allProducts.findIndex((product: Product) => {
            return id === product.id
          })
          requestedProducts.push(this.allProducts[productIndex])
        }

        this.requestedProducts.next(requestedProducts)
        this.readySubProducts.unsubscribe()
      }
    })
  }

  public getRequestedProduct(): Observable<Product> {
    return this.requestedProduct.asObservable()
  }

  public getRequestedProducts(): Observable<Product[]> {
    return this.requestedProducts.asObservable()
  }

  // Creates an order in the backend and after a set time requests the corresponding invoice
  public postOrder(order: Order): void {
    this.http.post(this.baseUrl + this.ordersUrl, order).subscribe((createdOrder: any) => {
      this.toastr.success('wurde aufgegeben', 'Bestellung')

      this.createdOrders.next(createdOrder.id)

      setTimeout(() => {
          this.getInvoice(createdOrder.id)
        }, 2500)
      }, error => {
        console.log(error)
        this.toastr.error('wurde nicht aufgegeben', 'Bestellung')
      })
  }


  public getCreatedOrders(): Observable<any> {
    return this.createdOrders.asObservable()
  }

  public getInvoice(orderId: string): void {
    this.http.get(this.baseUrl + this.invoiceUrl + orderId).subscribe((order: any) => {
      this.toastr.success('war erfolgreich', 'Bestellung')
    }, error => {
      console.log(error)
      this.toastr.error('wurde abgelehnt', 'Bestellung')

      this.orderDeclined.next()
    })
  }

  public getOrderDeclined(): Observable<any> {
    return this.orderDeclined.asObservable()
  }

  ngOnDestroy() {
    this.readySubProduct.unsubscribe()
    this.readySubProducts.unsubscribe()
  }

}
