import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl:string='http://localhost:5000/tasks';

  constructor(private http:HttpClient) { }

  getTasks(token:string): Observable<Task[]> {
    const headers=new HttpHeaders({
      'Authorization':`Bearer ${token}`
    });
    return this.http.get<Task[]>(this.apiUrl,{headers});
  }
}
