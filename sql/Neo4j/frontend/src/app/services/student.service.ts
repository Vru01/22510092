import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  http=inject(HttpClient)
  constructor() { }

  private apiUrl = 'http://localhost:5000/api/student';

  addStudent(student:any):Observable<any>{
    return this.http.post('http://localhost:5000/api/student',student)
  }

  enrollInCourse(data:any):Observable<any>{
    return this.http.post('http://localhost:5000/api/takes',data)
  }

  removeFromCourse(data:any):Observable<any>{
    console.log(data)
    return this.http.delete(`http://localhost:5000/api/takes/${data.ID}/${data.course_id}`)
  }

  getAllStudents():Observable<any>{
    return this.http.get('http://localhost:5000/api/student')
  }
  updateStudent(ID:string,data:any):Observable<any>{
    return this.http.patch(`http://localhost:5000/api/student:${ID}`,data)
  }

  getAllInfoOfStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/info`);
  }

  getStudentById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }


  getAllInfoOfStudentById(id: string): Observable<any> {
    console.log(id)
    return this.http.get(`${this.apiUrl}/info/${id}`);
  }

}
