import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  form: FormGroup;
  successMsg: String;
  errMsg: String;

  constructor(private formBuilder: FormBuilder, public router: Router, private userService: UserService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name : ['', [Validators.required]],
      gender:['M',Validators.required],
      email    : ['', [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password : ['', [Validators.required]],
      phone    : ['', [Validators.required,Validators.pattern("[0-9]{10}")]]
    });
  }
  get login(){
    return this.form.controls
  }

  onSubmit(){
    this.submitted = false;
    this.successMsg = '';
    this.errMsg = '';
 
    if(this.form.invalid){
      console.log("WWW",this.login)
      this.submitted = true;
      return
    }
    console.log(this.form.value)
    this.userService.register(this.form.value).subscribe((response) => {
      if(response.status == "1") {
        this.successMsg = 'User registered. Please continue with login.';
        this.router.navigate([''])
      } else {
        this.errMsg = response.message;
      }
    })
  }
}