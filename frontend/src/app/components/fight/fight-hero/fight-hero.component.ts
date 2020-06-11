import { Component, OnInit } from '@angular/core'
import { Hero } from 'src/app/models/hero'
import { HeroService } from 'src/app/services/hero.service'
import { MatDialog } from '@angular/material'
import { selectHeroComponent } from '../../modals/select-hero-dialog/select-hero-dialog.component'

/**
 * Component for Fight hero
 */
@Component({
  selector: 'app-fight-hero',
  templateUrl: './fight-hero.component.html',
  styleUrls: ['./fight-hero.component.scss']
})

export class FightHeroComponent implements OnInit {
  /**
   * variable to store the winner hero
   */
  public hero: Hero
  /**
   * variable to store the 1st hero in local storage
   */
  public sessonHero: Hero
  /**
   * variable to store the 2nd hero in local storage
   */
  public sessonHero2: Hero

  /**
   * Constructor in which we inject our services and different elements
   */
  constructor(private _hero: HeroService, public dialog: MatDialog) {
    this.hero = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', null, 0)
    this.sessonHero = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', null, 0)
    this.sessonHero2 = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', null, 0)

  }

  /**
   * Start when the component inits
   */
  ngOnInit() {
    this.clearHerosSession()
  }

  /**
   * clear local storage
   */
  clearHerosSession() {
    sessionStorage.clear()
  }

  /**
   * Get heroes in session storage
   */
  getSessionHeroes() {
    this.sessonHero = JSON.parse(sessionStorage.getItem('Hero'))
    this.sessonHero2 = JSON.parse(sessionStorage.getItem('Hero2'))
  }

  /**
   * Play audio
   */
  playAudio() {
    let audio = <HTMLAudioElement>document.getElementById("myAudio");
    audio.play();
  }

  /**
   * Get winner hero
   */
  getHeroWinner() {
    this._hero
      .getWinner(this.sessonHero.idHero, this.sessonHero2.idHero)
      .subscribe(
        res => {
          this.hero = res
        },
        error => {
          console.log(error)
        }
      )
  }

  /**
   * Open modal to choose hero
   * @param {number} position
   */
  selectFightDialog(position) {
    const dialogRef = this.dialog.open(selectHeroComponent, {
      data: {
        position: position,
        action: 'fight'
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getSessionHeroes()
    })
  }
}
