import { Component, OnInit, Inject } from '@angular/core'
import { TeamService } from 'src/app/services/team.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Team } from 'src/app/models/team'

/**
 * Component for select a team
 */
@Component({
  selector: 'app-select-team-dialog',
  templateUrl: './select-team-dialog.component.html',
  styleUrls: ['./select-team-dialog.component.scss']
})

export class SelectTeamDialogComponent implements OnInit {
  /**
   * variable to store teams
   */
  public teams: Team[]
  /**
   * variable to store teams from sessons
   */
  public sessonTeam: Team
  /**
   * variable to  store team selec id
   */
  public TeamSelectId: number = 0

  /**
   * Constructor in which we inject our services and diferents elements
   */
  constructor (
    private _TeamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SelectTeamDialogComponent>
  ) {
    this.sessonTeam = new Team(0, 0, '', '', '', '', '', '')
  }

  /**
   * Start when de component init
   */
  ngOnInit () {}

  /**
   * function get a team by name
   * @param {string} teamName
   */
  getTeamByName (teamName) {
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

  /**
   * function save idteam
   * @param {number} idTeam
   */
  selectTeam (idTeam) {
    this.TeamSelectId = idTeam
  }

  /**
   * function save team in the storage
   * @param {number} idUsu
   */
  async saveTeamStorage (idUsu) {
    this._TeamService.getTeamInfo(idUsu).subscribe(
      res => {
        this.sessonTeam = res
        console.log(res)
        if (this.data.position === 1) {
          console.log(this.sessonTeam)
          sessionStorage.setItem('Team1', JSON.stringify(this.sessonTeam))
          console.log(JSON.parse(sessionStorage.getItem('Team1')))
        } else {
          sessionStorage.setItem('Team2', JSON.stringify(this.sessonTeam))
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * To close modal
   */
  onNoClick (): void {
    this.dialogRef.close()
  }
}
