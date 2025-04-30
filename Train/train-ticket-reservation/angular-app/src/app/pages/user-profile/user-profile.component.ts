import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';
import {FormGroup,FormBuilder} from '@angular/forms'
import { UserService } from '@app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class ProfileComponent implements OnInit {
  userProfileForm:FormGroup
  selectedTab: Number = 0;
  userData: any = {}
  successMsg: String;
  errMsg: String;
  activities: any = [];
  actMsg:String;
  submitted = false;
  constructor(
    private BookingService: BookingService,
    private route:Router,
    private userService: UserService,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.userData = this.userService.getUserDataFromLocal();
    this.userProfileForm = this.fb.group({
      name : [this.userData.name, [Validators.required]],
      gender:[this.userData.gender,Validators.required],
      email    : [this.userData.email, [Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password : [this.userData.password, [Validators.required]],
      phone    : [this.userData.phone, [Validators.required,Validators.pattern("[0-9]{10}")]]
    })
    console.log(this.userData)
    if(this.route.url.match('/activity')) {
      this.selectedTab = 1;
      this.setBookingsData();
    }
  }

  userForm() {
    this.submitted = false;
    this.successMsg = '';
    this.errMsg = '';
   
    if(this.userProfileForm.invalid) 
    {
      this.submitted = true;
      return
    }
    console.log(this.userData)
    let objUser=Object.assign(this.userProfileForm.value,{userId:this.userData._id})
    this.userService.updateUser(objUser).subscribe((response) => {
      if(response.status == "1") {
        this.userService.setUserData(response.user);
        this.successMsg = response.message;
      } else {
        this.errMsg = response.message;
      }
    })
  }

  setBookingsData() {
    this.actMsg = '';
    let userId = this.userData._id;
    this.BookingService.getMyBookings({userId}).subscribe((response) => {
      if(response.message) {
        this.actMsg = response.message;
      }
      if(response.data) {
        this.activities = response.data;
      }
    })
  }

  changeTab(event) {
    if(event === 1) {
      this.setBookingsData();
    }
  }

  cancelTicket(bookingId) {
    if(confirm("Do you really want to cancel this ticket?")) {
      this.BookingService.cancelTrain({bookingId}).subscribe((response) => {
        if(response.status == 1) {
          let tempObj = this.activities;
          let index = tempObj.findIndex(item => item._id == bookingId);
          tempObj[index].status = 0;
          this.activities = tempObj;
        } else {
          alert("Something went wrong. Please try again later.")
        }
      })
    }
  }

}
