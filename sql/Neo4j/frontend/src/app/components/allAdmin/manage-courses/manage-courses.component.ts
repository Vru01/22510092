// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { DepartmentService } from '../../../services/department.service';
// import { CourseService } from '../../../services/course.service';
// import { catchError, of } from 'rxjs';

// @Component({
//   selector: 'app-manage-courses',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule], 
//   templateUrl: './manage-courses.component.html',
//   styleUrls: ['./manage-courses.component.css']
// })
// export class ManageCoursesComponent implements OnInit {
//   courseForm: FormGroup;
//   courses: any[] = [];  
//   isEditing: boolean = false;  
//   currentEditIndex: number = -1;  
//   departments: any[] = [];

//   constructor(private fb: FormBuilder,
//               private departmentService: DepartmentService,
//               private courseService: CourseService) {
//     this.courseForm = this.fb.group({
//       courseName: ['', [Validators.required, Validators.minLength(3)]],
//       courseCode: ['', [Validators.required, Validators.minLength(3)]],
//       dept_name: ['', Validators.required],
//       credits: ['', [Validators.required, Validators.min(1)]], 
//     });
//   }

//   ngOnInit(): void {
//     this.departmentService.getAllDepartments().subscribe(
//       (data: string[]) => {
//         this.departments = data;  
//         console.log(this.departments);
//       },
//       (error) => {
//         console.error('Error fetching departments', error);  
//       }
//     );

//     console.log("kay yarr nusta timepass...!");
//     this.fetchCourses()
//   }

//   fetchCourses():void{
//     this.courseService.getAllCourses().subscribe(
//       (data: string[]) => {
//         this.courses = data;  
//         console.log(this.courses);
//       },
//       (error) => {
//         console.error('Error fetching departments', error);  
//       }
//     );
//   };

//   addCourse(): void {
//     if (this.courseForm.valid) {
//       const course = this.courseForm.value;
//       console.log(course); 
  
//       this.courseService.addCourse(course).pipe(
//         catchError(error => {
//           console.error('Error adding course:', error);
//           alert('There was an error adding the course.');
//           return of(null);
//         })
//       ).subscribe(response => {
//         if (response) {
//           if (this.isEditing) {
//             this.courses[this.currentEditIndex] = { ...course };
//           } else {
//             this.courses.push(course);
//           }
//           this.resetForm();
//         } else {
//           alert('Failed to add course.');
//         }
//       });
//     } else {
//       alert('Please fill in all required fields.');
//     }
//   }

//   editCourse(course:any): void {
//     this.isEditing = true;
//     this.courseForm.setValue({
//       courseName: course.title,
//       courseCode: course.course_id,
//       dept_name: course.dept_name,
//       credits: course.credits
//     });
//   }

//   deleteCourse(course_id: number): void {
//     if (confirm('Are you sure you want to delete this course?')) {
//       this.courseService.deleteCourse(course_id).pipe(
//         catchError(error => {
//           console.error('Error deleting course:', error);
//           alert('There was an error deleting the course.');
//           return of(null); 
//         })
//       ).subscribe(response => {
//         if (response) {
//           this.fetchCourses()
//           alert('Course deleted successfully.');
//         } else {
//           alert('Failed to delete the course.');
//         }
//       });
//     }
//   }


//   resetForm(): void {
//     this.courseForm.reset();
//     this.isEditing = false;
//     this.currentEditIndex = -1;
//   }
// }

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../../../services/department.service';
import { CourseService } from '../../../services/course.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-manage-courses',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css']
})
export class ManageCoursesComponent implements OnInit {
  courseForm: FormGroup;
  courses: any[] = [];  
  isEditing: boolean = false;  
  currentEditIndex: number = -1;  
  departments: any[] = [];
  isLoading: boolean = false;  // Loading state for API calls

  constructor(private fb: FormBuilder,
              private departmentService: DepartmentService,
              private courseService: CourseService) {
    this.courseForm = this.fb.group({
      courseName: ['', [Validators.required, Validators.minLength(3)]],
      courseCode: ['', [Validators.required, Validators.minLength(3)]],
      dept_name: ['', Validators.required],
      credits: ['', [Validators.required, Validators.min(1)]], 
    });
  }

  ngOnInit(): void {
    this.fetchDepartments();
    this.fetchCourses();
  }

  fetchDepartments(): void {
    this.isLoading = true;
    this.departmentService.getAllDepartments().subscribe(
      (data: any[]) => {
        this.departments = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching departments', error);
        this.isLoading = false;
        alert('Failed to load departments.');
      }
    );
  }

  fetchCourses(): void {
    this.isLoading = true;
    this.courseService.getAllCourses().subscribe(
      (data: any[]) => {
        this.courses = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching courses', error);
        this.isLoading = false;
        alert('Failed to load courses.');
      }
    );
  }

  addCourse(): void {
    if (this.courseForm.valid) {
      const course = this.courseForm.value;
      this.isLoading = true;  // Start loading while making the request
      
      this.courseService.addCourse(course).pipe(
        catchError(error => {
          console.error('Error adding course:', error);
          this.isLoading = false;
          alert('There was an error adding the course.');
          return of(null);
        })
      ).subscribe(response => {
        if (response) {
         this.fetchCourses();
          this.resetForm();
        } else {
          alert('Failed to add course.');
        }
        this.isLoading = false;  // Stop loading after the request completes
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  editCourse(course: any): void {
    this.isEditing = true;
    this.courseForm.setValue({
      courseName: course.title,
      courseCode: course.course_id,
      dept_name: course.dept_name,
      credits: course.credits
    });
  }

  deleteCourse(course_id: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.isLoading = true;  // Start loading while making the request

      this.courseService.deleteCourse(course_id).pipe(
        catchError(error => {
          console.error('Error deleting course:', error);
          this.isLoading = false;
          alert('There was an error deleting the course.');
          return of(null);
        })
      ).subscribe(response => {
        if (response) {
          this.fetchCourses();  // Refresh the course list after deletion
          alert('Course deleted successfully.');
        } else {
          alert('Failed to delete the course.');
        }
        this.isLoading = false;  // Stop loading after the request completes
      });
    }
  }

  resetForm(): void {
    this.courseForm.reset();
    this.isEditing = false;
    this.currentEditIndex = -1;
  }
}
