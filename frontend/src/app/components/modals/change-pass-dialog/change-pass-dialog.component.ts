import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'
import { FormGroup, FormControl, AbstractControl } from '@angular/forms'
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-pass-dialog',
  templateUrl: './change-pass-dialog.component.html',
  styleUrls: ['./change-pass-dialog.component.css']
})
export class ChangePassDialogComponent implements OnInit {
  public passForm: FormGroup;
  public message: string;
  public correctdata: boolean;

  constructor(
    public dialogRef: MatDialogRef<ChangePassDialogComponent>,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _UserService: UserService,

    @Inject(MAT_DIALOG_DATA) public data: any) { }

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
    });
  }

  getErrorMessage(dato) {
    var result: string;
    if (this.passForm.controls[dato].hasError('required')) {
      return (result = 'This information is required');
    } else if (this.passForm.controls[dato].hasError('minlength')) {
      return (result = 'You must enter at least 6 characters');
    } else if (this.passForm.controls[dato].hasError('maxlength')) {
      return (result = 'The maximum of characters is 30');
    } else if (dato === 'confirmPass') {
      return (result = 'Passwords do not match');
    } else {
      return (result = '');
    }
  }

  // Validacion para comprobar que las contraseñas coinciden
  passwordsShouldMatch(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const password2Value = control.value;
      const passControl = control.root.get('password')
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== password2Value) {
          return {
            isError: true
          }
        }
      }
    }
    return null;
  }


  submit(passForm) {
    console.log(this.data.email)
    var passObj = { email: this.data.email, password: passForm.value.oldPassword, newPassword: passForm.value.password };
    console.log(passObj)
    this._UserService.updatePass(this.data.userId, passObj).subscribe(
      res => {
        console.log(res)
        this.openSnackBar('YOUR PASSWORD HAS BEEN UPDATED', 'Close')
        this.correctdata = true;
        this.dialogRef.close("Close modal!");
      },
      err => {
        this.correctdata = false;
        if (err.status === 400) {
          this.message = 'Invalid OLD Password';
          console.log(err.status);
          console.log(this.message);
        } else {
          console.log(err.status);
          this.message = 'Error changing password';
          console.log(this.message);
        }
      }
    )

    // this.dialogRef.close(`${form.value.name}`);
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
      panelClass: ['blue-snackbar']
    })
  }

}
