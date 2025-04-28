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

  createTask(task: Partial<Task>, token: string): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post(`${this.apiUrl}/create`, task, { headers });
  }

  updateTask(taskId:number,updatedTask:Partial<Task>,token:string): Observable<any> {
    const headers = new HttpHeaders({'Authorization':`Bearer ${token}` });
    return this.http.put(`${this.apiUrl}/update/${taskId}`,updatedTask,{headers});
  }

  deleteTask(taskId:number,token:string):Observable<any> {
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}` });
    return this.http.delete(`${this.apiUrl}/delete/${taskId}`,{headers});
  }

  completeTask(taskId:number,token:string):Observable<any> {
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}` });
    return this.http.put(`${this.apiUrl}/complete/${taskId}`,{},{headers});
  }
}

