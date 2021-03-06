import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/models';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private readonly webApi = environment.webApi;

  constructor(
    private jwtService: JwtService,
    private http: HttpClient
  ) {
    this.isAuthenticated.next(!jwtService.isTokenExpired())
  }

  async login(body: LoginRequest): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post<any>(`${this.webApi}/tokens`, body).subscribe({
        next: token => {
          this.jwtService.setToken(token.token);
          this.updateStatus();
          resolve();
        },
        error: err => {
          reject(err);
        }
      });
    });
  }

  logout(): void {
    this.jwtService.clearToken();
    this.isAuthenticated.next(false);
  }

  updateStatus(): void {
    if(this.jwtService.isTokenExpired()) {
      this.isAuthenticated.next(false);
      return;
    }
    this.isAuthenticated.next(true);
  }

  isAuthenticatedObservable(): Observable<boolean> {
    this.updateStatus();
    return this.isAuthenticated.asObservable();
  }
}
