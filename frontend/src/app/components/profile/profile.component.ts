import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'
import { FormGroup, FormControl, AbstractControl } from '@angular/forms'
import { DateAdapter } from "@angular/material/core";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public identity;
  public user: User;
  public profileForm: FormGroup;
  textError: any;

  constructor(  private _snackBar: MatSnackBar,private _adapter: DateAdapter<any>,private formBuilder: FormBuilder, private _UserService: UserService) {
    this.user = new User(0, '', '', '', '', '', new Date(0), '', 0)

  }

  ngOnInit() {

    this.identity = this._UserService.getIdentity();
    this.getInfoUser();
    this.profileForm = this.formBuilder.group({
      alias: [
        '',
        [ Validators.minLength(3), Validators.maxLength(30)]
      ], name: [
        '',
        [ Validators.minLength(3), Validators.maxLength(30)]
      ], surname: [
        '',
        [ Validators.minLength(3), Validators.maxLength(30)]
      ], dateOfBirth: [
        this._adapter.setLocale("us"),
        [ Validators.minLength(3), Validators.maxLength(30)]
      ],
      email: [
        '',
        [
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ],

    });

  }


  getInfoUser() {
    this._UserService.getUser(this.identity.id).subscribe(res => {
      console.log(res)
      this.user = res;
    }, error => {
      console.log(error)
    })
  }

  // getErrorMessage(dato) {
  //   var result: string;
  //   if (this.registerForm.controls[dato].hasError('required')) {
  //     return (result = 'Esta información es necesaria');
  //   } else if (this.registerForm.controls[dato].hasError('minlength')) {
  //     if (dato === 'alias') {
  //       return (result = 'Debe introducir al menos 3 caracteres');
  //     } else {
  //       return (result = 'Debe introducir al menos 6 caracteres');
  //     }
  //   } else if (this.registerForm.controls[dato].hasError('maxlength')) {
  //     return (result = 'El máximo de caracteres es 30');
  //   } else if (
  //     this.registerForm.controls[dato].hasError('email') &&
  //     dato === 'email'
  //   ) {
  //     return (result = 'Tiene que introducir un email valido');
  //   } else if (dato === 'confirmPass') {
  //     return (result = 'Las contraseñas no coinciden');
  //   } else {
  //     return (result = '');
  //   }
  // }
  submit() {
    this._UserService.updateUser(this.identity.id,
      this.user
    )
      .subscribe(
        res => {
          console.log( res);
          this.openSnackBar(
            "YOUR PROFILE HAS BEEN UPDATED",
            "Close"
          )

          // this.router.navigateByUrl("/profile");
        },
        err => console.error(err)
      );

    // this.dialogRef.close(`${form.value.name}`);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
      panelClass: ["blue-snackbar"]
    });
  }


}
