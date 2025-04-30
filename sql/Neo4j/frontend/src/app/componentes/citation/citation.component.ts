import { Component,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { PaperService } from '../../services/paper.service';

@Component({
  selector: 'app-citation',
  standalone: true,
  templateUrl: './citation.component.html',
  styleUrls: ['./citation.component.css'],
  imports: [ReactiveFormsModule, CommonModule], 
})
export class CitationComponent {
  misService=inject(PaperService)
  response: { cites: boolean, count: number } | null = null;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router ) {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loginForm.get('userId')?.valueChanges.subscribe(value => {
      if (!value) {
        this.response = null;
      }
    });

    this.loginForm.get('password')?.valueChanges.subscribe(value => {
      if (!value) {
        this.response = null;
      }
    });
  }

  get userId() {
    return this.loginForm.get('userId');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.misService.checkCites(this.loginForm.value.userId,this.loginForm.value.password
      )
      .pipe(
        catchError((err) => {
          console.error("Check failed", err);
          alert("Check failed. Please try again.");
           throw err; 
        })
      )
      .subscribe({
        next: (response) => {
          if (response) {
            console.log(response);
            this.response = response;
          }
        },
        error: (err) => {
          console.error("Error during checking:", err);
          alert("An error occurred during check.");
        }
      });
    } else {
      alert("Please fill the form correctly.");
    }
  }
  
  
}

