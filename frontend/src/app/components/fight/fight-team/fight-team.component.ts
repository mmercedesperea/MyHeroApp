import { Component, OnInit } from '@angular/core'
import { Team } from 'src/app/models/team'
import { TeamService } from 'src/app/services/team.service'
import { MatDialog } from '@angular/material'
import { SelectTeamDialogComponent } from '../../modals/select-team-dialog/select-team-dialog.component'

@Component({
  selector: 'app-fight-team',
  templateUrl: './fight-team.component.html',
  styleUrls: ['./fight-team.component.scss']
})

/**
 * Component for fight team
 */
export class FightTeamComponent implements OnInit {
  public team: Team
  public sessonTeam1: Team
  public sessonTeam2: Team

  /**
   * Constructor in which we inject our services and diferents elements
   */
  constructor (private _TeamService: TeamService, public dialog: MatDialog) {}

  /**
   * Start when de component init
   */
  ngOnInit () {
    this.clearHerosSession()
    this.team = new Team(0, 0, '', '', '', '', '', '')
    this.sessonTeam1 = new Team(0, 0, '', '', '', '', '', '')
    this.sessonTeam2 = new Team(0, 0, '', '', '', '', '', '')
    console.log(this.sessonTeam2)
  }

  /**
   * clear local storage
   */
  clearHerosSession () {
    sessionStorage.clear()
  }

  /**
   * Get teams in session storage
   */
  getSessionTeams () {
    this.sessonTeam1 = JSON.parse(sessionStorage.getItem('Team1'))
    this.sessonTeam2 = JSON.parse(sessionStorage.getItem('Team2'))
  }

  /**
   * Get team winner
   */
  getTeamWinner () {
    this._TeamService
      .getteamWinner(this.sessonTeam1.idTeam, this.sessonTeam2.idTeam)
      .subscribe(
        res => {
          this.team = res
        },
        error => {
          console.log(error)
        }
      )
  }

  /**
   * Open modal for comment hero
   * @param {number} position
   */
  selectTeamDialog (position) {
    const dialogRef = this.dialog.open(SelectTeamDialogComponent, {
      data: {
        position: position
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      this.getSessionTeams()
    })
  }
}
