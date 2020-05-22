import { Component, OnInit } from '@angular/core'
import { HeroService } from 'src/app/services/hero.service'
import { UserHeroService } from 'src/app/services/user-hero.service'
import { TeamService } from 'src/app/services/team.service'
import { Team } from 'src/app/models/team'
import { Hero } from 'src/app/models/hero'
import { UserService } from 'src/app/services/user.service'
import { MatDialog } from '@angular/material'
import { TeamDialogComponent } from '../modals/team-dialog/team-dialog.component'
import { Observable } from 'rxjs'
import { GlobalVariableService } from 'src/app/services/global-variable.service'
@Component({
  selector: 'app-my-heroes',
  templateUrl: './my-heroes.component.html',
  styleUrls: ['./my-heroes.component.scss']
})

/**
 * Component that bring user heroes followed, favorites and user team
 */
export class MyHeroesComponent implements OnInit {
  public identity
  public myTeamInfo: Team
  public heroesFol: Hero[]
  public heroesFav: Hero[]
  public idUser: number = 0
  public newM: number = 0
  public type: boolean = true

  /**
   * Constructor in which we inject user service, modal material moduler,hero service,team service and global variables services
   */
  constructor (
    public dialog: MatDialog,
    private _userService: UserService,
    private _UserHero: UserHeroService,
    private _Team: TeamService,
    private GlobalV: GlobalVariableService
  ) {
    this.myTeamInfo = new Team(0, 0, '', '', '', '', '', '')
  }

  /**
   * Start when de component init
   */
  ngOnInit () {
    this.getUsu()
    this.getTeamUsu()
    this.following()
    this.favorites()
    this.GlobalV.countTeamMembers = 0
  }

  /**
   * Get info user
   */
  getUsu () {
    this.identity = this._userService.getIdentity()
    this.idUser = this.identity.id
  }

  /**
   * Get Team info
   */
  getTeamUsu () {
    this._Team.getTeamInfo(this.identity.id).subscribe(
      res => {
        console.log(res)
        this.myTeamInfo = res
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Add member to the team
   * @param {number} idHero
   */
  addMember (idHero) {
    var data = { member: this.GlobalV.memberTeamNUll, codHero: idHero }
    this._Team.addMember(this.myTeamInfo.idTeam, data).subscribe(
      res => {
        this.getTeamUsu()
        this.GlobalV.countTeamMembers++
        this.newM = this.newM + 1
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * hero`s following
   */
  following () {
    this._UserHero.allHerosFoll(this.identity.id).subscribe(res => {
      this.heroesFol = res
    }),
      error => {
        console.log(error)
      }
  }

  /**
   * hero`s favorites
   */
  favorites () {
    this._UserHero.allHerosFav(this.identity.id).subscribe(res => {
      this.heroesFav = res
    }),
      error => {
        console.log(error)
      }
  }

  /**
   * function for open modal to create a team
   *  @param {string} statusF
   */
  createTeam (statusF): void {
    const dialogRef = this.dialog.open(TeamDialogComponent, {
      data: {
        idUsu: this.identity.id,
        status: statusF,
        teamInfo: this.myTeamInfo
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      this.idUser = this.identity.id
    })
  }
}
