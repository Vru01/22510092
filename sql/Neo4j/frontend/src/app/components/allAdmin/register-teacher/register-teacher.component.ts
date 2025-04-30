import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from '../../../services/department.service';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { TeacherService } from '../../../services/teacher.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-teacher',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register-teacher.component.html',
  styleUrl: './register-teacher.component.css'
})
export class RegisterTeacherComponent implements OnInit {
studentForm!: FormGroup;
  isSubmitting = false;
  departments: any[] =[]
  
  @Input() setActiveTab!: (tab: string) => void;

  constructor(private fb: FormBuilder, private teacherService: TeacherService,private departmentService:DepartmentService,
    private router:Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    console.log('setActiveTab function received:', this.setActiveTab);

    this.departmentService.getAllDepartments().subscribe(
      (data: string[]) => {
        this.departments = data;  
        console.log(this.departments)
      },
      (error) => {
        console.error('Error fetching departments', error);  
      }
    );
    this.studentForm = this.fb.group({
      ID: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      dept_name: ['', Validators.required],
      salary: ['', [Validators.required]], 
      isDepartmentHead: [false]
    });
  }

  registerStudent(): void {
    if (this.studentForm.valid) {
      this.isSubmitting = true;
      console.log('Teacher Registered:', this.studentForm.value);
    
      this.teacherService.addTeacher(this.studentForm.value)
        .pipe(
          tap(response => {
            console.log('Teacher added successfully:', response);
          }),
          catchError(error => {
            console.error('Error adding Teacher:', error);
            alert('Failed to add Teacher. Please try again.');
            return throwError(() => error);
          }),
          finalize(() => {
            this.isSubmitting = false; 
          })
        )
        .subscribe({
          next: () => {
            alert('Teacher registered successfully!');
            this.studentForm.reset();
            console.log('Switching to Enroll tab...');
            this.setActiveTab('enroll');
            this.cdr.detectChanges();
          },
          error: (error) => {
            console.error('Error in subscription:', error);
            alert('Something went wrong. Please try again.');
          }
        });
    
    } else {
      alert('Please fill the form correctly.');
    }
  }
}
