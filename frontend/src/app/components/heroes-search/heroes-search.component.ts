import { Component, OnInit } from '@angular/core'
import { Hero } from '../../models/hero'
import { HeroService } from 'src/app/services/hero.service'
import { ActivatedRoute } from '@angular/router'
import { UserService } from 'src/app/services/user.service'
import { User } from 'src/app/models/user'

/**
 * Component for heroes search
 */
@Component({
  selector: 'app-heroes-search',
  templateUrl: './heroes-search.component.html',
  styleUrls: ['./heroes-search.component.scss']
})

export class HeroesSearchComponent implements OnInit {
  /**
   * variable to store the hero from the search
   */
  public hero: Hero[]
  /**
   * variable to store the user from the search
   */
  public user: User[]
  /**
   * variable to store data from search
   */
  public data: string = ''
  /**
   * variable to store term from search
   */
  public term: string = ''

  /**
   * Constructor in which we inject hero service , formBuilder and rouser service
   */
  constructor (
    private _heroService: HeroService,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService
  ) {}

  /**
   * Start when de component init
   */
  ngOnInit () {
    this._activatedRoute.params.subscribe(params => {
      this.data = params['data']
      this.term = params['term']
      this.getInfo()
    })
  }

  /**
   * Function to get results of the search
   */
  getInfo () {
    if (this.data === 'DC') {
      this._heroService.allDCHeroes().subscribe(
        res => {
          this.user = null
          this.hero = res
          console.log(JSON.stringify(this.hero, null, 2))
        },
        error => {
          console.log(error)
        }
      )
    } else if (this.data === 'Marvel') {
      this._heroService.allMarvelHeroes().subscribe(
        res => {
          console.log('marvel')
          this.user = null
          this.hero = res
          console.log(JSON.stringify(this.hero, null, 2))
        },
        error => {
          console.log(error)
        }
      )
    } else if (this.data === 'User') {
      this._userService.getUserByName(this.term).subscribe(
        res => {
          console.log('user')
          this.hero = null
          console.log('buscando un usuario')
          console.log(res)
          this.user = res
          console.log(this.user)
        },
        error => {
          console.log(error)
        }
      )
    } else {
      this._heroService.getHeroByName(this.term).subscribe(
        res => {
          this.user = null
          this.hero = res
          console.log(res)
          console.log(JSON.stringify(this.hero, null, 2))
        },
        error => {
          console.log(error)
        }
      )
    }
  }
}
