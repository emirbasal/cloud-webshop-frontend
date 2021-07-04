import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public itemsInCart: number = 0

  public cartItemCounterSub: Subscription = Subscription.EMPTY

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItemCounterSub = this.cartService.getCounter().subscribe((count: number) => {
      this.itemsInCart = count
    });
  }

  ngOnDestroy(): void {
    this.cartItemCounterSub.unsubscribe()
  }

}
