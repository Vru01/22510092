import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user.service';
import { BookingService } from '@app/services/booking.service';

@Component({
  selector: 'train-confirm',
  templateUrl: './train-confirm.component.html',
  styleUrls: ['./train-confirm.component.css']
})
export class TrainConfirmComponent implements OnInit ,OnDestroy {

  @Output('closeModal') closeModal = new EventEmitter();
  @Input() trainInfo: any = {};
  @Input() pickedDate: any = {};
  userData: any = {};
  msg: String = '';

  constructor(
    private route:Router,
    private bookingService: BookingService,
    private userService: UserService
  ) { 
    
  }

  ngOnInit() {
    this.userData = this.userService.getUserDataFromLocal();
  }

  confirmJourney() {
    let body:any = {};
    body.date = this.pickedDate;
    body.trainNo = this.trainInfo.trainNo;
    body.seatNo = "SN" + (this.trainInfo.seatAvailability - 1);
    body.noofseats = 1;
    body.endPointId = this.trainInfo._id;
    body.userId = this.userData._id;
    this.bookingService.bookTrain(body).subscribe((response) => {
      if(response.status == "1") {
        this.msg = "Ticket booked successfully. Taking to your activities page now...";
        setTimeout(() => {
          this.closeModal.emit();
          this.route.navigateByUrl("/profile/activity");
        }, 300);
      } else {
        this.msg = "Something went wrong. Please try again later."
      }
    })
  }

  ngOnDestroy(){
  }

} 
