import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core';
import { User } from '../models/user.type';
import { Observable } from 'rxjs';
import { Department } from '../models/department.type';
import { Classroom } from '../models/classroom.type';
import { Course } from '../models/course.type';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient); 
  constructor() { }

  getUsers(){
    return this.http.get('http://localhost:5000/api/user')
  }

  addUser(user: User): Observable<any> {
    return this.http.post("http://localhost:5000/api/user/register", user);
  }

  deleteUserById(ID:string):Observable<any>{
    return this.http.delete(`http://localhost:5000/api/user/${ID}`)
  }
  
  updateUser(ID:string,user:User):Observable<any>{
      return this.http.put(`http://localhost:5000/api/user/${ID}`,user)
  } 


  addDepartment(department:Department): Observable<any> {
    return this.http.post("http://localhost:5000/api/department", department);
  }

  deleteDepartment(dept_name:string):Observable<any>{
    return this.http.delete(`http://localhost:5000/api/department/${dept_name}`)
  }

  getDepartments(){
    return this.http.get('http://localhost:5000/api/department')
  }

  updateDepartment(dept_name:string,department:Department):Observable<any>{
    return this.http.put(`http://localhost:5000/api/department/${dept_name}`,department)
  } 

  addClassroom(classroom:Classroom): Observable<any> {
    return this.http.post("http://localhost:5000/api/classroom", classroom);
  }

  deleteClassroom(building:string,room_number:string):Observable<any>{
    return this.http.delete(`http://localhost:5000/api/classroom/${building}&${room_number}`)
  }

  getClassrooms(){
    return this.http.get('http://localhost:5000/api/classroom')
  }

  updateClassroom(building:string,room_number:string,classroom:Classroom):Observable<any>{
    console.log(`${building}"&"${room_number}`)
    return this.http.put(`http://localhost:5000/api/classroom/${building}&${room_number}`,classroom)
  } 

  addCourse(course:Course): Observable<any> {
    return this.http.post("http://localhost:5000/api/course", course);
  }

  deleteCourse(course_id:string):Observable<any>{
    return this.http.delete(`http://localhost:5000/api/course/${course_id}`)
  }

  getCourses(){
    return this.http.get('http://localhost:5000/api/course')
  }

  updateCourse(course_id:string,course:Course):Observable<any>{
    return this.http.put(`http://localhost:5000/api/classroom/${course_id}`,course)
  }

  addPrerequisites(course_id:string,prereq:any[]):Observable<any>{
    return this.http.post(`http://localhost:5000/api/prereq/${course_id}`,prereq);
  }

  updatePrerequisites(course_id:string,prereq:any[]):Observable<any>{
    console.log(prereq)
    return this.http.put(`http://localhost:5000/api/prereq/${course_id}`,prereq);
  }

  getPrerequisites(course_id:string):Observable<any>{
    return this.http.get(`http://localhost:5000/api/prereq/${course_id}`)
  }
  
}
