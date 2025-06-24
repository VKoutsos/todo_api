import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User{
  name: string;
  email: string;
  password: string;
}

export interface LoginUser{
  email:string;
  password:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl:string='http://localhost:5000/auth';

  constructor(private http: HttpClient){}

  register(user: User): Observable<any>{
    console.log('Registering user: ', user);
    return this.http.post(`${this.apiUrl}/register`,user);
  }

  login(user: LoginUser): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,user);
  }

  setToken(token: string):void{
    localStorage.setItem('token', token);
  }

  getToken():string|null{
    return localStorage.getItem('token');
  }

  isLoggedIn():boolean{
    const token=this.getToken();
    if (!token) return false;

    try{
      const payload=JSON.parse(atob(token.split('.')[1]));
      const isExpired=payload.exp*1000<Date.now();
      if(isExpired){
        this.logout();
        return false;
      }
      return true;
    }catch(err){
      this.logout();
      return false;
    }
  }

  logout():void{
    localStorage.removeItem('token');
  }

  isAdmin():boolean{
    const token=this.getToken();
    if(!token) return false;

    const payload=JSON.parse(atob(token.split('.')[1]));
    return payload.role==='admin'; //decode the jwt payload
  }
}

