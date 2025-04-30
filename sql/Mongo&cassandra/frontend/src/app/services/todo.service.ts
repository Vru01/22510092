
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model'; 

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:5000/api/todos';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(text: string): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, { text });
  }

  toggleTaskCompletion(id: string): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, {});
  }

  deleteTask(id: string): Observable<{ message: string }> {
    console.log(id)
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}


