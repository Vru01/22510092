import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';

interface StudentGrade {
  ID: string;
  name: string;
  course_id: string;
  sec_id: string;
  semester: string;
  year: number;
  grade: string;
}

@Component({
  selector: 'app-manage-grades',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-grades.component.html',
  styleUrls: ['./manage-grades.component.css']
})
export class ManageGradesComponent implements OnInit {
  gradeForm!: FormGroup;
  isSubmitting = false;
  students: StudentGrade[] = []; 

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.gradeForm = this.fb.group({
      grades: this.fb.array([])
    });

    this.loadStudentGrades();
  }

  get gradeControls() {
    return this.gradeForm.get('grades') as FormArray;
  }

  loadStudentGrades(): void {
    // Mock data: In real application, fetch from API
    this.students = [
      { ID: 'S101', name: 'Alice', course_id: 'CSE101', sec_id: '1', semester: 'Fall', year: 2024, grade: 'B' },
      { ID: 'S102', name: 'Bob', course_id: 'CSE102', sec_id: '1', semester: 'Fall', year: 2024, grade: 'A' }
    ];

    this.students.forEach(student => {
      this.gradeControls.push(this.fb.group({
        ID: [student.ID],
        course_id: [student.course_id],
        sec_id: [student.sec_id],
        semester: [student.semester],
        year: [student.year],
        grade: [student.grade]
      }));
    });
  }

  updateGrades(): void {
    if (this.gradeForm.valid) {
      this.isSubmitting = true;
      console.log('Updated Grades:', this.gradeForm.value.grades);
      
      setTimeout(() => {
        alert('Grades updated successfully!');
        this.isSubmitting = false;
      }, 1500);
    }
  }
}
