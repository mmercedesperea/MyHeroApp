import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'
import { FormGroup, FormControl, AbstractControl } from '@angular/forms'
import { User } from '../../components/models/user'
import { UserService } from 'src/app/services/user.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //variables
  public registerForm: FormGroup
  public user: User
  public message: string

  constructor (
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private router: Router
  ) {
    this.user = new User(0, '', '', '', '', '', new Date(0), '', 0)
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [
        '',
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ],
      password: [
        '',
        [
        Validators.required,
        Validators.minLength(6), 
        Validators.maxLength(30)]
      ],
      confirmPass: ['', [Validators.required, this.passwordsShouldMatch]]
    });
  }

  // emailMatcher = (control: AbstractControl): {[key: string]: boolean} => {
  //   const email = control.get('email');
  //   const confirm = control.get('confirm');
  //   if (!email || !confirm) return null;
  //   return email.value === confirm.value ? null : { nomatch: true };
  // };



  getErrorMessage(dato) {
    return this.registerForm.controls[dato].hasError("required")
      ? "Esta información es necesaria"
      : this.registerForm.controls[dato].hasError("minlength")
      ? "Debe introducir al menos 6 caracteres"
      : this.registerForm.controls[dato].hasError("maxlength")
      ? "El máximo de caracteres es 30"
      : "";
  }

  // getErrorMessageEmail() {
  //   return this.registerForm.controls.email.hasError("required")
  //     ? "Debe incluir un email"
  //     : this.registerForm.controls.email.hasError("email")
  //       ? "No es un email valido"
  //       : "";
  // }

  // getErrorMessageName() {
  //   return this.registerForm.controls.name.hasError("required")
  //     ? "Debe incluir un nombre"
  //     : ";";
  // }

  // getErrorMessagePass() {
  //   return this.registerForm.controls.confirmPass.hasError("required")
  //     ? "Debe incluir una contraseña"
  //     : this.registerForm.controls.confirmPass.hasError("minlength")
  //       ? "Minimo 6 caracteres"
  //       : "La contraseña no coincide";
  // }

  // getErrorMessage() {
  //   return this.registerForm.controls.password.hasError("required")
  //     ? "Debe incluir una contrase�a"
  //     : this.registerForm.controls.password.hasError("minlength")
  //       ? "Minimo 6 caracteres"
  //       : "";
  // }

  // Validacion para comprobar que las contraseñas coinciden
  passwordsShouldMatch (control: AbstractControl) {
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

  signUp () {
    this._userService.RegisterUser(this.user).subscribe(
      response => {
        console.log(this.user)
        // if (response.user && response.user.idUser) {
        console.log('Registro correctamente')
        this.message = 'Registro correctamente '
        // limpiamos el usuario
        this.user = new User(0, '', '', '', '', '', new Date(0), '', 0)
        this.registerForm.reset()
        this.router.navigate(['/login'])
      },
      error => {
        if (error.status === 400) {
          this.message = 'EL usuario ya existe'
          console.log(error.status)
          console.log(this.message)
        } else {
          console.log(error.status)
          this.message = 'Error al registrarse'
          console.log(this.message)
        }
      }
    )
  }
}
