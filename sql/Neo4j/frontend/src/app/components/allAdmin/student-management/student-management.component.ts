import { Component,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterStudentComponent } from '../register-student/register-student.component';
import { EnrollStudentComponent } from '../enroll-student/enroll-student.component';
import { StudentListComponent } from '../../student-list/student-list.component';
// import { ManageGradesComponent } from '../manage-grades/manage-grades.component';

@Component({
  selector: 'app-student-management',
  standalone: true,
  imports: [CommonModule, 
    RegisterStudentComponent, 
    EnrollStudentComponent,
    StudentListComponent
  ],
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class StudentManagementComponent {
  activeTab: string = 'register';

  setActiveTab(tab: string) {
    this.activeTab = tab;
    console.log(`Active tab changed to: ${this.activeTab}`);
  }
}
