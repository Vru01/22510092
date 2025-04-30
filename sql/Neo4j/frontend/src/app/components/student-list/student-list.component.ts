import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-student-list',
  imports:[
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: any[] = []; 
  isLoading = true; 

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.fetchStudents();
  }

  fetchStudents() {
    this.studentService.getAllInfoOfStudents().subscribe(
      (data: any[]) => {
        console.log(data)
        this.students = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching student data:', error);
        this.isLoading = false;
      }
    );
  }
}
