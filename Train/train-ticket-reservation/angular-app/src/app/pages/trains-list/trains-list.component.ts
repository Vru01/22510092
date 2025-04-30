import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { TrainService } from '../../services/train.service';
import { Subscription } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';

@Component({
  selector: 'trains-list',
  templateUrl: './trains-list.component.html',
  styleUrls: ['./trains-list.component.css']
})
export class TrainListComponent implements OnInit,OnDestroy {
  subscription:Subscription;
  trains:any = [];
  modalRef: BsModalRef;
  selectedRoute:any = {}

  constructor(
    private trainService: TrainService,
    private modalService: BsModalService,
    private router:Router
  ) { }

  ngOnInit() {
    this.subscription = this.trainService.selectedTrainInfo.subscribe(selectedRoute => this.selectedRoute = selectedRoute);
    if(Object.keys(this.selectedRoute).length <= 0) {
      this.router.navigate(["train"]);
    } else {
      this.getAllTrains();
    }
  }

  getAllTrains(){
    this.trainService.getTrains(this.selectedRoute).subscribe((response) => {
      if(response.message) {
        console.log(response.message);
      }
      if(response.data) {
        this.trains = response.data;
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);    
  }

  closeModal (){
    this.modalRef.hide();
  }

  formatDays(days) {
    return days.split(",").map(item => item.substring(0,1)).join(" ");
  }

}
