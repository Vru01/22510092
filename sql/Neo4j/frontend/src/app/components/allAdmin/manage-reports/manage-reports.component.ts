import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-reports.component.html',
  styleUrls: ['./manage-reports.component.css']
})
export class ManageReportsComponent {
  reports = [
    { id: 'R1', title: 'Total Students', count: 250 },
    { id: 'R2', title: 'Total Courses', count: 20 },
    { id: 'R3', title: 'Total Enrollments', count: 500 }
  ];

  generateReport() {
    console.log('Generating report...');
  }
}
