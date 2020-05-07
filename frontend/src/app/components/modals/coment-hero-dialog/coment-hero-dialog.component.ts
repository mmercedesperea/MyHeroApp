import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'
import { FormGroup, FormControl, AbstractControl } from '@angular/forms'
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { UserHeroService } from 'src/app/services/user-hero.service';

@Component({
  selector: 'app-coment-hero-dialog',
  templateUrl: './coment-hero-dialog.component.html',
  styleUrls: ['./coment-hero-dialog.component.scss']
})

export class ComentHeroDialogComponent implements OnInit {
  public commentForm: FormGroup;
  public message: string;
  public correctdata: boolean;

  constructor(
    public dialogRef: MatDialogRef<ComentHeroDialogComponent>,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _UserService: UserService,
    private _UserHeroService: UserHeroService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      comment: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(300)]
      ]
    });
  }

  getErrorMessage(dato) {
    var result: string;
    if (this.commentForm.controls[dato].hasError('required')) {
      return (result = 'This information is required');
    } else if (this.commentForm.controls[dato].hasError('minlength')) {
      return (result = 'You must enter at least 6 characters');
    } else if (this.commentForm.controls[dato].hasError('maxlength')) {
      return (result = 'The maximum of characters is 300');
    } else {
      return (result = '');
    }
  }


  submit(commentForm) {
    var commentObj = { comment: commentForm.value.comment, idUsu: this.data.idUsu, idHero: this.data.idHero };

    console.log(commentObj)
    this._UserHeroService.commentHero(commentObj).subscribe(
      res => {
        console.log(res)
        this.openSnackBar('YOUR COMMENT HAS BEEN SAVE', 'Close')
        this.correctdata = true;
        this.dialogRef.close("Close modal!");
      },
      err => {
        this.correctdata = false;
        console.log(err.status);
        this.message = 'Error saving ypur comment';
        console.log(this.message);

      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
      panelClass: ['blue-snackbar']
    })
  }

}