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
    const header = this.buildHeader()
    return this.apiService.http.get(this.apiService.baseUrl + this.outcomeUrl, { headers: header })
  }

  public getAllOrders(): Observable<any> {
    const header = this.buildHeader()
    return this.apiService.http.get(this.apiService.baseUrl + this.allOrdersUrl, { headers: header })
  }

  public getProducts(): Observable<Product[]> {
    return this.apiService.getAllProducts()
  }

  public deleteProduct(productId: string): void {
    const header = this.buildHeader()
    this.apiService.http.delete(this.apiService.baseUrl + this.apiService.productsUrl + productId, { headers: header })
    .subscribe((response: any) => {
      this.apiService.toastr.success(`${productId} wurde gelöscht`, "Produkt")

      setTimeout(() => {
        this.cartService.removeFromCart(productId)
        window.location.reload()
      }, 2000)
    }, error => {
      this.apiService.toastr.error(`${productId} wurde nicht gelöscht`, "Produkt")
      window.location.reload()

    })
  }

  public createProduct(product: Product): void {
    const header = this.buildHeader()
    this.apiService.http.post(this.apiService.baseUrl + this.apiService.productsUrl, product, { headers: header })
    .subscribe((createdProduct: any) => {
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
      window.location.reload()
    })
  }

  public getIsLoading(): Observable<any> {
    return this.specificIsLoading.asObservable()
  }

  public buildHeader(): any {
    return { 'Authorization': "Bearer " + localStorage.getItem('token') };
  }
}
