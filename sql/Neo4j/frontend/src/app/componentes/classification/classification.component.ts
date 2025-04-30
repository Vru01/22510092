import { Component,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { PaperService } from '../../services/paper.service';

@Component({
  selector: 'app-classification',
  standalone: true,
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.css'],
  imports: [ReactiveFormsModule,CommonModule], 
})
export class ClassificationComponent {
  misService=inject(PaperService)
  loginForm: FormGroup;
  responce:any;

  constructor(private fb: FormBuilder,private router: Router ) {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loginForm.get('userId')?.valueChanges.subscribe(value => {
      if (!value) {
        this.responce = null;
      }
    });
  }

  get userId() {
    return this.loginForm.get('userId');
  }

  formatClassification(classPath: string): string {
    return classPath
      .split('/')
      .filter(part => part.trim() !== '')
      .map(part => part.replace(/_/g, ' '))
      .join(' / ');
  }
  

  onSubmit() {
    if (this.loginForm.valid) {
      this.misService.getClassifications(this.loginForm.value.userId
      )
      .pipe(
        catchError((err) => {
          console.error("classification failed", err);
          alert("classification failed. Please try again.");
           throw err; 
        })
      )
      .subscribe({
        next: (response) => {
          if (response) {
            console.log(response);
            this.responce=response
          }
        },
        error: (err) => {
          console.error("Error during classification:", err);
          alert("An error occurred during classification.");
        }
      });
    } else {
      alert("Please fill the form correctly.");
    }
  }
  
  
}

