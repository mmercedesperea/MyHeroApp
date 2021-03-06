import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'
import { FormGroup, FormControl, AbstractControl } from '@angular/forms'
import { MatSnackBar } from '@angular/material'
import { UserService } from 'src/app/services/user.service'

/**
 * Component for change pass
 */
@Component({
  selector: 'app-change-pass-dialog',
  templateUrl: './change-pass-dialog.component.html',
  styleUrls: ['./change-pass-dialog.component.scss']
})

export class ChangePassDialogComponent implements OnInit {
  /**
  * to add FormGroup
  */
  public passForm: FormGroup
  /**
   * variable to save message info
   */
  public message: string
  /**
   * variable to check if the function was ok
   */
  public correctdata: boolean

  /**
   * Constructor in which we inject our services and different elements
   */
  constructor(
    public dialogRef: MatDialogRef<ChangePassDialogComponent>,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _UserService: UserService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /**
   * Start when the component inits
   */
  ngOnInit() {
    this.passForm = this.formBuilder.group({
      oldPassword: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      confirmPass: ['', [Validators.required, this.passwordsShouldMatch]]
    })
  }

  /**
   * function to control error messages
   * @param {string} dato
   * @returns message
   */
  getErrorMessage(dato) {
    var result: string
    if (this.passForm.controls[dato].hasError('required')) {
      return (result = 'This information is required')
    } else if (this.passForm.controls[dato].hasError('minlength')) {
      return (result = 'You must enter at least 6 characters')
    } else if (this.passForm.controls[dato].hasError('maxlength')) {
      return (result = 'The maximum of characters is 30')
    } else if (dato === 'confirmPass') {
      return (result = 'Passwords do not match')
    } else {
      return (result = '')
    }
  }

  /**
   * Validation to verify that the passwords match
   * @param {any} control
   */
  passwordsShouldMatch(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const password2Value = control.value
      const passControl = control.root.get('password')
      if (passControl) {
        const passValue = passControl.value
        if (passValue !== password2Value) {
          return {
            isError: true
          }
        }
      }
    }
    return null
  }

  /**
   * function to submit form
   * @param {any} passForm
   */
  submit(passForm) {
    var passObj = {
      email: this.data.email,
      password: passForm.value.oldPassword,
      newPassword: passForm.value.password
    }
    this._UserService.updatePass(this.data.userId, passObj).subscribe(
      res => {
        this.openSnackBar('YOUR PASSWORD HAS BEEN UPDATED', 'Close')
        this.correctdata = true
        this.dialogRef.close('Close modal!')
      },
      err => {
        this.correctdata = false
        if (err.status === 400) {
          this.message = 'Invalid OLD Password'
          console.log(err.status)
          console.log(this.message)
        } else {
          console.log(err.status)
          this.message = 'Error changing password'
          console.log(this.message)
        }
      }
    )
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
