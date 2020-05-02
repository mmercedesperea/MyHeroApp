import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChangePassDialogComponent } from './components/modals/change-pass-dialog/change-pass-dialog.component'
import { DeleteUserDialogComponent } from './components/modals/delete-user-dialog/delete-user-dialog.component';

//new imports
import { HttpClientModule } from "@angular/common/http";

// angular material module
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { FightComponent } from './components/fight/fight.component';
import { MyHeroesComponent } from './components/my-heroes/my-heroes.component';
import { HerosSearchComponent } from './components/heroes-search/heroes-search.component';
import { HeroesDetailComponent } from './components/heroes-detail/heroes-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    FightComponent,
    MyHeroesComponent,
    HerosSearchComponent,
    HeroesDetailComponent,
    ProfileComponent,
    ChangePassDialogComponent,
    DeleteUserDialogComponent,
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
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  entryComponents:[ChangePassDialogComponent,DeleteUserDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
