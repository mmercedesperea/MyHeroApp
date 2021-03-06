import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'
import { FormGroup, FormControl, AbstractControl } from '@angular/forms'
import { User } from '../../models/user'
import { UserService } from 'src/app/services/user.service'
import { Router } from '@angular/router'

/**
 * Component to register users
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  /**
  * to add FormGroup
  */
  public registerForm: FormGroup
  /**
   * variable to save user in it
   */
  public user: User
  /**
   * variable to save message info about register
   */
  public message: string
  /**
   * variable to check if the register works
   */
  public datosCorrectos: boolean

  public hide = true;

  /**
   * Constructor in which we inject hero service, formBuilder and router service
   */
  constructor(
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private router: Router
  ) {
    this.user = new User(0, '', '', '', '', '', null, '', false)
  }

  /**
   * Start when the component inits
   */
  ngOnInit() {
    this.datosCorrectos = true
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
    })
  }

  /**
   * function to control error messages
   * @param {string} dato
   * @returns message
   */
  getErrorMessage(dato): string {
    var result: string
    if (this.registerForm.controls[dato].hasError('required')) {
      return (result = 'This information is required')
    } else if (this.registerForm.controls[dato].hasError('minlength')) {
      if (dato === 'alias') {
        return (result = 'You must enter at least 3 characters')
      } else {
        return (result = 'You must enter at least 6 characters')
      }
    } else if (this.registerForm.controls[dato].hasError('maxlength')) {
      return (result = 'The maximum of characters is 30')
    } else if (
      this.registerForm.controls[dato].hasError('email') &&
      dato === 'email'
    ) {
      return (result = 'You have to enter a valid email')
    } else if (dato === 'confirmPass') {
      return (result = 'Passwords do not match')
    } else {
      return (result = '')
    }
  }

  /**
   * Validation to verify that the passwords match
   * @param {any} control
   * @returns true or null
   */
  passwordsShouldMatch(control: AbstractControl): any {
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
   * SignUp function
   */
  signUp() {
    this._userService.RegisterUser(this.user).subscribe(
      response => {
        console.log('Register correctly')
        this.message = 'Register correctly'
        // Clean the user
        this.user = new User(0, '', '', '', '', '', new Date(0), '', false)
        this.registerForm.reset()
        this.router.navigate(['/login'])
        this.datosCorrectos = true
      },
      error => {
        this.datosCorrectos = false

        var element = document.getElementById('ErroInfo');
        element.classList.remove('d-none');
        setTimeout('document.getElementById("ErroInfo").classList.add("d-none")', 3500);

        if (error.status === 400) {
          this.message = 'User already exists'
          console.log(error.status)
          console.log(this.message)
        } else {
          console.log(error.status)
          this.message = 'Registration failed'
          console.log(this.message)
        }
      }
    )
  }
}
