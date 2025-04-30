import { HttpBackend, HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  http=inject(HttpClient)
  constructor() { }

  addTeacher(data:any):Observable<any>{
    return this.http.post('http://localhost:5000/api/instructor',data)
  }

  assignCourse(data:any):Observable<any>{
    return this.http.post('http://localhost:5000/api/teaches',data)
  }

  removeAssignedCourse(data:any):Observable<any>{
    return this.http.delete(`http://localhost:5000/api/teaches/${data.ID}/${data.course_id}/${data.year}/${data.semester}`)
  }
}
