
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  form: FormGroup;
  successMsg: String;
  errMsg: String;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email : ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password : ['', [Validators.required]],
    });
  }

  get login(){
    return this.form.controls
  }

  onSubmit(){
    this.successMsg = '';
    this.errMsg = '';
    this.submitted = true;
    if(this.form.invalid){
      return
    }
    this.userService.login(this.form.value).subscribe((response) => {
      if(response.status == "1") {
        this.userService.setUserData(response.user);
        this.successMsg = response.message;
        setTimeout(() => {
          this.router.navigate(['train']);
        }, 300);
      } else {
        this.errMsg = response.message;
      }
    })
  }
}