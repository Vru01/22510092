import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  http=inject(HttpClient)
  constructor() { }

  getAllDepartments():Observable<any>{
    return this.http.get('http://localhost:5000/api/department')
  }

 
}
