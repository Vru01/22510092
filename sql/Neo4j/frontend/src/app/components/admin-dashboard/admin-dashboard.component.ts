import { Component } from '@angular/core';
import {CommonModule } from '@angular/common';
import { CitationComponent } from '../../componentes/citation/citation.component';
import { ClassificationComponent } from '../../componentes/classification/classification.component';
import { CustomQueryComponent } from '../../componentes/custom-query/custom-query.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone:true,
  imports: [
   CommonModule,
   CitationComponent,
   ClassificationComponent,
   CustomQueryComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  activeSection: string = 'citation';

  setActiveSection(section: string) {
    this.activeSection = section;
  }
}
