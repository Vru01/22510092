import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable()
export class UserService {

    private BASE_URL = "http://localhost:3200";

    constructor(
        private http:HttpClient,
        private router: Router
    ){}

    getUserDataFromLocal() {
      let userInfo = localStorage.getItem('user-info');
      if(userInfo) {
        try {
          userInfo = JSON.parse(atob(userInfo));
        } catch(e) {
          userInfo = null;
          console.log(e);
        }
        return userInfo;
      } else {
        return null;
      }
    }

    setUserData(data) {
      localStorage.setItem('user-info', btoa(JSON.stringify(data)));
    }

    login(data) {
      return this.http.post<any>(this.BASE_URL + "/user/login", data);
    }

    register(data) {
      return this.http.post<any>(this.BASE_URL + "/user/createUser", data);
    }

    updateUser(data) {
      return this.http.post<any>(this.BASE_URL + "/user/updateUser", data);
    }

}