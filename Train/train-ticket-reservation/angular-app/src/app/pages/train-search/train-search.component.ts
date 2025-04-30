import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainService } from '../../services/train.service';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: '.train-search',
  templateUrl: './train-search.component.html',
  styleUrls: ['./train-search.component.css']
})
export class TrainSearchComponent implements OnInit, OnDestroy {
  
  selectPoint: FormGroup;
  submitted = false;
  sourceData = [];
  destinationData = [];
  endpoints = [];
  defaultDate = new Date().toISOString().substring(0,10);
  subscription: Subscription;
  selectedRoute: Object;

  constructor(private formBuilder: FormBuilder,
    private trainService:TrainService,
    private router:Router ) {}

  ngOnInit() {
    this.selectPoint = this.formBuilder.group({
      source : ['', [Validators.required]],
      destination : ['', [Validators.required]],
      date : [this.defaultDate, [Validators.required]],
    });
    this.getEndpoints();
    this.subscription = this.trainService.selectedTrainInfo.subscribe(selectedRoute => this.selectedRoute = selectedRoute);
  }

  get points(){
    return this.selectPoint.controls
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  SearchTrain() {
    this.submitted = true;
    if(this.selectPoint.valid) {
      this.selectedRoute = this.selectPoint.value;
      this.trainService.setTrainInfo(this.selectedRoute);
      this.router.navigate(['train/trainsList']);
    }
  }

  getEndpoints() {
    this.trainService.getEndPoints()
      .subscribe(response => {
        this.endpoints = response.data || []
        let startPoints = this.endpoints.map((item, idx) => {
          return item.startPoint
        })

        this.sourceData  = [...new Set(startPoints)];
     
      })
  }

  handleFromChange(event) {
    let destPoints = this.endpoints.filter((item, idx) => item.startPoint === event.target.value)
        .map((item) => item.destPoint);
        console.log(destPoints)
    this.destinationData = [...new Set(destPoints)];
  }

}
