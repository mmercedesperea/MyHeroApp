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
   * variable to store most follow heroes
   */
  public mostF: Hero[]
  /**
   * variable to store best team
   */
  public bestT: Team
  /** variable to store best team heroes
   * 
   */
  public bestTeamHeroes: Hero[] = []
  /**
   * variable to store mheroes with more stats
   */
  public mostStatsHero: Hero[] = []
  /**
   * variable to store new heros in bd
   */
  public newHeros: Hero[] = []
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
   * Constructor in which we inject hero service , formBuilder and rouser service
   */
  constructor (
    private _hero: HeroService,
    private _UserHero: UserHeroService,
    private _Team: TeamService
  ) {
    this.bestT = new Team(0, 0, '', '', '', '', '', '')
  }

  /**
   * Start when de component init
   */
  ngOnInit () {
    this.bestMarvel()
    this.bestDc()
    this.mostFollwed()
    this.bestTeam()
    this.herosMost()
    this.newHeroesAdd()
  }

  /**
   * Bring the best marvel hero
   */
  bestMarvel (): void {
    this._UserHero.bestMarverHero().subscribe(
      res => {
        this.bestM = res[0]
        console.log(this.bestM)
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Bring the best Dc hero
   */
  bestDc (): void {
    this._UserHero.bestDCHero().subscribe(
      res => {
        this.bestD = res[0]
        console.log(this.bestD)
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Bring the most followe hero
   */
  mostFollwed (): void {
    this._UserHero.mostFollowHeros().subscribe(
      res => {
        this.mostF = res
        console.log(this.mostF)
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Bring the team with higtest stats
   */
  bestTeam (): void {
    this._Team.bestTeam().subscribe(
      res => {
        this.bestT = res[0]
        for (var i = 1; i < 6; i++) {
          this._hero.getHeroById(this.bestT[`member_${i}`]).subscribe(res => {
            console.log(res)
            this.bestTeamHeroes.push(res)
          })
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Bring the heroes with the highest stats
   */
  herosMost (): void {
    this.stats.forEach(stats => {
      this._hero[stats]().subscribe(
        res => {
          this.mostStatsHero.push(res)
          console.log(res)
        },
        error => {
          console.log(error)
        }
      )
    })
  }

  /**
   * Bring the heroes new in the db
   */
  newHeroesAdd (): void {
    this._hero.newHeros().subscribe(
      res => {
        this.newHeros = res
        console.log(this.newHeros)
      },
      error => {
        console.log(error)
      }
    )
  }
}
