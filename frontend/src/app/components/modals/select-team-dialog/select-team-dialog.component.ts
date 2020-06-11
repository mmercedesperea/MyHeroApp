import { Component, OnInit, Inject } from '@angular/core'
import { TeamService } from 'src/app/services/team.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { Team } from 'src/app/models/team'

/**
 * Component to select a team
 */
@Component({
  selector: 'app-select-team-dialog',
  templateUrl: './select-team-dialog.component.html',
  styleUrls: ['./select-team-dialog.component.scss']
})

export class SelectTeamDialogComponent implements OnInit {
  activeState: number;
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
   * Constructor in which we inject our services and different elements
   */
  constructor(
    private _TeamService: TeamService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SelectTeamDialogComponent>
  ) {
    this.sessonTeam = new Team(0, 0, '', '', '', '', '', '')
  }

  /**
   * Start when the component inits
   */
  ngOnInit() { }

  /**
   * function get a team by name
   * @param {string} teamName
   */
  getTeamByName(teamName) {
    this._TeamService.searchTeam(teamName).subscribe(
      res => {
        // console.log(res.idHero)
        this.teams = res
        // console.log(this.hero);
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * function to save idteam
   * @param {number} idTeam
   */
  selectTeam(idTeam) {
    this.TeamSelectId = idTeam
    this.activeState = idTeam
  }

  /**
   * function to save team in the storage
   * @param {number} idUsu
   */
  async saveTeamStorage() {
    this._TeamService.getTeamInfo(this.TeamSelectId).subscribe(
      res => {
        this.sessonTeam = res
        if (this.data.position === 1) {
          sessionStorage.setItem('Team1', JSON.stringify(this.sessonTeam))
        } else {
          sessionStorage.setItem('Team2', JSON.stringify(this.sessonTeam))
        }
        this.dialogRef.close();
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * To close modal
   */
  onNoClick(): void {
    this.dialogRef.close()
  }
}
