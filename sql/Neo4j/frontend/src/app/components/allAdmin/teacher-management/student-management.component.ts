import { Component,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignCoursesComponent } from '../assign-courses/assign-courses.component';
import { RegisterTeacherComponent } from '../register-teacher/register-teacher.component';


@Component({
  selector: 'app-teacher-management',
  standalone: true,
  imports: [CommonModule,
    AssignCoursesComponent,
    RegisterTeacherComponent
  ],
  templateUrl: './student-management.component.html',
  styleUrls: ['./student-management.component.css']
})
export class TeacherManagementComponent {
  activeTab: string = 'register';

  setActiveTab(tab: string) {
    this.activeTab = tab;
    console.log(`Active tab changed to: ${this.activeTab}`);
  }
}
