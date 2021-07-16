import { Injectable } from '@angular/core';
import { Account } from '../classes/account';
import { ApiService } from './api.service';
import jwt_decode from 'jwt-decode';
import bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl: string = "api/auth"

  constructor(private apiService: ApiService) {
  }

  public authenticate(account: Account) {
    //Fürs erste auskommentiert, weil die Überprüfung im Backend noch implementiert werden muss
    // account.password = this.hashPassword(account.password)
    this.apiService.sendAuthDataToApi(account, this.authUrl)
  }

  public hashPassword(password: string):string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
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
