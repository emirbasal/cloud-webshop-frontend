import { Injectable } from '@angular/core';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private products: Product[] = [
    { id: 1, name: "Test Product", description: "This is a Test Product", amount: 9.99, currency: "EUR" },
    { id: 2, name: "Test Product 2", description: "This is a Test Product", amount: 19.99, currency: "EUR" },
    { id: 3, name: "Test Product 3", description: "This is a Test Product", amount: 29.99, currency: "EUR" },
    { id: 4, name: "Test Product 4", description: "This is a Test Product", amount: 59.99, currency: "EUR" },
    { id: 5, name: "Test Product 5", description: "This is a Test Product", amount: 99.99, currency: "EUR" },
    { id: 6, name: "Test Product 6", description: "This is a Test Product", amount: 9.99, currency: "EUR" },
    { id: 7, name: "Test Product 7", description: "This is a Test Product", amount: 69.99, currency: "EUR" },
    { id: 8, name: "Test Product 8", description: "This is a Test Product", amount: 29.99, currency: "EUR" },
    { id: 9, name: "Test Product 9", description: "This is a Test Product", amount: 59.99, currency: "EUR" },
    { id: 10, name: "Test Product 10", description: "This is a Test Product", amount: 49.99, currency: "EUR" },
    { id: 11, name: "Test Product 11", description: "This is a Test Product", amount: 9.99, currency: "EUR" },
    { id: 12, name: "Test Product 12", description: "This is a Test Product", amount: 19.99, currency: "EUR" },
    { id: 13, name: "Test Product 13", description: "This is a Test Product", amount: 29.99, currency: "EUR" },
    { id: 14, name: "Test Product 14", description: "This is a Test Product", amount: 59.99, currency: "EUR" },
    { id: 15, name: "Test Product 15", description: "This is a Test Product", amount: 99.99, currency: "EUR" },
    { id: 16, name: "Test Product 16", description: "This is a Test Product", amount: 9.99, currency: "EUR" },
    { id: 17, name: "Test Product 17", description: "This is a Test Product", amount: 69.99, currency: "EUR" },
    { id: 18, name: "Test Product 18", description: "This is a Test Product", amount: 29.99, currency: "EUR" },
    { id: 19, name: "Test Product 19", description: "This is a Test Product", amount: 59.99, currency: "EUR" },
    { id: 20, name: "Test Product 20", description: "This is a Test Product", amount: 49.99, currency: "EUR" },
    { id: 21, name: "Test Product 21", description: "This is a Test Product", amount: 9.99, currency: "EUR" },
    { id: 22, name: "Test Product 22", description: "This is a Test Product", amount: 19.99, currency: "EUR" },
    { id: 23, name: "Test Product 23", description: "This is a Test Product", amount: 29.99, currency: "EUR" },
    { id: 24, name: "Test Product 24", description: "This is a Test Product", amount: 59.99, currency: "EUR" },
    { id: 25, name: "Test Product 25", description: "This is a Test Product", amount: 99.99, currency: "EUR" },
    { id: 26, name: "Test Product 26", description: "This is a Test Product", amount: 9.99, currency: "EUR" },
    { id: 27, name: "Test Product 27", description: "This is a Test Product", amount: 69.99, currency: "EUR" },
    { id: 28, name: "Test Product 28", description: "This is a Test Product", amount: 29.99, currency: "EUR" },
    { id: 29, name: "Test Product 29", description: "This is a Test Product", amount: 59.99, currency: "EUR" },
    { id: 30, name: "Test Product 30", description: "This is a Test Product", amount: 49.99, currency: "EUR" },
    { id: 31, name: "Test Product 31", description: "This is a Test Product", amount: 9.99, currency: "EUR" },
    { id: 32, name: "Test Product 32", description: "This is a Test Product", amount: 19.99, currency: "EUR" },
    { id: 33, name: "Test Product 33", description: "This is a Test Product", amount: 29.99, currency: "EUR" },
    { id: 34, name: "Test Product 34", description: "This is a Test Product", amount: 59.99, currency: "EUR" },
    { id: 35, name: "Test Product 35", description: "This is a Test Product", amount: 99.99, currency: "EUR" },
    { id: 36, name: "Test Product 36", description: "This is a Test Product", amount: 9.99, currency: "EUR" },
    { id: 37, name: "Test Product 37", description: "This is a Test Product", amount: 69.99, currency: "EUR" },
    { id: 38, name: "Test Product 38", description: "This is a Test Product", amount: 29.99, currency: "EUR" },
    { id: 39, name: "Test Product 39", description: "This is a Test Product", amount: 59.99, currency: "EUR" },
    { id: 40, name: "Test Product 40", description: "This is a Test Product", amount: 49.99, currency: "EUR" },
  ]

  constructor() { }

  public getProducts(): any {
    return this.products
  }

  public getProductData(id: number): any {
    return this.products[id - 1]
  }
}
