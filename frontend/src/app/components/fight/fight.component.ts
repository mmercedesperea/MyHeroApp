import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.scss']
})
export class FightComponent implements OnInit {
  public hero: Hero;
  public sessonHero: Hero;
  public sessonHero2: Hero;

  constructor(private _hero: HeroService, ) {
    this.hero = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '','', null,0)
    this.sessonHero = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '','', '','', null,0)
    this.sessonHero2 = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '','', '','', null,0)
  }

  ngOnInit() {
    this.clearHerosSession();
  }

  clearHerosSession() {
    //limpiamos el sessionStorage
    // sessionStorage.setItem('Hero', JSON.stringify(this.sessonHero));
    // sessionStorage.setItem('Hero2', JSON.stringify(this.sessonHero2));
    // // this.getHeroWinner();
    sessionStorage.clear();
  }

  getHeroWinner() {
    this.sessonHero = JSON.parse(sessionStorage.getItem('Hero'));
    this.sessonHero2 = JSON.parse(sessionStorage.getItem('Hero2'));
    console.log(this.sessonHero)
    console.log(this.sessonHero2)
    this._hero.getWinner(this.sessonHero.idHero, this.sessonHero2.idHero).subscribe(res => {
      this.hero = res;
      console.log(res)
    }, error => {
      console.log(error);
    })
  }
}


