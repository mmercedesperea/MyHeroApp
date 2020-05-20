import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team.service';
import { MatDialog } from '@angular/material';
import { SelectTeamDialogComponent } from '../../modals/select-team-dialog/select-team-dialog.component';
// import { FightDialogComponent } from '../../modals/fight-dialog/fight-dialog.component';

@Component({
  selector: 'app-fight-team',
  templateUrl: './fight-team.component.html',
  styleUrls: ['./fight-team.component.scss']
})
export class FightTeamComponent implements OnInit {
  public team: Team;
  public sessonTeam1: Team;
  public sessonTeam2: Team;

  constructor(private _TeamService: TeamService,public dialog: MatDialog) { }

  ngOnInit() {
    this.clearHerosSession();
    this.team = new Team(0, 0, '', '', '', '', '', '')
    this.sessonTeam1 = new Team(0, 0, '', '', '', '', '', '')
    this.sessonTeam2 = new Team(0, 0, '', '', '', '', '', '')
console.log(this.sessonTeam2)
  }

  clearHerosSession() {
    sessionStorage.clear();
  }

  getSessionTeams() {
    this.sessonTeam1 = JSON.parse(sessionStorage.getItem('Team1'));
    this.sessonTeam2 = JSON.parse(sessionStorage.getItem('Team2'));
  }

  getTeamWinner() {
    this._TeamService.getteamWinner(this.sessonTeam1.idTeam, this.sessonTeam2.idTeam).subscribe(res => {
      this.team = res;
    }, error => {
      console.log(error)
    })
  }

  selectTeamDialog(position) {
    const dialogRef = this.dialog.open(SelectTeamDialogComponent, {
      // Le pasamos los datos que queremos
      data: {
        position: position
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      this.getSessionTeams()
    });
  }

}
