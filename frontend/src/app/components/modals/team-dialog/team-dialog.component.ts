import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'
import { FormGroup, FormControl, AbstractControl } from '@angular/forms'
import { MatSnackBar } from '@angular/material'
import { TeamService } from 'src/app/services/team.service'

/**
 * Component for create or modify a team
 */
@Component({
  selector: 'app-create-team-dialog',
  templateUrl: './team-dialog.component.html',
  styleUrls: ['./team-dialog.component.scss']
})

export class TeamDialogComponent implements OnInit {
  /**
   * to add fromGoup
   */
  public teamForm: FormGroup
  /**
   * variable to save message info
   */  
  public message: string
   /**
   * variable to check if the function was ok
   */
  public correctdata: boolean

  /**
   * Constructor in which we inject our services and diferents elements
   */
  constructor (
    public dialogRef: MatDialogRef<TeamDialogComponent>,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _TeamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  /**
   * Start when de component init
   */
  ngOnInit () {
    this.teamForm = this.formBuilder.group({
      teamName: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(300)
        ]
      ]
    })
  }

  /**
   * function to control error messages
   * @param {string} dato
   * @returns message
   */
  getErrorMessage (dato) {
    var result: string
    if (this.teamForm.controls[dato].hasError('required')) {
      return (result = 'This information is required')
    } else if (this.teamForm.controls[dato].hasError('minlength')) {
      return (result = 'You must enter at least 6 characters')
    } else if (this.teamForm.controls[dato].hasError('maxlength')) {
      return (result = 'The maximum of characters is 300')
    } else {
      return (result = '')
    }
  }

  /**
   * function to submit form
   * @param {any} teamForm
   */
  submit (teamForm) {
    if (this.data.status === 'new') {
      var data = { idUsu: this.data.idUsu, teamName: teamForm.value.teamName }
      console.log(data)
      this._TeamService.createTeam(data).subscribe(
        res => {
          console.log(res)
          this.openSnackBar('YOUR TEAM HAS BEEN CREATE', 'Close')
          this.correctdata = true
          this.dialogRef.close('Close modal!')
        },
        err => {
          this.correctdata = false
          console.log(err.status)
          this.message = 'Error creating your Team'
          console.log(this.message)
        }
      )
    } else {
      var team = { teamName: teamForm.value.teamName }
      console.log(this.data.teamInfo.idTeam)
      this._TeamService.changeName(this.data.teamInfo.idTeam, team).subscribe(
        res => {
          console.log(res)
          this.openSnackBar('YOUR TEAM HAS BEEN UPDATE', 'Close')
          this.correctdata = true
          this.dialogRef.close('Close modal!')
        },
        err => {
          this.correctdata = false
          console.log(err.status)
          this.message = 'Error modifying your Team'
          console.log(this.message)
        }
      )
    }
  }

  /**
   * To delete a team
   */
  deleteTeam () {
    this._TeamService.delete(this.data.teamInfo.idTeam).subscribe(
      res => {
        console.log(res)
        this.openSnackBar('YOUR TEAM HAS BEEN DELETE', 'Close')
        this.correctdata = true
        this.dialogRef.close('Close modal!')
      },
      err => {
        this.correctdata = false
        console.log(err.status)
        this.message = 'Error deleting your Team'
        console.log(this.message)
      }
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
}
