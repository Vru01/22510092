import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  http=inject(HttpClient)

  constructor() { }

  addCourse(course:any):Observable<any>{
    return this.http.post('http://localhost:5000/api/course',course)
  }

  getAllCourses():Observable<any>{
    return this.http.get('http://localhost:5000/api/course')
  }

  deleteCourse(course_id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:5000/api/course/${course_id}`);
  }

  getAllCoursesByDepartment(department:string):Observable<any>{
    return this.http.get(`http://localhost:5000/api/department/${department}`)
  }
}
