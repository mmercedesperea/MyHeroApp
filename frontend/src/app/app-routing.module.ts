import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

/**
 * Components
 */
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { HomeComponent } from './components/home/home.component'
import { FightComponent } from './components/fight/fight.component'
import { ProfileComponent } from './components/profile/profile.component'
import { HeroesDetailComponent } from './components/heroes-detail/heroes-detail.component'
import { HeroesSearchComponent } from './components/heroes-search/heroes-search.component'
import { MyHeroesComponent } from './components/my-heroes/my-heroes.component'
import { AuthGuard } from './services/auth.guard'
import { PublicProfileComponent } from './components/public-profile/public-profile.component'
import { FightTeamComponent } from './components/fight/fight-team/fight-team.component'
import { FightHeroComponent } from './components/fight/fight-hero/fight-hero.component'
import { AboutUsComponent } from './components/about-us/about-us.component'

/**
 * App Routes
 */
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'fight',
    component: FightComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'fightTeam',
        component: FightTeamComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'fightHero',
        component: FightHeroComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'heroesDetail/:id',
    component: HeroesDetailComponent
  },
  {
    path: 'heroesSearch/:data/:term',
    component: HeroesSearchComponent
  },
  {
    path: 'myHeroes',
    component: MyHeroesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'publicProfile/:user',
    component: PublicProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'aboutUs',
    component: AboutUsComponent
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
