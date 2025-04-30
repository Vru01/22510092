import { Component,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { PaperService } from '../../services/paper.service';

@Component({
  selector: 'app-custom-query',
  templateUrl: './custom-query.component.html',
  styleUrl: './custom-query.component.css',
  imports: [ReactiveFormsModule,CommonModule], 
})
export class CustomQueryComponent {
  misService=inject(PaperService)
  loginForm: FormGroup;
  queryResponse: any = null;

  constructor(private fb: FormBuilder,private router: Router ) {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required]]
    });
  }

  get userId() {
    return this.loginForm.get('userId');
  }

  ngOnInit(): void {
    this.loginForm.get('userId')?.valueChanges.subscribe(value => {
      if (!value) {
        this.queryResponse = null;
      }
    });
  }

  setRes(){
    this.queryResponse=null;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.misService.runMiscQuery(this.loginForm.value.userId
      )
      .pipe(
        catchError((err) => {
          console.error("query failed", err);
          alert("queryfailed. Please try again.");
           throw err; 
        })
      )
      .subscribe({
        next: (response) => {
          if (response) {
            console.log(response);
            this.queryResponse = response;
          }
        },
        error: (err) => {
          console.error("Error during query:", err);
          alert("An error occurred during query.");
        }
      });
    } else {
      alert("Please fill the form correctly.");
    }
  }
}
