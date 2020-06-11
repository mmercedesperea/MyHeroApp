import { Component, OnInit } from '@angular/core'
import { HeroService } from 'src/app/services/hero.service'
import { Hero } from '../../models/hero'
import { ActivatedRoute } from '@angular/router'
import { UserHeroService } from 'src/app/services/user-hero.service'
import { UserService } from 'src/app/services/user.service'
import { MatDialog } from '@angular/material/dialog'
import { ComentHeroDialogComponent } from '../modals/coment-hero-dialog/coment-hero-dialog.component'
import { UserHero } from 'src/app/models/userHero'

/**
 * Component for hero details
 */
@Component({
  selector: 'app-heroes-detail',
  templateUrl: './heroes-detail.component.html',
  styleUrls: ['./heroes-detail.component.scss']
})

export class HeroesDetailComponent implements OnInit {
  /**
   * variable to store hero rating
   */
  rate: number = 0;
  /**
   * variable to page pagination
   */
  page = 1;
  /**
   * variable for pagination size
   */
  pageSize = 4;
  /**
   * variable to store hero info
   */
  public hero: Hero
  /**
   * variable to store the relationships in user hero
   */
  public heroUsu: UserHero
  /**
   * variable to store user identity
   */
  public identity
  /**
   * variable to check if hero is favorited by the user
   */
  public favoriteHero: boolean = false
  /**
   * variable to check if the hero is followed by the user
   */
  public followtHero: boolean = false
  /**
   * variable for star ranking
   */
  public hovered: any
  /**
   * variable for star ranking
   */
  public readonly: any
  /**
   * variable to store star ranking points
   */
  public score: number = 0
  /**
   * variable to store the user comment about the hero
   */
  public comment: string = ''
  /**
   * variable to store id from param
   */
  public idParams: number = 0
  /**
   * variable to store all comments about the hero
   */
  public allComments: [] = []

  /**
   * Constructor in which we inject hero service, formBuilder and router service
   */
  constructor(
    private _heroService: HeroService,
    private _UserHeroService: UserHeroService,
    private _UserService: UserService,
    public dialog: MatDialog,
    private _activatedRoute: ActivatedRoute
  ) {
    this.hero = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', null, 0)
    this.heroUsu = new UserHero(0, 0, 0, '', false, false)
  }

  /**
   * Start when the component inits
   */
  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.idParams = params['id']
      this.getHero(this.idParams)
      this.getIdentity()
      this.getHeroComment()
    })
  }

  /**
   * Get user identity
   */
  getIdentity() {
    this.identity = this._UserService.getIdentity()
    if (this.identity) {
      this.getHeroUsu()
    }
  }

  /**
   * Get hero info
   *  @param {number} id
   *
   */
  getHero(id) {
    window.scrollTo(0, 0);
    this._heroService.getHeroById(id).subscribe(
      res => {
        this.hero = res
      },
      error => {
        console.log(error)
      }
    )
    this._UserHeroService.getHeroRateScore(id).subscribe(
      res => {
        this.rate = res[0].rate;
      }, err => {
        console.log(err)
      }
    )
  }

  /**
   * Follow hero
   */
  followHero() {
    var ids = { idUsu: this.identity.id, idHero: this.hero.idHero }
    this._UserHeroService.followHero(ids).subscribe(
      res => {
        this.getHeroUsu()
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Unfollow hero
   */
  unfollowHero() {
    var ids = { idUsu: this.identity.id, idHero: this.hero.idHero }
    this._UserHeroService.unfollowHero(ids).subscribe(
      res => {
        this.getHeroUsu()
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Add to favorite
   */
  favorite() {
    var ids = { idUsu: this.identity.id, idHero: this.hero.idHero }
    this._UserHeroService.favorite(ids).subscribe(
      res => {
        this.getHeroUsu()
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Unfavorite hero
   */
  unfavorite() {
    var ids = { idUsu: this.identity.id, idHero: this.hero.idHero }
    this._UserHeroService.unfavorite(ids).subscribe(
      res => {
        this.getHeroUsu()
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * vote a hero
   *  @param {number} hovered
   */
  voteHero(hovered) {
    var ids = {
      score: hovered,
      idUsu: this.identity.id,
      idHero: this.hero.idHero
    }
    this._UserHeroService.voteHero(ids).subscribe(
      res => {
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Check if the user follow the hero
   */
  getHeroUsu() {
    this._UserHeroService.getHeroUsu(this.identity.id, this.idParams).subscribe(
      res => {
        if (res) {
          this.heroUsu = res
          if (this.heroUsu.follow['data'][0] === 1) {
            this.followtHero = true
          } else {
            this.followtHero = false
          }
          if (this.heroUsu.favorite['data'][0] === 1) {
            this.favoriteHero = true
          } else {
            this.favoriteHero = false
          }
        }
        // console.log(this.hero);
      },
      error => {
        console.log(error)
      }
    )
  }
  /**
   * Get Hero comments
   */
  getHeroComment() {
    this._UserHeroService.getHeroComments(this.idParams).subscribe(
      res => {
        this.allComments = res
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Open modal to comment hero
   * @param {string} status
   */
  commentHeroDialog(status): void {
    const dialogRef = this.dialog.open(ComentHeroDialogComponent, {
      data: {
        idUsu: this.identity.id,
        idHero: this.idParams,
        status: status,
        comment: this.comment
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      this.getHeroUsu()
      this.getHeroComment()
    })
  }
}
