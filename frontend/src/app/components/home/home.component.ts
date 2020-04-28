import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';
import { UserHeroService } from 'src/app/services/user-hero.service';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team';
import { Hero } from 'src/app/models/hero';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public bestM: any = "";
  public bestD: any = "";
  public mostF: [];
  public bestT: Team;
  public bestTeamHeroes: Hero[] = [];
  public mostStatsHero: Hero[] = [];
  public newHeros: Hero[] = [];
  public stats: string[] = ['mostIntelligence', 'mostStrength', 'mostSpeed', 'mostDurability', 'mostPower', 'mostCombat'];

  constructor(private _hero: HeroService, private _UserHero: UserHeroService, private _Team: TeamService) {
    this.bestT = new Team(0, 0, '', '', '', '', '', '')
    
  }

  ngOnInit() {
    this.bestMarvel();
    this.bestDc();
    this.mostFollwed();
    this.bestTeam();
    this.herosMost();
    this.newHeroesAdd();
  }

  bestMarvel() {
    this._UserHero.bestMarverHero().subscribe(res => {
      this.bestM = res[0];
      console.log(this.bestM);
    }, error => {
      console.log(error)
    })
  }

  bestDc() {
    this._UserHero.bestDCHero().subscribe(res => {
      this.bestD = res[0];
      console.log(this.bestD);
    }, error => {
      console.log(error)
    })
  }

  mostFollwed() {
    this._UserHero.mostFollowHeros().subscribe(res => {
      this.mostF = res;
      console.log(this.mostF);
    }, error => {
      console.log(error)
    })
  }

  bestTeam() {
    this._Team.bestTeam().subscribe(res => {
      this.bestT = res[0];
      for (var i = 1; i < 6; i++) {
        this._hero.getHeroById(this.bestT[`member_${i}`]).subscribe(res => {
          console.log(res)
          this.bestTeamHeroes.push(res)
        })
      }
    }, error => {
      console.log(error)
    })
  }

  herosMost() {
    this.stats.forEach(stats => {
      this._hero[stats]().subscribe(res => {
        this.mostStatsHero.push(res);
        console.log(res);
      }, error => {
        console.log(error)
      })
    });
  }

  newHeroesAdd() {
    this._hero.newHeros().subscribe(res => {
      this.newHeros = res;
      console.log(this.newHeros)
    }, error => {
      console.log(error)
    })
  }


}
