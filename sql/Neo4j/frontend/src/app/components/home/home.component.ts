import { Component,inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MisService } from '../../services/mis.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [ReactiveFormsModule, NgIf], 
})
export class HomeComponent {
  misService=inject(MisService)

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router ) {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
      this.misService.login({
        ID: this.loginForm.value.userId,
        password: this.loginForm.value.password,
        role: this.misService.getRole(this.loginForm.value.userId),
        name:""
      })
      .pipe(
        catchError((err) => {
          console.error("Login failed:", err);
          alert("Login failed. Please try again.");
           throw err; 
        })
      )
      .subscribe({
        next: (response) => {
          if (response && response.token) {
            console.log("Login successful! Token:", response.token);
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            alert("Login Successful!");

            console.log(this.misService.getUserRole())

            if(this.misService.getUserRole()=='Student')
            this.router.navigate(['/profile']);  
            
            if(this.misService.getUserRole()=="Admin")
              this.router.navigate(['/admin-dashboard']);  

            if(this.misService.getUserRole()=="Instructor")
              this.router.navigate(['/faculty-dashboard']);  

            if(this.misService.getUserRole()==="Department-Head")
              this.router.navigate(['/department-head-dashboard'])
          }
        },
        error: (err) => {
          console.error("Error during login:", err);
          alert("An error occurred during login.");
        }
      });
    } else {
      alert("Please fill the form correctly.");
    }
  }
  
  
}
