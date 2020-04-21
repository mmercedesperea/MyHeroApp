import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { User } from '../../components/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // variables
  public registerForm: FormGroup;
  public user: User;
  public message: string;
  public datosCorrectos: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private router: Router
  ) {
    this.user = new User(0, '', '', '', '', '', null, '', 0);
  }

  ngOnInit () {
    this.datosCorrectos = true;
    this.registerForm = this.formBuilder.group({
      alias: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
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
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      confirmPass: ['', [Validators.required, this.passwordsShouldMatch]]
    });
  }

  getErrorMessage(dato) {
    var result: string;
    if (this.registerForm.controls[dato].hasError('required')) {
      return (result = 'Esta información es necesaria');
    } else if (this.registerForm.controls[dato].hasError('minlength')) {
      if (dato === 'alias') {
        return (result = 'Debe introducir al menos 3 caracteres');
      } else {
        return (result = 'Debe introducir al menos 6 caracteres');
      }
    } else if (this.registerForm.controls[dato].hasError('maxlength')) {
      return (result = 'El máximo de caracteres es 30');
    } else if (
      this.registerForm.controls[dato].hasError('email') &&
      dato === 'email'
    ) {
      return (result = 'Tiene que introducir un email valido');
    } else if (dato === 'confirmPass') {
      return (result = 'Las contraseñas no coinciden');
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

  signUp () {
    this._userService.RegisterUser(this.user).subscribe(
      response => {
        console.log(this.user);
        console.log('Registro correctamente');
        this.message = 'Registro correctamente ';
        // limpiamos el usuario
        this.user = new User(0, '', '', '', '', '', new Date(0), '', 0);
        this.registerForm.reset();
        this.router.navigate(['/login']);
        this.datosCorrectos = true;
      },
      error => {
        this.datosCorrectos = false;
        if (error.status === 400) {
          this.message = 'EL usuario ya existe';
          console.log(error.status);
          console.log(this.message);
        } else {
          console.log(error.status);
          this.message = 'Error al registrarse';
          console.log(this.message);
        }
      }
    );
  }
}
