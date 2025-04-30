import { Component, OnInit } from '@angular/core';
import {CommonModule } from '@angular/common';
import { ManageUsersComponent } from '../allAdmin/manage-users/manage-users.component';
import { ManageDepartmentsComponent } from '../allAdmin/manage-departments/manage-departments.component';
import { ManageSectionsComponent } from '../allAdmin/manage-sections/manage-sections.component';
import { ManageReportsComponent } from '../allAdmin/manage-reports/manage-reports.component';
import { ManageClassroomsComponent } from '../allAdmin/manage-classrooms/manage-classrooms.component';
import { StudentManagementComponent } from '../allAdmin/student-management/student-management.component';
import { ManageCoursesComponent } from '../allAdmin/manage-courses/manage-courses.component';
import { TeacherManagementComponent } from '../allAdmin/teacher-management/student-management.component';

@Component({
  selector: 'app-faculty-dashboard',
  standalone:true,
  imports: [
   CommonModule,
   ManageUsersComponent,
   ManageDepartmentsComponent,
   ManageSectionsComponent,
   ManageReportsComponent,
   ManageCoursesComponent,
   ManageClassroomsComponent,
   StudentManagementComponent,
   TeacherManagementComponent
  ],
  templateUrl: './faculty-dashboard.component.html',
  styleUrl: './faculty-dashboard.component.css'
})
export class FacultyDashboardComponent implements OnInit{
  activeSection: string = 'students';

  ngOnInit(): void {
    console.log("hello")
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }
}
