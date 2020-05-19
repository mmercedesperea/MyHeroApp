import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from 'src/app/models/hero';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-fight-dialog',
  templateUrl: './fight-dialog.component.html',
  styleUrls: ['./fight-dialog.component.scss']
})
export class FightDialogComponent implements OnInit {
  public sessonHero: Hero;
  public heroes: Hero[];
  public searchForm: FormGroup;
  public HeroSelectId: number=0;
  // public sessonHero2: Hero;
  constructor(public dialogRef: MatDialogRef<FightDialogComponent>,
    private formBuilder: FormBuilder,
    private _HeroService: HeroService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.sessonHero = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '', null, 0)
    // this.sessonHero2 = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '','', '','', null,0)
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      heroName: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(100)]
      ]
    });
  }

  getErrorMessage(dato) {
    var result: string;
    if (this.searchForm.controls[dato].hasError('required')) {
      return (result = 'This information is required');
    } else if (this.searchForm.controls[dato].hasError('minlength')) {
      return (result = 'You must enter at least 1 characters');
    } else if (this.searchForm.controls[dato].hasError('maxlength')) {
      return (result = 'The maximum of characters is 100');
    } else {
      return (result = '');
    }
  }

  getHeroByName(name){
    console.log("llego")
    this._HeroService.getHeroByName(name).subscribe(res => {
     
      // console.log(res.idHero)
      this.heroes = res;
      console.log(JSON.stringify(this.heroes, null, 2));
      // console.log(this.hero);
    },
      error => {
        console.log(error)
      }
    )
  }

  selectHero(idHero){
    this.HeroSelectId=idHero
  }
  // getHero(id) {
  //   this._HeroService.getHeroById(id).subscribe(res => {
  //     this.sessonHero = res;
  //     // console.log(JSON.stringify(this.hero, null, 2));
  //   },
  //     error => {
  //       console.log(error)
  //     }

  //   )
  // }

  async saveHeroStorage(id) {
    // await this.getHero(id)
    this._HeroService.getHeroById(id).subscribe(res => {
      this.sessonHero = res;
      if (this.data.position === 1) {
        console.log("hero1")
        console.log(this.sessonHero)
        sessionStorage.setItem('Hero', JSON.stringify(this.sessonHero));
  
      } else {
        console.log("hero2")
        sessionStorage.setItem('Hero2', JSON.stringify(this.sessonHero));
  
  
      }
      // console.log(JSON.stringify(this.hero, null, 2));
    },
      error => {
        console.log(error)
      }

    )
  //   if (this.data.position === 1) {
  //     console.log("hero1")
  //     console.log(this.sessonHero)
  //     sessionStorage.setItem('Hero', JSON.stringify(this.sessonHero));

  //   } else {
  //     console.log("hero2")
  //     sessionStorage.setItem('Hero2', JSON.stringify(this.sessonHero));


  //   }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
