import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main.component';
import { HeaderComponent } from './pages/header/header.component';
import { TrainSearchComponent } from './pages/train-search/train-search.component';
import { TrainConfirmComponent } from './pages/train-confirm/train-confirm.component';
import { TrainListComponent } from './pages/trains-list/trains-list.component';
import { TrainService } from './services/train.service';
import { ProfileComponent } from './pages/user-profile/user-profile.component';
import { BookingService } from './services/booking.service';   
import { UserService } from './services/user.service';
import { LoginComponent } from './pages/user/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';;
import { RegisterComponent } from './pages/user/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        HeaderComponent,
        TrainConfirmComponent,
        TrainListComponent,
        TrainSearchComponent,
        ProfileComponent,
        LoginComponent ,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ModalModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatTabsModule
    ],
    providers: [
        TrainService,
        BookingService,
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };