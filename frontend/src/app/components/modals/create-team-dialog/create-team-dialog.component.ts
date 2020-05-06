import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder } from '@angular/forms'
import { Validators } from '@angular/forms'
import { FormGroup, FormControl, AbstractControl } from '@angular/forms'
import { MatSnackBar } from '@angular/material';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-create-team-dialog',
  templateUrl: './create-team-dialog.component.html',
  styleUrls: ['./create-team-dialog.component.scss']
})
export class CreateTeamDialogComponent implements OnInit {
  public teamForm : FormGroup;
  public message: string;
  public correctdata: boolean;

  constructor( public dialogRef: MatDialogRef<CreateTeamDialogComponent>,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _TeamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.teamForm = this.formBuilder.group({
      teamName: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(300)]
      ]
    });
  }


  getErrorMessage(dato) {
    var result: string;
    if (this.teamForm.controls[dato].hasError('required')) {
      return (result = 'This information is required');
    } else if (this.teamForm.controls[dato].hasError('minlength')) {
      return (result = 'You must enter at least 6 characters');
    } else if (this.teamForm.controls[dato].hasError('maxlength')) {
      return (result = 'The maximum of characters is 300');
    } else {
      return (result = '');
    }
  }

  submit(teamForm) {
    var data = { idUsu: this.data.idUsu, teamName: teamForm.value.teamName}; 
    console.log(data)
    this._TeamService.createTeam(data).subscribe(
      res => {
        console.log(res)
        this.openSnackBar('YOUR TEAM HAS BEEN CREATE', 'Close')
        this.correctdata = true;
        this.dialogRef.close("Close modal!");
      },
      err => {
        this.correctdata = false;
        console.log(err.status);
        this.message = 'Error creating your Team';
        console.log(this.message);

      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
      panelClass: ['blue-snackbar']
    })
  }

  

}
