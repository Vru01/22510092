import { Component } from '@angular/core';
import {CommonModule } from '@angular/common';
import { CitationComponent } from '../citation/citation.component';
import { ClassificationComponent } from '../classification/classification.component';
import { CustomQueryComponent } from '../custom-query/custom-query.component';


@Component({
  selector: 'app-new-home',
  standalone:true,
  imports: [
   CommonModule,
   CitationComponent,
   ClassificationComponent,
   CustomQueryComponent
  ],
  templateUrl: './new-home.component.html',
  styleUrl: './new-home.component.css'
})
export class NewHomeComponent {
  activeSection: string = 'citation';

  setActiveSection(section: string) {
    this.activeSection = section;
  }
}


