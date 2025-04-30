import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisService } from '../../services/mis.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Enrolled Courses</h2>
    <ul *ngIf="courses.length; else noData">
      <li *ngFor="let course of courses">{{ course.title }} ({{ course.credits }} credits)</li>
    </ul>
    <ng-template #noData><p>No courses found.</p></ng-template>
  `,
  styles: ['h2 { margin-bottom: 10px; }']
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];

  constructor(private misService: MisService) {}

  ngOnInit(): void {
    // this.misService.getCourses().subscribe(
    //   data => this.courses = data,
    //   error => console.error('Error fetching courses:', error)
    // );
  }
}
