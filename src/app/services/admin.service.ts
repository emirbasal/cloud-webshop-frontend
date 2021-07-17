import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../classes/product';
import { ApiService } from './api.service';
import { CartService } from './cart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private specificIsLoading: Subject<boolean> = new Subject()

  private outcomeUrl: string = "api/management/outcome"
  private allOrdersUrl: string = "api/orders"

  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    public toastr: ToastrService,
    private router: Router
  ) {
  }

  public getOutcome(): Observable<any> {
    return this.apiService.http.get(this.apiService.baseUrl + this.outcomeUrl)
  }

  public getAllOrders(): Observable<any> {
    return this.apiService.http.get(this.apiService.baseUrl + this.allOrdersUrl)
  }

  public getProducts(): Observable<Product[]> {
    return this.apiService.getAllProducts()
  }

  public deleteProduct(productId: string): void {
    this.apiService.http.delete(this.apiService.baseUrl + this.apiService.productsUrl + productId).subscribe((response: any) => {
      this.apiService.toastr.success(`${productId} wurde gelöscht`, "Produkt")

      setTimeout(() => {
        this.cartService.removeFromCart(productId)
        window.location.reload()
      }, 2000)
    }, error => {
      this.apiService.toastr.error(`${productId} wurde nicht gelöscht`, "Produkt")
    })
  }

  public createProduct(product: Product): void {
    this.apiService.http.post(this.apiService.baseUrl + this.apiService.productsUrl, product).subscribe((createdProduct: any) => {
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
}
