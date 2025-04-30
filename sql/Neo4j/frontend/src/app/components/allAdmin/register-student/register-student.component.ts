import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../../../services/student.service';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { DepartmentService } from '../../../services/department.service';
import { RouterModule, Router } from '@angular/router'; 

@Component({
  selector: 'app-register-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent implements OnInit {
  studentForm!: FormGroup;
  isSubmitting = false;
  departments: any[] =[]
  @Input() setActiveTab!: (tab: string) => void;

  constructor(private fb: FormBuilder, private studentService: StudentService,private departmentService:DepartmentService,
    private router:Router,
    private cdr: ChangeDetectorRef
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
    });
  }

  registerStudent(): void {
    if (this.studentForm.valid) {
      this.isSubmitting = true;
      console.log('Student Registered:', this.studentForm.value);
    
      this.studentService.addStudent(this.studentForm.value)
        .pipe(
          tap(response => {
            console.log('Student added successfully:', response);
          }),
          catchError(error => {
            console.error('Error adding student:', error);
            alert('Failed to add student. Please try again.');
            return throwError(() => error);
          }),
          finalize(() => {
            this.isSubmitting = false; 
          })
        )
        .subscribe({
          next: () => {
            alert('Student registered successfully!');
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
