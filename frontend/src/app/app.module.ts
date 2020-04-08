import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//new imports
import { HttpClientModule} from "@angular/common/http";

// angular material module
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule, MatNativeDateModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule, 
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
