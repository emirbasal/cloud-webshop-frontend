import { Injectable, OnDestroy } from '@angular/core';
import { Product } from '../classes/product';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnDestroy {

  private baseUrl: string = "https://1z3pci4hcf.execute-api.us-east-1.amazonaws.com/dev/"
  private productsUrl: string = "api/products/"

  private productData: BehaviorSubject<Product[]> = new BehaviorSubject(null)
  private allProducts: Product[] = []

  private requestedProduct: BehaviorSubject<Product> = new BehaviorSubject(null)
  private requestedProducts: BehaviorSubject<Product[]> = new BehaviorSubject(null)

  private $ready: BehaviorSubject<boolean> = new BehaviorSubject(false)

  private readySubProduct: Subscription = Subscription.EMPTY
  private readySubProducts: Subscription = Subscription.EMPTY

  constructor(private http: HttpClient, private toastr: ToastrService) {
    this.getProductData()
  }

  private getProductData(): void {
    this.http.get(this.baseUrl + this.productsUrl).subscribe((data: Product[]) => {
      this.toastr.info('Alle Produkte wurden geladen')
      this.productData.next(data)
      this.allProducts = data
      this.$ready.next(true)
    }, error => {
      this.toastr.error('Es ist ein Fehler beim Laden der Produkte aufgetreten')
    })
  }

  public getIsReady(): Observable<boolean> {
    return this.$ready.asObservable()
  }

  public getAllProducts(): Observable<any> {
    return this.productData.asObservable()
  }

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

  ngOnDestroy() {
    this.readySubProduct.unsubscribe()
    this.readySubProducts.unsubscribe()
  }

}
