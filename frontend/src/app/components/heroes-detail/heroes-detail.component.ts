import { Component, OnInit } from '@angular/core'
import { HeroService } from 'src/app/services/hero.service'
import { Hero } from '../../models/hero'
import { ActivatedRoute } from '@angular/router'
import { UserHeroService } from 'src/app/services/user-hero.service'
import { UserService } from 'src/app/services/user.service'
import { MatDialog } from '@angular/material/dialog'
import { ComentHeroDialogComponent } from '../modals/coment-hero-dialog/coment-hero-dialog.component'
import { UserHero } from 'src/app/models/userHero'

@Component({
  selector: 'app-heroes-detail',
  templateUrl: './heroes-detail.component.html',
  styleUrls: ['./heroes-detail.component.scss']
})

/**
 * Component for hero details
 */
export class HeroesDetailComponent implements OnInit {
  public hero: Hero
  public heroUsu: UserHero
  public identity
  public favoriteHero: boolean = false
  public followtHero: boolean = false
  public hovered: any
  public readonly: any
  public score: number = 0
  public comment: string = ''
  public idParams: number = 0
  public allComments: [] = []

  /**
   * Constructor in which we inject hero service , formBuilder and rouser service
   */
  constructor (
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
   * Start when de component init
   */
  ngOnInit () {
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
  getIdentity () {
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
  getHero (id) {
    this._heroService.getHeroById(id).subscribe(
      res => {
        this.hero = res
        console.log(JSON.stringify(this.hero, null, 2))
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Follow hero
   */
  followHero () {
    var ids = { idUsu: this.identity.id, idHero: this.hero.idHero }
    this._UserHeroService.followHero(ids).subscribe(
      res => {
        this.getHeroUsu()
        console.log(res)
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Unfollow hero
   */
  unfollowHero () {
    var ids = { idUsu: this.identity.id, idHero: this.hero.idHero }
    this._UserHeroService.unfollowHero(ids).subscribe(
      res => {
        console.log(res)
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
  favorite () {
    var ids = { idUsu: this.identity.id, idHero: this.hero.idHero }
    this._UserHeroService.favorite(ids).subscribe(
      res => {
        this.getHeroUsu()
        console.log(res)
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Unfavorite hero
   */
  unfavorite () {
    var ids = { idUsu: this.identity.id, idHero: this.hero.idHero }
    this._UserHeroService.unfavorite(ids).subscribe(
      res => {
        this.getHeroUsu()
        console.log(res)
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
  voteHero (hovered) {
    var ids = {
      score: hovered,
      idUsu: this.identity.id,
      idHero: this.hero.idHero
    }
    this._UserHeroService.voteHero(ids).subscribe(
      res => {
        console.log(res)
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Check if the user follow the hero
   */
  getHeroUsu () {
    this._UserHeroService.getHeroUsu(this.identity.id, this.idParams).subscribe(
      res => {
        if (res) {
          console.log(res)
          this.heroUsu = res
          if (this.heroUsu.follow['data'][0] === 1) {
            this.followtHero = true
            console.log(this.followHero)
          } else {
            this.followtHero = false
          }
          if (this.heroUsu.favorite['data'][0] === 1) {
            this.favoriteHero = true
            console.log(this.favoriteHero)
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
  getHeroComment () {
    this._UserHeroService.getHeroComments(this.idParams).subscribe(
      res => {
        this.allComments = res
        console.log(this.allComments)
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Open modal for comment hero
   * @param {string} status
   */
  commentHeroDialog (status): void {
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
