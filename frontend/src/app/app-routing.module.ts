import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { FightComponent } from './components/fight/fight.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HeroesDetailComponent } from './components/heroes-detail/heroes-detail.component';
import { HeroesSearchComponent } from './components/heroes-search/heroes-search.component';
import { MyHeroesComponent } from './components/my-heroes/my-heroes.component';
import { AuthGuard } from './services/auth.guard';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';

// // canActivate:[AuthGuardService]
const routes: Routes = [

  {
    path: 'home', component: HomeComponent
  }, {
    path: 'login', component: LoginComponent
  }, {
    path: 'register', component: RegisterComponent
  }, {
    path: 'fight', component: FightComponent, canActivate:[AuthGuard]
  }, {
    path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]
  }, {
    path: 'heroesDetail/:id', component: HeroesDetailComponent
  }, {
    path: 'heroesSearch/:data/:term', component: HeroesSearchComponent
  }, {
    path: 'myHeroes', component: MyHeroesComponent, canActivate:[AuthGuard]
  },{
    path: 'publicProfile/:user', component: PublicProfileComponent, canActivate:[AuthGuard]
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
