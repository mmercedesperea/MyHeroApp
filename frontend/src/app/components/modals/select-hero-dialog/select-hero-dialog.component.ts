import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { HeroService } from 'src/app/services/hero.service'
import { Hero } from 'src/app/models/hero'

/**
 * Component to select a Hero
 */
@Component({
  selector: 'select-hero-dialog',
  templateUrl: './select-hero-dialog.component.html',
  styleUrls: ['./select-hero-dialog.component.scss']
})

export class selectHeroComponent implements OnInit {

  activeState: number;

  selectedIndex: number = null;

  // public setROW(_index:number){this.selectedIndex=_index}

  /**
   * variable to store sesson hero from sesson
   */
  public sessonHero: Hero
  /**
   * variable to store heros from the search
   */
  public heroes: Hero[]
  /**
   * variable to store selected hero id
   */
  public HeroSelectId: number = 0

  /**
  * Constructor in which we inject our services and different elements
  */
  constructor(
    public dialogRef: MatDialogRef<selectHeroComponent>,
    private _HeroService: HeroService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.sessonHero = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', null, 0)
  }

  /**
  * Start when the component inits
  */
  ngOnInit() { }

  /**
   * function get a hero by name
   * @param {string} teamName
   */
  getHeroByName(name) {
    this._HeroService.getHeroByName(name).subscribe(
      res => {
        this.heroes = res
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * function to save idHero
   * @param {number} idHero
   */
  selectHero(idHero) {
    this.HeroSelectId = idHero
    this.activeState = idHero;



    // this.selectedIndex = index;
  }

  /**
   * function to save hero in the storage
   * @param {number} id
   */
  async saveHeroStorage() {

    this._HeroService.getHeroById(this.HeroSelectId).subscribe(
      res => {
        this.sessonHero = res
        if (this.data.position === 1) {
          sessionStorage.setItem('Hero', JSON.stringify(this.sessonHero))
        } else {
          sessionStorage.setItem('Hero2', JSON.stringify(this.sessonHero))
        }
        this.dialogRef.close();
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * To close modal
   */
  onNoClick(): void {
    this.dialogRef.close()
  }
}
