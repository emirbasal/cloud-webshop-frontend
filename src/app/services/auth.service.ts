import { Injectable } from '@angular/core';
import { Account } from '../classes/account';
import { ApiService } from './api.service';
import jwt_decode from 'jwt-decode';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private userAuthenticated: Subject<boolean> = new Subject()
  private authUrl: string = "api/auth"

  constructor(private apiService: ApiService) {
  }

  public authenticate(account: Account) {
    return this.apiService.sendAuthDataToApi(account, this.authUrl)
  }

  public isUserAuthenticated(): boolean {
    return !this.isTokenExpired(localStorage.getItem('token'))
  }

  public isTokenExpired(token: string) {
    let decodedToken = this.getDecodedToken(token)

    if (decodedToken != null) {
      let exp = decodedToken.exp
      if (Date.now() <= exp * 1000) {
        return false;
      }
    }
    localStorage.removeItem('token')
    return true
  }

  public getDecodedToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch (Error) {
        return null;
    }
  }

  public logout(): void {
    localStorage.removeItem('token')
    window.location.reload();
  }


  public getAuthInfo(): Observable<boolean> {
    return this.userAuthenticated.asObservable()
  }

  public notifyAuthentication(isAuthenticated: boolean): void {
    this.userAuthenticated.next(isAuthenticated)
  }



}
