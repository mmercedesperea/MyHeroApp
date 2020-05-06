import { Component, OnInit } from '@angular/core';
import { Hero } from '../../models/hero';
import { HeroService } from 'src/app/services/hero.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-heroes-search',
  templateUrl: './heroes-search.component.html',
  styleUrls: ['./heroes-search.component.scss']
})
export class HeroesSearchComponent implements OnInit {
  public hero: Hero[];
  public user: User[];
  public data: string = "";
  public term: string = "";

  constructor(
    private _heroService: HeroService,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService
  ) {
  }

  ngOnInit() {

    this._activatedRoute.params.subscribe(params => {
      // const id: 0 = params["id"];
      this.data = params["data"];
      this.term = params["term"];
      this.getInfo();
    });
  }

  getInfo() {
    if (this.data === 'DC') {
      this._heroService.allDCHeroes().subscribe(res => {
        this.user = null;
        this.hero = res;
        console.log(JSON.stringify(this.hero, null, 2));
      },
        error => {
          console.log(error)
        }
      )
    } else if (this.data === 'Marvel') {
      this._heroService.allMarvelHeroes().subscribe(res => {
        console.log('marvel');
        this.user = null;
        this.hero = res;
        console.log(JSON.stringify(this.hero, null, 2));
        // console.log(this.hero);
      },
        error => {
          console.log(error)
        }
      )
    } else if (this.data === 'User') {
      this._userService.getUserByName(this.term).subscribe(res => {
        // this.hero = res;
        console.log('user');
        this.hero = null;
        console.log('buscando un usuario')
        // console.log(res.idHero)
        console.log(res)
        this.user = res;
        console.log(this.user)
        // console.log(JSON.stringify(this.user, null, 2));
        // console.log(this.hero);
      },
        error => {
          console.log(error)
        }
      )
    } else {
      this._heroService.getHeroByName(this.term).subscribe(res => {
        // this.hero = res;
        this.user = null;
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

}
