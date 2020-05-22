import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { User } from 'src/app/models/user'
import { UserService } from 'src/app/services/user.service'
import { UserHeroService } from 'src/app/services/user-hero.service'
import { Hero } from 'src/app/models/hero'

/**
 * Component that bring public user profile
 */
@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})

export class PublicProfileComponent implements OnInit {
  /**
   * variable to save de id from params
   */
  public idParams: number = 0
  /**
   * variable to save user
   */
  public user: User
  /**
   * variable to save array of favorite heroes
   */
  public heroesFav: Hero[]
  /**
   * variable to store user identity
   */
  public identity
  /**
   * 
   */
  public followActive: any = ''
  /**
   * variable to store info about user followeb
   */
  public FollowedUsers: User[] = []

  /**
   * variable to store info about followers
   */
  public FollowersUsers: User[] = []

  /**
   * Constructor in which we inject user service, user Hero service, and service to controll de router params
   */
  constructor (
    private _UserHero: UserHeroService,
    private _UserService: UserService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.user = new User(0, '', '', '', '', '', new Date(0), '', false)
  }

  /**
   * Start when de component init
   */
  ngOnInit () {
    this._activatedRoute.params.subscribe(params => {
      this.idParams = params['user']
      this.getUsuInfo()
      this.favorites()
      this.getIdentity()
      this.checkFollow()
      this.getFollowersUsers()
      this.getFollowedUsers()
    })
  }

  /**
   * Get user identity
   */
  getIdentity () {
    this.identity = this._UserService.getIdentity()
  }

  /**
   * Get user info
   */
  getUsuInfo () {
    this._UserService.getUser(this.idParams).subscribe(
      res => {
        this.user = res
        console.log(res)
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Get user favorites heroes
   */
  favorites () {
    this._UserHero.allHerosFav(this.idParams).subscribe(res => {
      this.heroesFav = res
      console.log(this.heroesFav)
    }),
      error => {
        console.log(error)
      }
  }

  /**
   * Get user followed by the user
   */
  followUser () {
    var ids = { idUsu: this.identity.id, idUsuFollow: this.idParams }
    this._UserService.followUser(ids).subscribe(
      res => {
        console.log(res)
        this.checkFollow()
        this.getFollowersUsers()
      },
      err => {
        console.log(err)
      }
    )
  }

  /**
   * Unfollow the user
   */
  unFollowUser () {
    this._UserService.unFollowUser(this.identity.id, this.idParams).subscribe(
      res => {
        console.log(res)
        this.checkFollow()
        this.getFollowersUsers()
      },
      err => {
        console.log(err)
      }
    )
  }

  /**
   * Check if you follow the user
   */
  checkFollow () {
    this._UserService.checkFollow(this.identity.id, this.idParams).subscribe(
      res => {
        console.log(res)
        this.followActive = res
      },
      err => {
        console.log(err)
      }
    )
  }

  /**
   * Get user followed by the user
   */
  getFollowedUsers () {
    this._UserService.getFollowUsers(this.idParams).subscribe(
      res => {
        console.log(res)
        this.FollowedUsers = res
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Get user followers
   */
  getFollowersUsers () {
    this._UserService.getFollowersUsers(this.idParams).subscribe(
      res => {
        console.log(res)
        this.FollowersUsers = res
      },
      error => {
        console.log(error)
      }
    )
  }
}
