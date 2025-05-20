import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from './auth.service';

@Injectable({
  providedIn: "root",
})
export class LogService {
  private baseUrl='http://localhost:5000/users/logs';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ){}

  getUserLogs(): Observable<any[]> {
    const token=this.authService.getToken();
    const headers=new HttpHeaders({
      Authorization:`Bearer ${token}`,
    });

    return this.http.get<any[]>(this.baseUrl,{headers});
  }
}
