import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../services/course.service'; 
import { StudentService } from '../../../services/student.service';  
import { TeacherService } from '../../../services/teacher.service';

@Component({
  selector: 'app-assign-courses',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './assign-courses.component.html',
  styleUrl: './assign-courses.component.css'
})
export class AssignCoursesComponent implements OnInit {
   enrollForm: FormGroup;
    isSubmitting: boolean = false;
  
    constructor(
      private fb: FormBuilder,
      private courseService: CourseService, 
      private teacherService: TeacherService
    ) {
      this.enrollForm = this.fb.group({
        ID: ['', [Validators.required, Validators.minLength(3)]],  
        course_id: ['', Validators.required], 
        semester: ['', Validators.required], 
        year: ['', Validators.required], 
      });
    }
  
    ngOnInit(): void {
      this.fetchCourses();
    }
  
    fetchCourses(): void {
    }
  
    enrollStudent(): void {
      if (this.enrollForm.invalid) {
        console.log("hii")
        return;  
      }
  
      console.log(this.enrollForm.value)
      this.isSubmitting = true;
      const enrollmentData = this.enrollForm.value;
  
      this.teacherService.assignCourse(enrollmentData).subscribe(
        (response) => {
          console.log('Assigned Successful:', response);
          alert('Course Assigned !');
          this.enrollForm.reset(); 
          this.isSubmitting = false;
        },
        (error) => {
          console.error('error while assign course:', error);
          alert('Failed to assign course falied.');
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
    
      this.teacherService.removeAssignedCourse(enrollmentData).subscribe(
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
