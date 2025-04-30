import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Observable } from 'rxjs';
import { MisService } from '../../services/mis.service';

interface Course {
  course_id: string;
  course_title: string;
  semester: number;
  year: number;
  grade: string;
}

interface Student {
  student_id: number;
  student_name: string;
  student_department: string;
  total_credits: number;
  department_building: string;
  department_budget: number;
  courses: Course[];
}

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  @Input() studentId!: number;
  student: Student | null = null;
  mis=inject(MisService)

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    console.log(this.mis.getUserId())

      this.studentService.getAllInfoOfStudentById(this.mis.getUserId()).subscribe(data => {
        if (data.length > 0) {
          console.log(data)
          this.student = {
            student_id: data[0].student_id,
            student_name: data[0].student_name,
            student_department: data[0].student_department,
            total_credits: data[0].total_credits,
            department_building: data[0].department_building,
            department_budget: data[0].department_budget,
            courses: data
              .map((d: any) => ({
                course_id: d.course_id,
                course_title: d.course_title,
                semester: d.semester,
                year: d.year,
                grade: d.grade
              }))
              .filter((c: any) => c.course_id)
          };
        }
      });
    
  }
}
