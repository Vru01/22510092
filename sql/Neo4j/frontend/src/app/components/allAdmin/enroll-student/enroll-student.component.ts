import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../services/course.service'; 
import { StudentService } from '../../../services/student.service';  

@Component({
  selector: 'enroll-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],  
  templateUrl: './enroll-student.component.html',
  styleUrls: ['./enroll-student.component.css'],
})
export class EnrollStudentComponent implements OnInit {
  enrollForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService, 
    private studentService: StudentService 
  ) {
    this.enrollForm = this.fb.group({
      ID: ['', [Validators.required, Validators.minLength(3)]],  
      course_id: ['', Validators.required], 
    });
  }

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
  }

  enrollStudent(): void {
    if (this.enrollForm.invalid) {
      return;  
    }

    this.isSubmitting = true;
    const enrollmentData = this.enrollForm.value;

    this.studentService.enrollInCourse(enrollmentData).subscribe(
      (response) => {
        console.log('Enrollment Successful:', response);
        alert('Student successfully enrolled!');
        this.enrollForm.reset(); 
        this.isSubmitting = false;
      },
      (error) => {
        console.error('Error enrolling student:', error);
        alert('Failed to enroll student.');
        this.isSubmitting = false;
      }
    );
  }


  removeStudent(): void {
    if (this.enrollForm.invalid) {
      return;
    }
  
    this.isSubmitting = true;
    const enrollmentData = this.enrollForm.value;
  
    this.studentService.removeFromCourse(enrollmentData).subscribe(
      (response) => {
        console.log('Removal Successful:', response);
        alert('Student successfully removed from the course!');
        this.enrollForm.reset(); 
        this.isSubmitting = false;
      },
      (error) => {
        console.error('Error removing student:', error);
        alert('Failed to remove student from the course.');
        this.isSubmitting = false;
      }
    );
  }
  
}
