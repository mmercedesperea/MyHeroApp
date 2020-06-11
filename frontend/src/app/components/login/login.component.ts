import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'
import { FormGroup, FormControl, AbstractControl } from '@angular/forms'
import { User } from '../../models/user'
import { UserService } from 'src/app/services/user.service'
import { Router } from '@angular/router'

/**
 * Component for login user
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  /**
   * Login form for FormGroup
   */
  public LoginForm: FormGroup
  /**
   * Variable to save user in it
   */
  public user: User
  /**
   * variable for form message
   */
  public message: string
  /**
   * variable to show or hide message if there is an error in login
   */
  public datosCorrectos: boolean
  /**
   * userLog variable
   */
  public UserLog
  /**
   * to save the token
   */
  public token


  public hide = true;

  /**
   * Constructor in which we inject our services and different elements
   */
  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private router: Router
  ) {
    this.user = new User(0, '', '', '', '', '', new Date(0), '', false)
  }

  /**
   * Start when the component inits
   */
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
    })
  }

  /**
   * function to control error messages
   * @param {string} dato
   * @returns message
   */
  getErrorMessage(dato) {
    var result: string
    if (this.LoginForm.controls[dato].hasError('required')) {
      return (result = 'This information is required')
    } else if (this.LoginForm.controls[dato].hasError('minlength')) {
      return (result = 'You must enter at least 6 characters')
    } else if (this.LoginForm.controls[dato].hasError('maxlength')) {
      return (result = 'The maximum of characters is 30')
    } else if (
      this.LoginForm.controls[dato].hasError('email') &&
      dato === 'email'
    ) {
      return (result = 'You have to enter a valid email')
    } else {
      return (result = '')
    }
  }

  /**
   * SignIn function
   */
  signIn() {
    this._userService.LoginUser(this.user).subscribe(
      res => {
        this.UserLog = res['user']
        localStorage.setItem('User', JSON.stringify(this.UserLog))

        // save the user photo
        localStorage.setItem('UserPhoto', this.UserLog.photo)

        console.log('Successfully logged')
        this.router.navigate(['/'])
        this.token = res['token']
        localStorage.setItem('token', this.token)
        console.log(this.token)
      },
      error => {
        this.datosCorrectos = false

        var element = document.getElementById('ErroInfo');
        element.classList.remove('d-none');
        setTimeout('document.getElementById("ErroInfo").classList.add("d-none")', 3500);


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
