import { Injectable } from '@angular/core';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private products: Product[] = [
    { id: "1", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 9.99, currency: "EUR" },
    { id: "2", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 19.99, currency: "EUR" },
    { id: "3", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 29.99, currency: "EUR" },
    { id: "4", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 59.99, currency: "EUR" },
    { id: "5", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 9.99, currency: "EUR" },
    { id: "6", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 19.99, currency: "EUR" },
    { id: "7", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 29.99, currency: "EUR" },
    { id: "8", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 59.99, currency: "EUR" },
    { id: "11", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 9.99, currency: "EUR" },
    { id: "21", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 19.99, currency: "EUR" },
    { id: "321", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 29.99, currency: "EUR" },
    { id: "42", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 59.99, currency: "EUR" },
    { id: "53", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 9.99, currency: "EUR" },
    { id: "63", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 19.99, currency: "EUR" },
    { id: "73", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 29.99, currency: "EUR" },
    { id: "83", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 59.99, currency: "EUR" },
    { id: "1332", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 9.99, currency: "EUR" },
    { id: "552", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 19.99, currency: "EUR" },
    { id: "3543", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 29.99, currency: "EUR" },
    { id: "4665", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 59.99, currency: "EUR" },
    { id: "534234", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 9.99, currency: "EUR" },
    { id: "655", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 19.99, currency: "EUR" },
    { id: "7788", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 29.99, currency: "EUR" },
    { id: "81322", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 59.99, currency: "EUR" },
    { id: "11444", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 9.99, currency: "EUR" },
    { id: "2155", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 19.99, currency: "EUR" },
    { id: "32143443", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 29.99, currency: "EUR" },
    { id: "42432", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 59.99, currency: "EUR" },
    { id: "534352", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 9.99, currency: "EUR" },
    { id: "6376786", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 19.99, currency: "EUR" },
    { id: "732211", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 29.99, currency: "EUR" },
    { id: "834342", name: "Test Produkt", description: "Das ist ein Test Produkt", amount: 59.99, currency: "EUR" },
  ]

  constructor() { }

  public getProducts(): any {
    return this.products
  }

  public getProductData(id: number): any {
    return this.products[id - 1]
  }
}
