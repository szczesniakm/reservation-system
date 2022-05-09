import { Injectable } from '@angular/core';
import { JWTPayload } from '../models/jwt-payload';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  public setToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  public getToken(): string | null{
    return localStorage.getItem('jwt');
  }

  public isTokenExpired(): boolean {
    const payload = this.getPayload();
    if(!payload) {
      return true;
    }
    const expires = Date.parse(payload.exp);
    if(expires < Date.now()) {
      this.clearToken();
      return true;
    }
    return false;
  }

  public clearToken(): void {
    localStorage.removeItem('jwt');
  }

  public getPayload(): JWTPayload | null{
    const token = this.getToken();
        
    console.log(token);
    if(!token) {
      return null;
    }
    return JSON.parse(atob(token.split('.')[1])) as JWTPayload;
  }
}
