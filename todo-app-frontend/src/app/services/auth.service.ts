import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User{
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl:string='http://localhost:5000/auth';

  constructor(private http: HttpClient){}

  register(user: User): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`,user);
  }

  login(user: User): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,user);
  }

  setToken(token: string):void{
    localStorage.setItem('token', token);
  }

  getToken():string|null{
    return localStorage.getItem('token');
  }

  isLoggedIn():boolean{
    return this.getToken()!==null;
  }

  logout():void{
    localStorage.removeItem('token');
  }
}

