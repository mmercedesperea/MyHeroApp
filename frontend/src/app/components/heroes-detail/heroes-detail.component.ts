import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from '../../models/hero';
import { ActivatedRoute } from '@angular/router';
import { UserHeroService } from 'src/app/services/user-hero.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-heroes-detail',
  templateUrl: './heroes-detail.component.html',
  styleUrls: ['./heroes-detail.component.css']
})
export class HeroesDetailComponent implements OnInit {
  public hero: Hero;
  public identity;

  constructor(private _heroService: HeroService,
    private _UserHeroService: UserHeroService,
    private _UserService: UserService,
    private _activatedRoute: ActivatedRoute) {
    this.hero = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', null)
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      // const id: 0 = params["id"];
      const id = params["id"];
      this.getHero(id)
    });
    this.identity = this._UserService.getIdentity()
    this.following();
    this.favorites();
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


  followHero() {
    var ids = { idUsu: this.identity.id, idHero: this.hero.idHero }
    this._UserHeroService.followHero(ids).subscribe(res => {
      // this.hero = res;
      // console.log(res.idHero)
      console.log(res);
      // console.log(this.hero);
    },
      error => {
        console.log(error)
      }

    )
  }

  unfollowHero() {
    var ids = { idUsu: this.identity.id, idHero: this.hero.idHero }
    this._UserHeroService.unfollowHero(ids).subscribe(res => {
      // this.hero = res;
      // console.log(res.idHero)
      console.log(res);
      // console.log(this.hero);
    },
      error => {
        console.log(error)
      }

    )
  }

  favorite() {
    var ids = { idUsu: this.identity.id, idHero: this.hero.idHero }
    this._UserHeroService.favorite(ids).subscribe(res => {
      // this.hero = res;
      // console.log(res.idHero)
      console.log(res);
      // console.log(this.hero);
    },
      error => {
        console.log(error)
      }

    )
  }

  unfavorite() {
    var ids = { idUsu: this.identity.id, idHero: this.hero.idHero }
    this._UserHeroService.unfavorite(ids).subscribe(res => {
      // this.hero = res;
      // console.log(res.idHero)
      console.log(res);
      // console.log(this.hero);
    },
      error => {
        console.log(error)
      }

    )
  }


  following() {
    if(this.identity){
      this._UserHeroService.allHerosFoll(this.identity.id).subscribe(res => {
    
     
        if(res){
          res.forEach(heroeeee => {
            if (this.hero.idHero === heroeeee.idHero) {
              console.log("following")
            }
    
          })
        }
        
        // console.log(this.heroesFol)
      }), error => {
        console.log(error)
      }
    }
   
  }

  favorites() {
    if(this.identity){
    this._UserHeroService.allHerosFav(this.identity.id).subscribe(res => {
     
      if(res){
        res.forEach(heroeeee => {
          if (this.hero.idHero === heroeeee.idHero) {
            console.log("favorite")
          }
  
        })
      }
      
     
      // console.log(this.heroesFav)
    }), error => {
      console.log(error)
    }
  }
}

}
