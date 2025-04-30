import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../services/admin.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MisService } from '../../../services/mis.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Classroom } from '../../../models/classroom.type';

@Component({
  selector: 'app-manage-classrooms',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './manage-classrooms.component.html',
  styleUrl: './manage-classrooms.component.css'
})
export class ManageClassroomsComponent {
  classroomForm!: FormGroup;
  Classrooms: Classroom[] = [];
  editingClassroom: Classroom| null = null;

  adminService = inject(AdminService);
  misService = inject(MisService);
  

  constructor(private fb: FormBuilder) {
    this.classroomForm = this.fb.group({
      room_number: ['', Validators.required],
      building: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  get room_number(){
    return this.classroomForm.get('room_number');
  }

  get capacity(){
    return this.classroomForm.get('capacity');
  }

  get building(){
    return this.classroomForm.get('building');
  }

  
  ngOnInit(): void {
    this.featchClassrooms()
  }

  featchClassrooms(){
    this.adminService.getClassrooms().subscribe({
      next: (data: any) => {
        console.log('Fetched classrooms:', data);
        this.Classrooms = data;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  addOrUpdateClassroom(): void {
    if (this.classroomForm.valid) {
      const classroom: Classroom = {
        room_number: this.classroomForm.value.room_number,
        building: this.classroomForm.value.building,
        capacity: this.classroomForm.value.capacity   
      };

      if (this.editingClassroom) {
        this.adminService.updateClassroom(this.editingClassroom.building, this.editingClassroom.room_number,classroom).pipe(
          catchError((err) => {
            console.error('classroom update failed:', err);
            alert('classroom update failed. Please try again.');
            return throwError(() => err);
          })
        )
        .subscribe(() => {
          alert('classroom updated successfully!');
          this.resetForm();
          this.featchClassrooms(); 
        });

      } else {
        
        this.adminService.addClassroom(classroom).pipe(
          catchError((err) => {
            console.error('classroom creation failed:', err);
            alert('classroom creation failed. Please try again.');
            return throwError(() => err);
          })
        )
        .subscribe(() => {
          alert('classroom added successfully!');
          this.resetForm();
          this.featchClassrooms(); // Refresh users list
        });
      }
    } else {
      alert('Please fill the form correctly.');
    }
    this.classroomForm.reset(); 
  }

  resetForm(): void {
    this.classroomForm.reset();
    this.editingClassroom = null;
  }

  // Edit a classroom
  editClassroom(classroom: Classroom): void {
    this.editingClassroom= classroom;

    this.classroomForm.patchValue({
        room_number: classroom.room_number,
        building: classroom.building,
        capacity: classroom.capacity 
    });
  }


  // Delete a classroom
  deleteClassroom(building:string,room_number:string): void {

      if (confirm("Are you sure you want to delete this user?")) {
        this.adminService.deleteClassroom(building,room_number).pipe(
          catchError((err) => {
            console.error('User deletion failed:', err);
            alert('User deletion failed. Please try again.');
            return throwError(() => err);
          })
        )
        .subscribe(() => {
          alert('User deleted successfully!');
          this.featchClassrooms(); 
        });
      }
  }
  
}
