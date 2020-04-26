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
  public hero: Hero[];
  //array de heroes


  constructor(
    private _heroService: HeroService,
    private _activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {

    this._activatedRoute.params.subscribe(params => {
      // const id: 0 = params["id"];
      const data = params["data"];

      if (data === 'DC') {

        this._heroService.allDCHeroes().subscribe(res => {
          // this.hero = res;
          // console.log(res.idHero)
          this.hero = res;
          console.log(JSON.stringify(this.hero, null, 2));
          // console.log(this.hero);
        },
          error => {
            // console.log(res)
            console.log(error)
          }

        )
      

      } else if (data === 'Marvel') {
        this._heroService.allMarvelHeroes().subscribe(res => {
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

      } else {


        console.log(data)

        this._heroService.getHeroByName(data).subscribe(res => {
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
    });

  }

}
