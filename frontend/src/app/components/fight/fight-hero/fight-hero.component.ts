import { Component, OnInit } from '@angular/core'
import { Hero } from 'src/app/models/hero'
import { HeroService } from 'src/app/services/hero.service'
import { MatDialog } from '@angular/material'
import { selectHeroComponent } from '../../modals/select-hero-dialog/select-hero-dialog.component'

/**
 * Component for fight hero
 */
@Component({
  selector: 'app-fight-hero',
  templateUrl: './fight-hero.component.html',
  styleUrls: ['./fight-hero.component.scss']
})

export class FightHeroComponent implements OnInit {
  /**
   * variable for store de hero winner
   */
  public hero: Hero
  /**
   * variable for store the hero for local storage
   */
  public sessonHero: Hero
  /**
   * variable for store the hero for local storage
   */  
  public sessonHero2: Hero

  /**
   * Constructor in which we inject our services and diferents elements
   */
  constructor (private _hero: HeroService, public dialog: MatDialog) {
    this.hero = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', null, 0)
    this.sessonHero = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', null, 0)
    this.sessonHero2 = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', null, 0)

  }

  /**
   * Start when de component init
   */
  ngOnInit () {
    this.clearHerosSession()
  }

  /**
   * clear local storage
   */
  clearHerosSession () {
    sessionStorage.clear()
  }

  /**
   * Get heroes in session storage
   */
  getSessionHeroes () {
    this.sessonHero = JSON.parse(sessionStorage.getItem('Hero'))
    this.sessonHero2 = JSON.parse(sessionStorage.getItem('Hero2'))
  }

  /**
   * Get Hero winner
   */
  getHeroWinner () {
    this._hero
      .getWinner(this.sessonHero.idHero, this.sessonHero2.idHero)
      .subscribe(
        res => {
          this.hero = res
          console.log(res)
        },
        error => {
          console.log(error)
        }
      )
  }

  /**
   * Open modal for comment hero
   * @param {number} position
   */
  selectFightDialog (position) {
    const dialogRef = this.dialog.open(selectHeroComponent, {
      data: {
        position: position,
        action: 'fight'
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      this.getSessionHeroes()
    })
  }
}
