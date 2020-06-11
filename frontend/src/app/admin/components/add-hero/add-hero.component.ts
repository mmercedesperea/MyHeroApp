import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'
import { FormGroup, FormControl, AbstractControl } from '@angular/forms'
import { Hero } from 'src/app/models/hero'
import { HeroService } from 'src/app/services/hero.service'
import { DateAdapter } from '@angular/material/core'
import { MatSnackBar } from '@angular/material';

/**
 * Component to add a hero
 */
@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss']
})

export class AddHeroComponent implements OnInit {
  /**
   * to add FormGroup
   */
  public newHeroForm: FormGroup
  /**
   * variable to store the hero to add
   */
  public hero: Hero
  /**
   * variable to save message info
   */
  public message: string
  /**
   * variable to check if the function was ok
   */
  public correctData: boolean

  /**
   * Constructor in which we inject our services and different elements
   */
  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private _heroService: HeroService
  ) { }

  /**
   * Start when the component inits
   */
  ngOnInit() {
    this.correctData = true;
    this.hero = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', null)

    this.newHeroForm = this.formBuilder.group({
      heroName: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)]
      ],
      image: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(300)
        ]
      ],
      intelligence: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)]
      ],
      strength: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)]
      ],
      speed: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)]
      ],
      durability: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)]
      ],
      power: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)]
      ],
      combat: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)]
      ],
      fullName: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)]
      ],
      placeOfBirth: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      publisher: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)]
      ],
      alignment: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)]
      ],
      firstAppearance: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(300)
        ]
      ],
      gender: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)]
      ],
      race: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)]
      ],
      height: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)]
      ],
      weight: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)]
      ],
      eyeColor: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)]
      ],
      hairColor: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)]
      ],
      work: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(300)]
      ],
      biography: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(300)
        ]
      ]
    })
  }

  /**
   * function to control error messages
   * @param {string} dato
   * @returns message
   */
  getErrorMessage(dato) {
    var result: string
    if (this.newHeroForm.controls[dato].hasError('required')) {
      return (result = 'This information is required')
    } else if (this.newHeroForm.controls[dato].hasError('minlength')) {

      return (result = 'You must enter at least 1 characters')

    } else if (this.newHeroForm.controls[dato].hasError('maxlength')) {
      if (dato === 'image' || dato === 'firstAppearance' || dato === 'biography' || dato === 'work') {
        return (result = 'The maximum of characters is 300')
      } else {

        return (result = 'The maximum of characters is 30')
      }
    } else {
      return (result = '')
    }
  }

  /**
   * Function to save a hero
   */
  saveHero() {
    this._heroService.newHero(this.hero).subscribe(
      response => {
        this.message = 'Create correctly';
        this.correctData = true;
        this.openSnackBar('CREATE CORRECTLY', 'Close')

      },
      error => {
        this.correctData = false;
        console.log(error.status);
        this.message = 'create hero failed';
        console.log(this.message);
        this.openSnackBar('CREATE HERO FAILED', 'Close')
      }
    );
  }

  /**
   * function to open snackBars
   *  @param {string} message
   *  @param {string} action
   */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
      panelClass: ['blue-snackbar']
    })
  }

}
