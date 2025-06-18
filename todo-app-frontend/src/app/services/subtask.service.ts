import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subtask } from '../models/subtask.model';

@Injectable({
  providedIn: 'root'
})
export class SubtaskService {
  private apiUrl='http://localhost:5000/subtasks';

  constructor(private http:HttpClient) { }

  getSubtasks(taskId:number,token:string): Observable<Subtask[]> {
    const headers=new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.get<Subtask[]>(`${this.apiUrl}/${taskId}`,{headers});
  }

  createSubtask(taskId:number,subtask:Partial<Subtask>,token:string):Observable<any>{
    const headers=new HttpHeaders({'Authorization':`Bearer ${token}`});
    return this.http.post(`${this.apiUrl}/create/${taskId}`,subtask, { headers });
  }

  updateSubtask(subtaskId:number,subtask:Partial<Subtask>,token:string):Observable<any>{
    const headers=new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.put(`${this.apiUrl}/update/${subtaskId}`,subtask, { headers });
  }

  deleteSubtask(subtaskId:number,token:string):Observable<any>{
    const headers=new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.delete(`${this.apiUrl}/delete/${subtaskId}`,{headers});
  }

  completeSubtask(subtaskId:number,token:string):Observable<any>{
    const headers=new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.put(`${this.apiUrl}/complete/${subtaskId}`,{},{headers});
  }

  incompleteSubtask(subtaskId:number,token:string):Observable<any>{
    const headers=new HttpHeaders({'Authorization': `Bearer ${token}`});
    return this.http.put(`${this.apiUrl}/incomplete/${subtaskId}`,{},{headers});
  }
}
