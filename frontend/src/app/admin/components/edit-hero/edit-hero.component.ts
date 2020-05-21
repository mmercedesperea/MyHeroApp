import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/app/models/hero';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HeroService } from 'src/app/services/hero.service';
import { MatDialog } from '@angular/material';
import { selectHeroComponent } from 'src/app/components/modals/select-hero-dialog/select-hero-dialog.component';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.scss']
})
export class EditHeroComponent implements OnInit {

  public hero: Hero;
  public editHeroForm: FormGroup
  public idHero:number=0
  public message: string
  public correctData: boolean
  
  constructor(

    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _HeroService: HeroService,
  ) { }

  ngOnInit() {
    // this.getInfoHero(id)
    this.hero = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', null)


    this.editHeroForm = this.formBuilder.group({
      heroName: [
        '',
        [Validators.minLength(1), Validators.maxLength(30)]
      ],
      image: [
        '',
        [

          Validators.minLength(1),
          Validators.maxLength(300)
        ]
      ],
      intelligence: [
        '',
        [Validators.minLength(1), Validators.maxLength(30)]
      ],
      strength: [
        '',
        [Validators.minLength(1), Validators.maxLength(30)]
      ],
      speed: [
        '',
        [Validators.minLength(1), Validators.maxLength(30)]
      ],
      durability: [
        '',
        [Validators.minLength(1), Validators.maxLength(30)]
      ],
      power: [
        '',
        [Validators.minLength(1), Validators.maxLength(30)]
      ],
      combat: [
        '',
        [Validators.minLength(1), Validators.maxLength(30)]
      ],
      fullName: [
        '',
        [Validators.minLength(1), Validators.maxLength(30)]
      ],
      placeOfBirth: ['', [Validators.minLength(1), Validators.maxLength(30)]],
      publisher: [
        '',
        [Validators.minLength(1), Validators.maxLength(30)]
      ],
      alignment: [
        '',
        [Validators.minLength(1), Validators.maxLength(30)]
      ],
      firstAppearance: [
        '',
        [

          Validators.minLength(1),
          Validators.maxLength(300)
        ]
      ],
      gender: [
        '',
        [Validators.minLength(1), Validators.maxLength(30)]
      ],
      race: [
        '',
        [Validators.minLength(1), Validators.maxLength(30)]
      ],
      height: [
        '',
        [Validators.minLength(1), Validators.maxLength(30)]
      ],
      weight: [
        '',
        [Validators.minLength(1), Validators.maxLength(30)]
      ],
      eyeColor: [
        '',
        [Validators.minLength(1), Validators.maxLength(30)]
      ],
      hairColor: [
        '',
        [Validators.minLength(1), Validators.maxLength(30)]
      ],
      work: [
        '',
        [Validators.minLength(1), Validators.maxLength(300)]
      ],
      biography: [
        '',
        [

          Validators.minLength(1),
          Validators.maxLength(300)
        ]
      ]
    })
  }


  getInfoHero(idHero) {
    this._HeroService.getHeroById(idHero).subscribe(res => {
      console.log(res)
      this.hero = res
    }, err => {
      console.log(err)
    })

  }

  submit() {
    this._HeroService.modifyHero(this.idHero, this.hero).subscribe(
      res => {
        console.log(res)
        // this.openSnackBar('YOUR PROFILE HAS BEEN UPDATED', 'Close')
        this.message = 'Create correctly';
        this.correctData = true;
        // this.router.navigateByUrl("/profile");
      },
      err => {console.error(err);         this.message = 'create hero failed';}
    )

    // this.dialogRef.close(`${form.value.name}`);
  }

  getErrorMessage(dato) {
    var result: string
    if (this.editHeroForm.controls[dato].hasError('required')) {
      return (result = 'This information is required')
    } else if (this.editHeroForm.controls[dato].hasError('minlength')) {

      return (result = 'You must enter at least 1 characters')

    } else if (this.editHeroForm.controls[dato].hasError('maxlength')) {
      if (dato === 'image' || dato === 'firstAppearance' || dato === 'biography' || dato === 'work') {
        return (result = 'The maximum of characters is 300')
      } else {

        return (result = 'The maximum of characters is 30')
      }
    } else {
      return (result = '')
    }
  }

  SearchHeroDialog(): void {
    const dialogRef = this.dialog.open(selectHeroComponent, {
      // Le pasamos los datos que queremos
      data: {
        //   userId: this.identity.id,
        //   alias: this.identity.alias,
        action: 'edit'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      if(result){
        this.idHero=result;
        this.getInfoHero(result)
      }
    });
  }

}
