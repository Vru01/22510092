import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MisService } from '../../../services/mis.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Department } from '../../../models/department.type';

@Component({
  selector: 'app-manage-departments',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './manage-departments.component.html',
  styleUrls: ['./manage-departments.component.css']
})
export class ManageDepartmentsComponent {
  departmentForm!: FormGroup;
  departments: Department[] = [];
  editingDepartment: Department | null = null;

  adminService = inject(AdminService);
  misService = inject(MisService);
  

  constructor(private fb: FormBuilder) {
    this.departmentForm = this.fb.group({
      id: ['', Validators.required],
      dept_name: ['', Validators.required],
      building: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(1)]]
    });
  }

  get budget(){
    return this.departmentForm.get('budget');
  }

  get dept_name(){
    return this.departmentForm.get('dept_name');
  }

  get id(){
    return this.departmentForm.get('id')
  }

  get building(){
    return this.departmentForm.get('building');
  }

  

  ngOnInit(): void {
    this.featchDepartments()
  }

  featchDepartments(){
    this.adminService.getDepartments().subscribe({
      next: (data: any) => {
        console.log('Fetched Users:', data);
        this.departments = data;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  addOrUpdateDepartment(): void {
    if (this.departmentForm.valid) {
      const department: Department =this.departmentForm.value

      if (this.editingDepartment) {
        this.adminService.updateDepartment(this.editingDepartment.dept_name, department).pipe(
          catchError((err) => {
            console.error('Department update failed:', err);
            alert('Department update failed. Please try again.');
            return throwError(() => err);
          })
        )
        .subscribe(() => {
          alert('Department updated successfully!');
          this.resetForm();
          this.featchDepartments(); 
        });

      } else {
        
        this.adminService.addDepartment(department).pipe(
          catchError((err) => {
            console.error('Department creation failed:', err);
            alert('Department creation failed. Please try again.');
            return throwError(() => err);
          })
        )
        .subscribe(() => {
          alert('Department added successfully!');
          this.resetForm();
          this.featchDepartments(); // Refresh users list
        });
      }
    } else {
      alert('Please fill the form correctly.');
    }
    this.departmentForm.reset(); 
  }

  resetForm(): void {
    this.departmentForm.reset();
    this.editingDepartment = null;
  }

  // Edit a department
  editDepartment(department: Department): void {
    this.editingDepartment= department;

    console.log(this.editingDepartment)
    this.departmentForm.patchValue({
      id:department.id,
      dept_name: department.dept_name,
      building: department.building,
      budget: department.budget
    });
  }


  // Delete a department
  deleteDepartment(dept_name: string): void {

      if (confirm("Are you sure you want to delete this user?")) {
        this.adminService.deleteDepartment(dept_name).pipe(
          catchError((err) => {
            console.error('User deletion failed:', err);
            alert('User deletion failed. Please try again.');
            return throwError(() => err);
          })
        )
        .subscribe(() => {
          alert('User deleted successfully!');
          this.featchDepartments(); // Refresh users list
        });
      }
  }
  
}
