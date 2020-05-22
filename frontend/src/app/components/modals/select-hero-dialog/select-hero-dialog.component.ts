import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { HeroService } from 'src/app/services/hero.service'
import { Hero } from 'src/app/models/hero'

@Component({
  selector: 'select-hero-dialog',
  templateUrl: './select-hero-dialog.component.html',
  styleUrls: ['./select-hero-dialog.component.scss']
})

/**
 * Component for select a Hero
 */
export class selectHeroComponent implements OnInit {
  public sessonHero: Hero
  public heroes: Hero[]
  public HeroSelectId: number = 0

   /**
   * Constructor in which we inject our services and diferents elements
   */
  constructor (
    public dialogRef: MatDialogRef<selectHeroComponent>,
    private _HeroService: HeroService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.sessonHero = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', null, 0)
  }

   /**
   * Start when de component init
   */
  ngOnInit () {}

  /**
   * function get a hero by name
   * @param {string} teamName
   */
  getHeroByName (name) {
    this._HeroService.getHeroByName(name).subscribe(
      res => {
        this.heroes = res
        console.log(JSON.stringify(this.heroes, null, 2))
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * function save idHero
   * @param {number} idHero
   */
  selectHero (idHero) {
    this.HeroSelectId = idHero
  }

  /**
   * function to save hero in the storage
   * @param {number} id
   */
  async saveHeroStorage (id) {
    this._HeroService.getHeroById(id).subscribe(
      res => {
        this.sessonHero = res
        if (this.data.position === 1) {
          console.log('hero1')
          console.log(this.sessonHero)
          sessionStorage.setItem('Hero', JSON.stringify(this.sessonHero))
        } else {
          console.log('hero2')
          sessionStorage.setItem('Hero2', JSON.stringify(this.sessonHero))
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * To close modal
   */
  onNoClick (): void {
    this.dialogRef.close()
  }
}
