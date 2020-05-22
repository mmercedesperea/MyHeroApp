import { Component, OnInit } from '@angular/core'
import { User } from '../../models/user'
import { UserService } from 'src/app/services/user.service'
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'
import { FormGroup, FormControl, AbstractControl } from '@angular/forms'
import { DateAdapter } from '@angular/material/core'
import { MatSnackBar } from '@angular/material'
import { MatDialog } from '@angular/material/dialog'
import { ChangePassDialogComponent } from '../modals/change-pass-dialog/change-pass-dialog.component'
import { DeleteUserDialogComponent } from '../modals/delete-user-dialog/delete-user-dialog.component'
import { AvatarDialogComponent } from '../modals/avatar-dialog/avatar-dialog.component'

/**
 * Component that bring user profile
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  /**
   * variable to store user identity
   */
  public identity
  /**
   * variable to save user in it
   */  
  public user: User
  /**
   * to add fromGoup
   */  
  public profileForm: FormGroup
  /**
   * variable to save message info
   */  
  public textError: any
 /**
   * variable to store info about followed users
   */  
  public FollowedUsers: User[] = []
 /**
   * variable to store info about followers
   */  
  public FollowersUsers: User[] = []

  /**
   * Constructor in which we inject user service,material module for snackBar, form builder, date adaptar and modals
   */
  constructor (
    private _snackBar: MatSnackBar,
    private _adapter: DateAdapter<any>,
    private formBuilder: FormBuilder,
    private _UserService: UserService,
    public dialog: MatDialog
  ) {
    this.user = new User(0, '', '', '', '', '', new Date(0), '', false)
  }

  /**
   * Start when de component init
   */
  ngOnInit () {
    this.identity = this._UserService.getIdentity()
    this.getInfoUser()
    this.getFollowersUsers()
    this.getFollowedUsers()

    this.profileForm = this.formBuilder.group({
      alias: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      name: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      surname: ['', [Validators.minLength(3), Validators.maxLength(30)]],
      dateOfBirth: [this._adapter.setLocale('us')],
      email: [
        '',
        [Validators.email, Validators.minLength(6), Validators.maxLength(30)]
      ]
    })
  }

  /**
   * Get info user
   */
  getInfoUser () {
    this._UserService.getUser(this.identity.id).subscribe(
      res => {
        console.log(res)
        this.user = res
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Get users followed by the user
   */
  getFollowedUsers () {
    this._UserService.getFollowUsers(this.identity.id).subscribe(
      res => {
        console.log(res)
        this.FollowedUsers = res
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Get users followers
   */
  getFollowersUsers () {
    this._UserService.getFollowersUsers(this.identity.id).subscribe(
      res => {
        console.log(res)
        this.FollowersUsers = res
      },
      error => {
        console.log(error)
      }
    )
  }

 /**
   * function to control error messages
   * @param {string} dato
   * @returns message
   */
  getErrorMessage (dato) {
    var result: string
    if (this.profileForm.controls[dato].hasError('minlength')) {
      if (dato === 'email') {
        return (result = 'You must enter at least 6 characters')
      } else {
        return (result = 'You must enter at least 3 characters')
      }
    } else if (this.profileForm.controls[dato].hasError('maxlength')) {
      return (result = 'The maximum of characters is 30')
    } else if (
      this.profileForm.controls[dato].hasError('email') &&
      dato === 'email'
    ) {
      return (result = 'You have to enter a valid email')
    } else {
      return (result = '')
    }
  }

  /**
   * submit form function
   */
  submit () {
    this._UserService.updateUser(this.identity.id, this.user).subscribe(
      res => {
        console.log(res)
        this.openSnackBar('YOUR PROFILE HAS BEEN UPDATED', 'Close')
      },
      err => console.error(err)
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

  /**
   * function for open modal to change pass
   */
  changePassDialog (): void {
    const dialogRef = this.dialog.open(ChangePassDialogComponent, {
      data: {
        userId: this.identity.id,
        alias: this.identity.alias,
        email: this.identity.email
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
    })
  }

  /**
   * function for open modal to delete user
   */
  deleteUserDialog (): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: {
        userId: this.identity.id,
        alias: this.identity.alias,
        email: this.identity.email
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
    })
  }

  /**
   * function for open modal to change avatar
   */
  avatarDialog (): void {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      data: {
        userId: this.identity.id,
        userPhoto: this.user.photo
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      this.getInfoUser()
    })
  }
}
