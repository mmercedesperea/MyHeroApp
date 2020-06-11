import { Component, OnInit } from '@angular/core'
import { Team } from 'src/app/models/team'
import { TeamService } from 'src/app/services/team.service'
import { MatDialog } from '@angular/material'
import { SelectTeamDialogComponent } from '../../modals/select-team-dialog/select-team-dialog.component'

/**
 * Component for Fight team
 */
@Component({
  selector: 'app-fight-team',
  templateUrl: './fight-team.component.html',
  styleUrls: ['./fight-team.component.scss']
})

export class FightTeamComponent implements OnInit {
  /**
   * variable to show heroes in team
   */
  public showName: boolean = true;

  /**
   * variable to store team position
   */
  public TeamHeroes: number[] = [1, 2, 3, 4, 5];
  /**
   * variable to store the winner team
   */
  public team: any;
  /**
   * variable to store the team in local storage
   */
  public sessonTeam1: Team
  /**
   * variable to store the team in local storage
   */
  public sessonTeam2: Team

  /**
   * Constructor in which we inject our services and different elements
   */
  constructor(private _TeamService: TeamService, public dialog: MatDialog) { }


  /**
   * Start when the component inits
   */
  ngOnInit() {
    this.clearHerosSession()
    this.team = [];
    this.sessonTeam1 = new Team(0, 0, '', '', '', '', '', '')
    this.sessonTeam2 = new Team(0, 0, '', '', '', '', '', '')
    console.log(this.sessonTeam2)
  }

  /**
   * clear local storage
   */
  clearHerosSession() {
    sessionStorage.clear()
  }

  /**
   * Play audio
   */
  playAudio() {
    let audio = <HTMLAudioElement>document.getElementById("myAudio");
    audio.play();
  }

  /**
   * Get teams in session storage
   */
  getSessionTeams() {
    this.sessonTeam1 = JSON.parse(sessionStorage.getItem('Team1'))
    this.sessonTeam2 = JSON.parse(sessionStorage.getItem('Team2'))
  }

  /**
   * Get winner team
   */
  getTeamWinner() {
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
   * Open modal to choose team
   * @param {number} position
   */
  selectTeamDialog(position) {
    const dialogRef = this.dialog.open(SelectTeamDialogComponent, {
      data: {
        position: position
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getSessionTeams()
    })
  }
}
