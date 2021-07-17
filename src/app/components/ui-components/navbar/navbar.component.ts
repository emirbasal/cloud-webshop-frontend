import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Output() loginModal = new EventEmitter()

  public itemsInCart: number = 0

  public cartItemCounterSub: Subscription = Subscription.EMPTY

  public isLoggedIn: boolean

  private userAuthenticatedSub: Subscription = Subscription.EMPTY

  constructor(
    private cartService: CartService,
    private authService: AuthService) {
    }


  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserAuthenticated()
    this.cartItemCounterSub = this.cartService.getCounter().subscribe((count: number) => {
      this.itemsInCart = count
    });
    this.userAuthenticatedSub = this.authService.getAuthInfo().subscribe((isAuthenticated: boolean) => {
      this.isLoggedIn = isAuthenticated
    })
  }

  public onLoginModal(): void {
    this.loginModal.emit()
  }

  public logout(): void {
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.cartItemCounterSub.unsubscribe()
    this.userAuthenticatedSub.unsubscribe()
  }

}
