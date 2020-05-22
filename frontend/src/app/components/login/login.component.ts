import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'
import { FormGroup, FormControl, AbstractControl } from '@angular/forms'
import { User } from '../../models/user'
import { UserService } from 'src/app/services/user.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // variables
  public LoginForm: FormGroup
  public user: User
  public message: string
  public datosCorrectos: boolean;

  public UserLog;
  public token;

  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private router: Router
  ) {
    this.user = new User(0, '', '', '', '', '', new Date(0), '', false)
  }

  ngOnInit() {
    this.datosCorrectos = true
    this.LoginForm = this.formBuilder.group({
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
      ]
    });

    console.log(this._userService.getIdentity());
    console.log(this._userService.getToken());

  }

  getErrorMessage(dato) {
    var result: string
    if (this.LoginForm.controls[dato].hasError('required')) {
      return (result = 'This information is required');
    } else if (this.LoginForm.controls[dato].hasError('minlength')) {
      return (result = 'You must enter at least 6 characters');
    } else if (this.LoginForm.controls[dato].hasError('maxlength')) {
      return (result = 'The maximum of characters is 30');
    } else if (
      this.LoginForm.controls[dato].hasError('email') &&
      dato === 'email'
    ) {
      return (result = 'You have to enter a valid email')
    } else {
      return (result = '');
    }
  }

  signIn() {
    this._userService.LoginUser(this.user).subscribe(
      res => {
        // se coge el elemento user que nos trae la response
        this.UserLog = res['user'];
        console.log(this.UserLog);

        // almacenamos la informacion del usuario en el local storage, lo pasamos a string ya que el local storage solo deja guardar string o numeros
        localStorage.setItem('User',JSON.stringify(this.UserLog));
        // console.log(this.UserLog.token);
        // console.log(this.UserLog.user);
        // console.log(this.user)
        console.log('Successfully logged')
        // this.message = 'Logeado correctamente '
        // // limpiamos el usuario
        // this.user = new User(0, '', '', '', '', '', new Date(0), '', 0)
        // this.LoginForm.reset()
        this.router.navigate(['/']);
        // this.datosCorrectos = true

        this.token = res['token'];
        // guardamos el token en el localStorage
        localStorage.setItem('token',this.token);

        console.log(this.token)
        //obtener el token
        // this._userService.LoginUser(this.user, 'true').subscribe(
        //   response => {
        //     this.token = response;
        //     if (this.token.length <= 0) {
        //       console.log('EL token no se ha generado correctamente')
        //     } else {
        //       console.log(this.token);
        //     }
        //   }
        // )

      },
      error => {
        this.datosCorrectos = false
        if (error.status === 400) {
          this.message = 'The password is not correct'
          console.log(error.status)
          console.log(this.message)
        } else if (error.status === 402) {
          this.message = 'Username does not exist'
          console.log(error.status)
          console.log(this.message)
        } else {
        console.log(error.status)
        this.message = 'Login failed'
        console.log(this.message)
        }
      }
    )
  }
}

