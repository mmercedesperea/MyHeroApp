import { Component, OnInit } from '@angular/core';
import { Hero } from '../../models/hero';
import { HeroService } from 'src/app/services/hero.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroes-search',
  templateUrl: './heroes-search.component.html',
  styleUrls: ['./heroes-search.component.css']
})
export class HerosSearchComponent implements OnInit {
  //array de heroes
  public hero: Hero = {
    idHero: 0,
    heroName: "",
    image: "",
    intelligence: 0,
    strength: 0,
    speed: 0,
    durability: 0,
    power: 0,
    combat: 0,
    fullName: "",
    placeOfBirth: "",
    publisher: "",
    alignment: "",
    firstApperance: "",
    gender: "",
    race: "",
    height: "",
    weight: "",
    work: "",
    createDate: "",



  }


  constructor(
    private _heroService: HeroService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this._activatedRoute.params.subscribe(params => {
      const id: 0 = params["id"];
      this._heroService.getHeroById(id).subscribe((hero: Hero) => {
        this.hero = hero;
        console.log(this.hero)
      })


    });
  }

}
