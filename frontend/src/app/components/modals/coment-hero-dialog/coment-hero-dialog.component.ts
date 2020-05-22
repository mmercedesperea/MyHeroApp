import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'
import { FormGroup, FormControl, AbstractControl } from '@angular/forms'
import { MatSnackBar } from '@angular/material'
import { UserService } from 'src/app/services/user.service'
import { UserHeroService } from 'src/app/services/user-hero.service'

@Component({
  selector: 'app-coment-hero-dialog',
  templateUrl: './coment-hero-dialog.component.html',
  styleUrls: ['./coment-hero-dialog.component.scss']
})

/**
 * Component for comment a hero
 */
export class ComentHeroDialogComponent implements OnInit {
  public commentForm: FormGroup
  public message: string
  public correctdata: boolean

  /**
   * Constructor in which we inject our services and diferents elements
   */
  constructor (
    public dialogRef: MatDialogRef<ComentHeroDialogComponent>,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _UserHeroService: UserHeroService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  /**
   * Start when de component init
   */
  ngOnInit () {
    this.commentForm = this.formBuilder.group({
      comment: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(300)
        ]
      ]
    })
    console.log(this.data)
  }

  /**
   * function to control error messages
   * @param {string} dato
   * @returns message
   */
  getErrorMessage (dato) {
    var result: string
    if (this.commentForm.controls[dato].hasError('required')) {
      return (result = 'This information is required')
    } else if (this.commentForm.controls[dato].hasError('minlength')) {
      return (result = 'You must enter at least 6 characters')
    } else if (this.commentForm.controls[dato].hasError('maxlength')) {
      return (result = 'The maximum of characters is 300')
    } else {
      return (result = '')
    }
  }

  /**
   * function to submit form
   * @param {any} commentForm
   */
  submit (commentForm) {
    if (this.data.status === 'new') {
      var commentObj = {
        comment: commentForm.value.comment,
        idUsu: this.data.idUsu,
        idHero: this.data.idHero
      }

      console.log(commentObj)
      this._UserHeroService.commentHero(commentObj).subscribe(
        res => {
          console.log(res)
          this.openSnackBar('YOUR COMMENT HAS BEEN SAVE', 'Close')
          this.correctdata = true
          this.dialogRef.close('Close modal!')
        },
        err => {
          this.correctdata = false
          console.log(err.status)
          this.message = 'Error saving your comment'
          console.log(this.message)
        }
      )
    } else {
      var commentObj = {
        comment: commentForm.value.comment,
        idUsu: this.data.idUsu,
        idHero: this.data.idHero
      }

      console.log(commentObj)
      this._UserHeroService.commentHero(commentObj).subscribe(
        res => {
          console.log(res)
          this.openSnackBar('YOUR COMMENT HAS BEEN MODIFY', 'Close')
          this.correctdata = true
          this.dialogRef.close('Close modal!')
        },
        err => {
          this.correctdata = false
          console.log(err.status)
          this.message = 'Error modifin your comment'
          console.log(this.message)
        }
      )
    }
  }

  /**
   * Delete comment
   */
  deleteComment () {
    var commentObj = { idUsu: this.data.idUsu, idHero: this.data.idHero }

    this._UserHeroService.deleteCHero(commentObj).subscribe(
      res => {
        console.log(res)
        this.openSnackBar('YOUR COMMENT HAS BEEN DELETE', 'Close')
        this.correctdata = true
        this.dialogRef.close('Close modal!')
      },
      err => {
        this.correctdata = false
        console.log(err.status)
        this.message = 'Error deleting your commet'
        console.log(this.message)
      }
    )
  }

  /**
   * function for open snackBars
   *  @param {string} message
   *  @param {string} action
   */
  openSnackBar (message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
      panelClass: ['blue-snackbar']
    })
  }
}
