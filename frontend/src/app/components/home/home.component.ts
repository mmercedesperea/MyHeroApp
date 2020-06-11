import { Component, OnInit } from '@angular/core'
import { HeroService } from 'src/app/services/hero.service'
import { UserHeroService } from 'src/app/services/user-hero.service'
import { TeamService } from 'src/app/services/team.service'
import { Team } from 'src/app/models/team'
import { Hero } from 'src/app/models/hero'

/**
 * Component for home page
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  /**
   * variable to store best Marvel hero
   */
  public bestM: any = ''
  /**
   * variable to store best DC hero
   */
  public bestD: any = ''
  /**
   * variable to store best other hero
   */
  public bestOther: any = ''
  /**
   * variable to store most followed heroes
   */
  public mostF: Hero[]
  /**
   * variable to store best team
   */
  public bestT: any;
  /** variable to store best team heroes
   *
   */
  public bestTeamHeroes: Hero[] = []
  /**
   * variable to store heroes with best stats
   */
  public mostStatsHero: Hero[] = []
  /**
   * variable to store new heros in bd
   */
  public newHeros: Hero[] = []

  /**
   * variable to store heroes with more votes
   */
  public moststarts: Hero[] = []

  /**
   * variable to store hero stats
   */
  public stats: string[] = [
    'mostIntelligence',
    'mostStrength',
    'mostSpeed',
    'mostDurability',
    'mostPower',
    'mostCombat'
  ]

  /**
   * variable to save the id from params
   */
  public idParams: number = 0

  /**
   * Constructor in which we inject hero service, formBuilder and rouser service
   */
  constructor(
    private _hero: HeroService,
    private _UserHero: UserHeroService,
    private _Team: TeamService
  ) {
    this.bestT = new Object
  }

  /**
   * Start when the component inits
   */
  ngOnInit() {
    this.bestMarvel()
    this.bestDc()
    this.mostFollwed()
    this.bestTeam()
    this.bestOTHero()
    this.herosMost()
    this.newHeroesAdd()
  }

  images = ['photo_10.jpg', 'photo_9.jpg', 'photo_7.jpg'].map((n) => `../../../assets/img/${n}`);
  /**
   * Bring the best marvel hero
   */
  bestMarvel(): void {
    window.scrollTo(0, 0);
    this._UserHero.bestMarverHero().subscribe(
      res => {
        this.bestM = res[0]
        this.moststarts.push(this.bestM)
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
  * Bring the best other hero
  */
  bestOTHero(): void {
    this._UserHero.bestOTHero().subscribe(
      res => {
        this.bestOther = res[0]
        this.moststarts.push(this.bestOther)
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Bring the best Dc hero
   */
  bestDc(): void {
    this._UserHero.bestDCHero().subscribe(
      res => {
        this.bestD = res[0]
        this.moststarts.push(this.bestD)
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Bring the most followed hero
   */
  mostFollwed(): void {
    this._UserHero.mostFollowHeros().subscribe(
      res => {
        this.mostF = res
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Bring the team with highest stats
   */
  bestTeam(): void {
    this._Team.bestTeam().subscribe(
      res => {
        this.bestT = res[0]
        this.idParams = this.bestT.idUsu
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Bring the heroes with the highest stats
   */
  herosMost(): void {
    this.stats.forEach(stats => {
      this._hero[stats]().subscribe(
        res => {
          this.mostStatsHero.push(res)
        },
        error => {
          console.log(error)
        }
      )
    })
  }

  /**
   * Bring the newest heroes in the db
   */
  newHeroesAdd(): void {
    this._hero.newHeros().subscribe(
      res => {
        this.newHeros = res
      },
      error => {
        console.log(error)
      }
    )
  }
}
