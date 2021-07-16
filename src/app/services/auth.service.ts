import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../classes/account';
import { ApiService } from './api.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl: string = "api/auth"

  constructor(private apiService: ApiService) {
  }

  public authenticate(account: Account) {
    // Password hashen
    this.apiService.sendAuthDataToApi(account, this.authUrl)
    let valid = this.isTokenExpired(localStorage.getItem('token'))
    console.log('Valid:' + valid)
  }

  public hashPassword(password: string):string {
    return
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
    return true
  }

  public getDecodedToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }

  public logout(): void {
    localStorage.setItem('token', '')
  }



}
