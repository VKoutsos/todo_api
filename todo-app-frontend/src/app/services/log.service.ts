import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from './auth.service';
import { Log } from "../models/log.model";

@Injectable({
  providedIn: "root",
})
export class LogService {
  private baseUrl='https://todo-app-hk86.onrender.com/users/logs';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ){}

  getUserLogs(): Observable<{logs:Log[]; created_at:string}> {
    const token=this.authService.getToken();
    const headers=new HttpHeaders({
      Authorization:`Bearer ${token}`,
    });

    return this.http.get<{logs:Log[]; created_at:string}>(this.baseUrl,{headers});
  }
}
