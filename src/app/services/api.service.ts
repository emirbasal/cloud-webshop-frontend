import { Injectable } from '@angular/core';
import { Product } from '../classes/product';


/* tslint:disable max-line-length */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private products: Product[] = [
    { id: "0", name: "PS5 Disk", description: "Sony PlayStation®5 Disk Edition", amount: 49999, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51zylG5gxfS._SL1000_.jpg" },
    { id: "1", name: "PS5 Digital", description: "Sony PlayStation®5 Digitale Edition", amount: 39999, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51jiKCGEJSS._SL1000_.jpg" },
    { id: "2", name: "Dualsense Controller", description: "Sony PlayStation®5 Dualsense Controller", amount: 6999, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/61rzqjtJo2L._SL1460_.jpg" },
    { id: "3", name: "PS5 Ratchet and Clank Bundle", description: "Sony PlayStation®5 inklusive Ratchet and Clank", amount: 56999, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71vSA1nKxCS._SL1500_.jpg"},
    { id: "4", name: "PS5 Demon's Souls", description: "Playstation 5 Demon's Souls", amount: 6499, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81iR0fNaWtL._SL1500_.jpg"},
    { id: "5", name: "PS5 Marvel's Spider-Man: Miles Morales", description: "Playstation 5 Marvel's Spider-Man: Miles Morales", amount: 4999, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81pbQoGk%2BQL._SL1500_.jpg"},
    { id: "6", name: "Medienfernbedienung", description: "Sony PlayStation®5 Medienfernbedienung", amount: 2899, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/41zSnv9GV1L._SL1000_.jpg"},
    { id: "7", name: "PULSE 3D-Wireless-Headset", description: "Sony PlayStation®5 PULSE 3D-Wireless-Headset Gaming-Headset", amount: 10999, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71YC4yh2SlL._SL1500_.jpg"},
    { id: "8", name: "Dualsense Controller Cosmic Red", description: "Sony PlayStation®5 - DualSense™ Wireless Controller Cosmic Red", amount: 7499, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/517CwBDMdAS._SL1000_.jpg"},
    { id: "9", name: "Nintendo Switch Mario Red & Blue Edition", description: "Nintendo Switch Konsole Mario Rot & Blau Limited Edtion inkl. Tasche", amount: 41500, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71KEjnrVEjL._SL1500_.jpg"},
    { id: "24", name: "Super Smash Bros. Ultimate", description: "Super Smash Bros. Ultimate Nintendo Switch", amount: 5299, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81qXIz8es3L._SL1500_.jpg"},
    { id: "10", name: "Monster Hunter Rise", description: "Gehe auf die Jagd, wann und wo du willst, in MONSTER HUNTER RISE für Nintendo Switch", amount: 4399, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/919jkWMm4nL._SL1500_.jpg"},
    { id: "11", name: "Spiderman 1-3 Blu-ray", description: "Spiderman 1-3 Blu-ray Standard Version", amount: 1199, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/91fXnNtuolL._SX342_.jpg"},
    { id: "12", name: "Doctor Strange", description: "Doctor Strange Blu-ray Standard Version", amount: 1099, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71LXoXnyJ4L._SX342_.jpg"},
    { id: "13", name: "Chihiros Reise ins Zauberland", description: "Chihiros Reise ins Zauberland - Studio Ghibli Blu-Ray Collection", amount: 1200, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/717X0FVMnwL._SX342_.jpg"},
    { id: "14", name: "Kikis kleiner Lieferservice", description: "Kikis kleiner Lieferservice - Studio Ghibli Blu-ray Collection", amount: 1529, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/41iomYE1wJL._SX342_.jpg"},
    { id: "15", name: "Das wandelnde Schloss", description: "Das wandelnde Schloss - Studio Ghibli Blu-Ray Collection", amount: 1270, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/717Uqhk1b7L._SX342_.jpg"},
    { id: "16", name: "Mein Nachbar Totoro", description: "Mein Nachbar Totoro - Studio Ghibli Blu-Ray Collection", amount: 1400, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71VExRwVdwL._SX342_.jpg"},
    { id: "17", name: "Prinzessin Mononoke", description: "Prinzessin Mononoke - Studio Ghibli Blu-Ray Collection", amount: 1299, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71vvS9Nu9sL._SX342_.jpg"},
    { id: "18", name: "Die letzten Glühwürmchen", description: "Die letzten Glühwürmchen - Studio Ghibli Blu-Ray Collection", amount: 2299, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/41NdN6HQuJL._SY445_.jpg"},
    { id: "19", name: "Porco Rosso", description: "Porco Rosso - Studio Ghibli Blu-Ray Collection", amount: 1799, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71%2BrAgZxWiL._SX342_.jpg"},
    { id: "20", name: "Wie der Wind sich hebt", description: "Wie der Wind sich hebt - Studio Ghibli Blu-Ray Collection", amount: 1799, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71WkdpBokeL._SX342_.jpg"},
    { id: "21", name: "Your Name.", description: "Your Name. - Gestern, heute und für immer", amount: 1999, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/91saXOFDo9L._SY445_.jpg"},
    { id: "22", name: "Parasite", description: "Parasite Blu-Ray", amount: 699, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/81Kp6vFQb-L._SX342_.jpg"},
    { id: "23", name: "Der Herr der Ringe", description: "Der Herr der Ringe - Extended Edition Trilogie", amount: 2699, currency: "EUR", imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71QPCwPzMnL._SX342_.jpg"},
  ]

  constructor() { }

  public getProducts(): any {
    return this.products
  }

  public getProductData(id: string): any {
    let productIndex = this.products.findIndex((product: Product) => {
      return id === product.id
    })
    return this.products[productIndex]
  }
}
