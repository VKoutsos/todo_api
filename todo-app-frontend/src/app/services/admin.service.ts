import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl='http://localhost:5000/admin';

  constructor(
    private http: HttpClient,
    private authService: AuthService) { }

  //create headers with authorization token
  private getAuthHeaders():HttpHeaders {
    const token=this.authService.getToken();
    return new HttpHeaders({
      'Authorization':`Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllUsers():Observable<any> {
    return this.http.get(`${this.baseUrl}/users`,{
      headers:this.getAuthHeaders()//include auth headers
    });
  }

  getUserTasks(userId:number):Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${userId}/tasks`,{
      headers:this.getAuthHeaders()
    });
  }

  getUserSubtasks(userId:number):Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${userId}/subtasks`,{
      headers:this.getAuthHeaders()
    });
  }


}
