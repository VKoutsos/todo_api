import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl='http://localhost:5000/admin';

  constructor(private http: HttpClient) { }

  getAllUsers():Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getUserTasks(userId:number):Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${userId}/tasks`);
  }

  getUserSubtasks(userId:number):Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${userId}/subtasks`);
  }


}
