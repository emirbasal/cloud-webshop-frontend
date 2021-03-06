import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public authService: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (this.authService.isUserAuthenticated()) {
      return true
    }
    this.router.navigate([''])
    window.location.reload()
    return false
  }

}
