import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtAuth } from '../models/jwtAuth';
import { Register } from '../models/register';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  registerUrl = "http://localhost:8000/api/Auth/Register"
  loginUrl = "http://localhost:8000/api/Auth/Login"

  constructor(private http: HttpClient) { }

  public register(user: Register): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(this.registerUrl, user);
  }

  public login(user: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(this.loginUrl, user);
  }
}
