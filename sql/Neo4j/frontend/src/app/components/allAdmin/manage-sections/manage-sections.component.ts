import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-sections',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-sections.component.html',
  styleUrls: ['./manage-sections.component.css']
})
export class ManageSectionsComponent {
  sections = [
    { id: 'S1', name: 'Section A', semester: 1, room: '101' },
    { id: 'S2', name: 'Section B', semester: 2, room: '202' },
    { id: 'S3', name: 'Section C', semester: 3, room: '303' }
  ];

  addSection() {
    console.log('Add section functionality will be implemented.');
  }

  editSection(sectionId: string) {
    console.log(`Edit section with ID: ${sectionId}`);
  }

  deleteSection(sectionId: string) {
    console.log(`Delete section with ID: ${sectionId}`);
  }
}
