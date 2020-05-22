import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'
import { FormGroup, FormControl, AbstractControl } from '@angular/forms'
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})

/**
 * Component for delete a user
 */
export class DeleteUserDialogComponent implements OnInit {
  public passForm: FormGroup;
  public message: string;
  public correctdata: boolean;

     /**
   * Constructor in which we inject our services and diferents elements
   */
  constructor(
    public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _UserService: UserService,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

   /**
   * Start when de component init
   */
  ngOnInit() {
    this.passForm = this.formBuilder.group({
      password: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
    });
  }

   /**
   * function to control error messages
   * @param {string} dato
   * @returns message
   */
  getErrorMessage(dato) {
    var result: string;
    if (this.passForm.controls[dato].hasError('required')) {
      return (result = 'This information is required');
    } else if (this.passForm.controls[dato].hasError('minlength')) {
      return (result = 'You must enter at least 6 characters');
    } else if (this.passForm.controls[dato].hasError('maxlength')) {
      return (result = 'The maximum of characters is 30');
    } else {
      return (result = '');
    }
  }

   /**
   * function to submit form
   * @param {any} passForm
   */
  submit(passForm) {
    var deleteObj = { email: this.data.email, password: passForm.value.password };
   
    this._UserService.deleteUser(this.data.userId, deleteObj).subscribe(
      res => {
        console.log(res)
        this.openSnackBar('YOUR ACOUNT HAD BEEN DELETED', 'Close')
        this.correctdata = true;
        this.dialogRef.close("Close modal!");
        localStorage.clear();
    this._router.navigate(['/']);
      },
      err => {
        this.correctdata = false;
        if (err.status === 400) {
          this.message = 'Invalid Password';
          console.log(err.status);
          console.log(this.message);
        } else {
          console.log(err.status);
          this.message = 'Error deleting your acount';
          console.log(this.message);
        }
      }
    )

  }

  /**
   * function for open snackBars
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

