import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FightComponent } from './components/fight/fight.component';
import { HeroesDetailComponent } from './components/heroes-detail/heroes-detail.component';
import { HeroesSearchComponent } from './components/heroes-search/heroes-search.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ModalsComponent } from './components/modals/modals.component';
import { MyHeroesComponent } from './components/my-heroes/my-heroes.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ComentHeroDialogComponent } from './components/modals/coment-hero-dialog/coment-hero-dialog.component';
import { DeleteUserDialogComponent } from './components/modals/delete-user-dialog/delete-user-dialog.component';
import { ChangePassDialogComponent } from './components/modals/change-pass-dialog/change-pass-dialog.component';
import { NavbarComponent } from './shared/navbar/navbar.component';


//new imports
import { HttpClientModule } from "@angular/common/http";

// angular material module
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatNativeDateModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material';
import {NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeamDialogComponent } from './components/modals/team-dialog/team-dialog.component';
import { TeamComponent } from './components/team/team.component';




@NgModule({
  declarations: [
    AppComponent,
    FightComponent,
    HeroesDetailComponent,
    HeroesSearchComponent,
    HomeComponent,
    LoginComponent,
    ModalsComponent,
    MyHeroesComponent,
    ProfileComponent,
    PublicProfileComponent,
    RegisterComponent,
    ComentHeroDialogComponent,
    DeleteUserDialogComponent,
    ChangePassDialogComponent,
    NavbarComponent,
    TeamDialogComponent,
    TeamComponent
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
    MatDialogModule,
    NgbRatingModule
  ],
  entryComponents:[TeamDialogComponent,ChangePassDialogComponent,DeleteUserDialogComponent, ComentHeroDialogComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
