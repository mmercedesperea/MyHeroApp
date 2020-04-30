import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from '../../models/hero';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroes-detail',
  templateUrl: './heroes-detail.component.html',
  styleUrls: ['./heroes-detail.component.css']
})
export class HeroesDetailComponent implements OnInit {
  public hero: Hero;

  constructor(private _heroService: HeroService,
    private _activatedRoute: ActivatedRoute) {
    this.hero = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', null)
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      // const id: 0 = params["id"];
      const id = params["id"];
      this.getHero(id)
    });
  }

  getHero(id) {
    this._heroService.getHeroById(id).subscribe(res => {
      // this.hero = res;
      // console.log(res.idHero)
      this.hero = res;
      console.log(JSON.stringify(this.hero, null, 2));
      // console.log(this.hero);
    },
      error => {
        console.log(error)
      }

    )
  }

}
