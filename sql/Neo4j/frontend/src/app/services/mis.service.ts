import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.type';

@Injectable({
  providedIn: 'root'
})
export class MisService {
  private http = inject(HttpClient);  

  constructor() { }

  login(user: User): Observable<any> {  
    return this.http.post<any>('http://localhost:5000/api/user/login', user);
  }

  getBaseUrl():string{
    return "http://localhost:5000/api";
  }

  getRole(userId: string): string {
    switch (userId.charAt(0)) {
      case 'A': return "Admin";
      case 'S': return "Student";
      case 'D': return "Department Head";
      case 'F': return "Faculty";
      case 'R': return "Registrar";
      default: return "Unknown Role"; 
    }
  }

  getToken():string{
    const token = JSON.parse(localStorage.getItem('token') || '{}'); 
    return token;
  }

  getUserId(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); 

    return user.ID ? user.ID:'';
  }

  getUserRole(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); 
    return user.role ? user.role :'';
  }

  getUserName(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); 
    return user.name ? user.name.split(' ')[0] : '';
  }
  
}
