import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from '../../models/hero';
import { ActivatedRoute } from '@angular/router';
import { UserHeroService } from 'src/app/services/user-hero.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from "@angular/material/dialog";
import { ComentHeroDialogComponent } from '../modals/coment-hero-dialog/coment-hero-dialog.component';
import { UserHero } from 'src/app/models/userHero';


@Component({
  selector: 'app-heroes-detail',
  templateUrl: './heroes-detail.component.html',
  styleUrls: ['./heroes-detail.component.scss']
})
export class HeroesDetailComponent implements OnInit {
  public hero: Hero;
  public heroUsu: UserHero;
  public identity;
  public favoriteHero: boolean = false;
  public followtHero: boolean = false;
  public hovered: any;
  public readonly: any;
  public score: number = 0;
  public comment: string = "";
  public idParams: number = 0;
  public allComments: [] = [];

  constructor(private _heroService: HeroService,
    private _UserHeroService: UserHeroService,
    private _UserService: UserService,
    public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute) {
    this.hero = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', null)
    this.heroUsu = new UserHero(0, 0, 0, '', 0, 0);
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      // const id: 0 = params["id"];
      this.idParams = params["id"];
      this.getHero(this.idParams);
      this.getIdentity();
      this.getHeroComment();
    });

  }

  getIdentity() {
    this.identity = this._UserService.getIdentity();
    if (this.identity) {
      this.getHeroUsu();
    }
  }

  getHero(id) {
    this._heroService.getHeroById(id).subscribe(res => {
      this.hero = res;
      console.log(JSON.stringify(this.hero, null, 2));
    },
      error => {
        console.log(error)
      }

    )
  }


  followHero() {
    var ids = { idUsu: this.identity.id, idHero: this.hero.idHero }
    this._UserHeroService.followHero(ids).subscribe(res => {
      this.getHeroUsu();
      console.log(res);
    },
      error => {
        console.log(error)
      }

    )
  }

  unfollowHero() {
    var ids = { idUsu: this.identity.id, idHero: this.hero.idHero }
    this._UserHeroService.unfollowHero(ids).subscribe(res => {
      console.log(res);
      this.getHeroUsu();
    },
      error => {
        console.log(error)
      }

    )
  }

  favorite() {
    var ids = { idUsu: this.identity.id, idHero: this.hero.idHero }
    this._UserHeroService.favorite(ids).subscribe(res => {
      this.getHeroUsu();
      console.log(res);
    },
      error => {
        console.log(error)
      }

    )
  }

  unfavorite() {
    var ids = { idUsu: this.identity.id, idHero: this.hero.idHero }
    this._UserHeroService.unfavorite(ids).subscribe(res => {
      this.getHeroUsu();
      console.log(res);
    },
      error => {
        console.log(error)
      }

    )
  }


  // following() {
  //   this._UserHeroService.allHerosFoll(this.identity.id).subscribe(res => {
  //     if (res) {
  //       res.forEach(heroeeee => {
  //         if (this.hero.idHero === heroeeee.idHero) {
  //           console.log("following")
  //           this.followtHero = true;
  //         }
  //       })
  //     }
  //     console.log(this.heroesFol)
  //   }), error => {
  //     console.log(error)
  //   }
  // }

  // favorites() {
  //   this._UserHeroService.allHerosFav(this.identity.id).subscribe(res => {
  //     if (res) {
  //       res.forEach(heroeeee => {
  //         if (this.hero.idHero === heroeeee.idHero) {
  //           console.log("favorite")
  //           this.favoriteHero = true;
  //           this.followtHero = true;
  //         }

  //       })
  //     }

  //   }), error => {
  //     console.log(error)
  //   }

  // }

  // getVoteHero() {
  //   this._UserHeroService.getVoteHero(this.identity.id, this.idParams).subscribe(res => {
  //     if (res) {
  //       this.score = res.score;
  //     }
  //     console.log(this.hero);
  //   },
  //     error => {
  //       console.log(error)
  //     }

  //   )
  // }

  voteHero(hovered) {
    var ids = { score: hovered, idUsu: this.identity.id, idHero: this.hero.idHero }
    this._UserHeroService.voteHero(ids).subscribe(res => {
      console.log(res);
    },
      error => {
        console.log(error)
      }
    )
  }


  getHeroUsu() {
    this._UserHeroService.getHeroUsu(this.identity.id, this.idParams).subscribe(res => {
      if (res) {
        console.log(res)
        this.heroUsu = res;
        if (this.heroUsu.follow['data'][0] === 1) {
          this.followtHero = true;
          console.log(this.followHero)
        } else {
          this.followtHero = false;
        }
        if (this.heroUsu.favorite['data'][0] === 1) {
          this.favoriteHero = true;
          console.log(this.favoriteHero)

        } else {
          this.favoriteHero = false;
        }

      }
      // console.log(this.hero);
    },
      error => {
        console.log(error)
      }

    )
  }
  getHeroComment() {
    this._UserHeroService.getHeroComments(this.idParams).subscribe(res => {
      this.allComments = res;
      console.log(this.allComments)
    },
      error => {
        console.log(error)
      })
  }

  commentHeroDialog(status): void {
    const dialogRef = this.dialog.open(ComentHeroDialogComponent, {
      // Le pasamos los datos que queremos
      data: {
        idUsu: this.identity.id,
        idHero: this.idParams,
        status: status,
        comment: this.comment
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.getHeroUsu();
      this.getHeroComment();
    });
  }


}

