import { Component, OnInit, Inject } from '@angular/core'
import { TeamService } from 'src/app/services/team.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Team } from 'src/app/models/team'

@Component({
  selector: 'app-select-team-dialog',
  templateUrl: './select-team-dialog.component.html',
  styleUrls: ['./select-team-dialog.component.scss']
})
export class SelectTeamDialogComponent implements OnInit {
  public teams: Team[]
  public sessonTeam: Team
  public TeamSelectId: number = 0

  constructor(
    private _TeamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SelectTeamDialogComponent>
  ) {
    this.sessonTeam = new Team(0, 0, '', '', '', '', '', '')
  }

  ngOnInit() { }

  getTeamByName(teamName) {
    this._TeamService.searchTeam(teamName).subscribe(
      res => {
        // console.log(res.idHero)
        this.teams = res
        console.log(JSON.stringify(this.teams, null, 2))
        // console.log(this.hero);
      },
      error => {
        console.log(error)
      }
    )
  }

  selectTeam(idTeam) {
    this.TeamSelectId = idTeam
  }

  async saveTeamStorage(idUsu) {
    // await this.getHero(id)
    this._TeamService.getTeamInfo(idUsu).subscribe(
      res => {
        this.sessonTeam = res
        console.log(res)
        if (this.data.position === 1) {
          console.log(this.sessonTeam)
          sessionStorage.setItem('Team1', JSON.stringify(this.sessonTeam))
         console.log( JSON.parse(sessionStorage.getItem('Team1')));

       
        } else {
          sessionStorage.setItem('Team2', JSON.stringify(this.sessonTeam))
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
}
