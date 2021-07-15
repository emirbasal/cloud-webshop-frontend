import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../classes/product';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private outcomeUrl: string = "api/management/outcome"
  private allOrdersUrl: string = "api/orders"

  constructor(
    private apiService: ApiService
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
        window.location.reload()
      }, 1500)
    }, error => {
      this.apiService.toastr.error(`${productId} wurde nicht gelöscht`, "Produkt")
    })
  }
}
