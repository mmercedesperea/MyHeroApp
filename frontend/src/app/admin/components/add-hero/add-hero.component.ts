import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'
import { FormGroup, FormControl, AbstractControl } from '@angular/forms'
import { Hero } from 'src/app/models/hero'
import { HeroService } from 'src/app/services/hero.service'
import { DateAdapter } from '@angular/material/core'

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.scss']
})
export class AddHeroComponent implements OnInit {
  public newHeroForm: FormGroup
  public hero: Hero
  public message: string
  public correctData: boolean

  constructor(
    private _adapter: DateAdapter<any>,
    private formBuilder: FormBuilder,
    private _heroService: HeroService
  ) { }

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
      placeOfBirth:['',  [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      publisher: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)]
      ],
      alignment: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)]
      ],
      firstApperance: [
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
        [Validators.required, Validators.minLength(1), Validators.maxLength(30)]
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

  getErrorMessage(dato) {
    var result: string
    if (this.newHeroForm.controls[dato].hasError('required')) {
      return (result = 'This information is required')
    } else if (this.newHeroForm.controls[dato].hasError('minlength')) {

      return (result = 'You must enter at least 1 characters')

    } else if (this.newHeroForm.controls[dato].hasError('maxlength')) {
      if (dato === 'image' || dato === 'firstApperance' || dato === 'biography') {
        return (result = 'The maximum of characters is 300')
      } else {

        return (result = 'The maximum of characters is 30')
      }
    } else {
      return (result = '')
    }
  }




  saveHero() {
    // this._heroService.newHero(this.hero).subscribe(
    //   response => {
    //     console.log(this.hero);
    //     console.log('Save correctly');
    //     this.message = 'Create correctly';
    //     // limpiamos el usuario
    //     this.hero = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', null)
    //     this.newHeroForm.reset();
    //     this.correctData = true;
    //   },
    //   error => {
    //     this.correctData = false;
    //     // if (error.status === 400) {
    //     //   this.message = 'User already exists';
    //     //   console.log(error.status);
    //     //   console.log(this.message);
    //     // } else {
    //       console.log(error.status);
    //       this.message = 'create hero failed';
    //       console.log(this.message);
    //     // }
    //   }
    // );
  }
}
