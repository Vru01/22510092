import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {BehaviorSubject} from 'rxjs'
import { Router } from "@angular/router";

@Injectable()
export class TrainService {
    private BASE_URL = "http://localhost:3200";


    private selectedTrainData = new BehaviorSubject({}); 
    selectedTrainInfo = this.selectedTrainData.asObservable();
    
    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    getEndPoints() {
        return this.http.get<any>(this.BASE_URL + "/train/getEndPoints");
    }

    setTrainInfo(data) {
        this.selectedTrainData.next(data);
    }

    getTrains(data) {
        return this.http.post<any>(this.BASE_URL + "/train/getTrains", data);
    }

}
