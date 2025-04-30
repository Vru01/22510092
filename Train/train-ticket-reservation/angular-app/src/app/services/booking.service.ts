import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class BookingService {

    journeyInfo = new BehaviorSubject('');
    cast = this.journeyInfo.asObservable();
    private BASE_URL = "http://localhost:3200"

    constructor(
        private http: HttpClient,
        private userService: UserService,
        private router: Router
    ) { }

    bookTrain(data) {;
        return this.http.post<any>(this.BASE_URL + "/train/bookTrain", data);
    }

    cancelTrain(data) {
        return this.http.post<any>(this.BASE_URL + "/train/cancelTrain", data);
    }

    getMyBookings(data) {
        return this.http.post<any>(this.BASE_URL + "/train/getBookingDetails", data);
    }

}



