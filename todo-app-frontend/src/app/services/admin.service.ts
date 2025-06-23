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

  //Task Operations
  createUserTask(taskData:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/tasks/create`,taskData,{
      headers:this.getAuthHeaders()
    });
  }

  getUserTasks(userId:number):Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${userId}/tasks`,{
      headers:this.getAuthHeaders()
    });
  }

  updateUserTask(taskId:number,taskData:any):Observable<any>{
    return this.http.put(`${this.baseUrl}/tasks/${taskId}`,taskData,{
      headers:this.getAuthHeaders()
    });
  }

  deleteUserTask(userId:number,taskId:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/users/${userId}/tasks/${taskId}`,{
      headers:this.getAuthHeaders()
    });
  }

  //Subtask Operations
  createUserSubtask(taskId:number,title:string,userId:number):Observable<any>{
    return this.http.post(`${this.baseUrl}/subtasks/create/${taskId}`,
      {description:title,userId:userId},
      {headers:this.getAuthHeaders()}
    );
  }

  getUserSubtasks(userId:number):Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${userId}/subtasks`,{
      headers:this.getAuthHeaders()
    });
  }

  updateUserSubtask(taskId:number,subtaskId:number,subtaskData:any):Observable<any>{
    return this.http.put(`${this.baseUrl}/tasks/${taskId}/subtasks/${subtaskId}`,subtaskData,{
      headers:this.getAuthHeaders()
    });
  }

  deleteUserSubtask(taskId:number,subtaskId:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/tasks/${taskId}/subtasks/${subtaskId}`,{
      headers:this.getAuthHeaders()
    });
  }
}
