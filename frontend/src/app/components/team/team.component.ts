import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
  DoCheck
} from '@angular/core'
import { TeamService } from 'src/app/services/team.service'
import { HeroService } from 'src/app/services/hero.service'
import { Team } from 'src/app/models/team'
import { Hero } from 'src/app/models/hero'
import { GlobalVariableService } from 'src/app/services/global-variable.service'

/**
 * Component that brings team info and details to export
 */
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})

export class TeamComponent implements OnInit {
  /**
   * variable to save the team info
   */
  public myTeamInfo: Team
  /**
   * variable to save the team members
   */
  public TeamHeroes: Hero[] = []
  /**
   * Variable to count team members
   */
  public countM: boolean = false

  public i: number = 0;
  // Decorator that will receive the id, with the input we define when this component is called, and an id must be sent to it
  @Input() idUsu: number = 0
  @Input() newM
  @Input() type
  @Input() showName

  /**
   * Constructor in which we inject team service, hero service and our Global variables
   */
  constructor(
    private _TeamService: TeamService,
    private _heroService: HeroService,
    private GlobalV: GlobalVariableService
  ) { }

  /**
   * Start when the component inits
   */
  ngOnInit() {
    this.getTeamUsu()
  }
  /**
   * Activates when it detects any change
   */
  ngOnChanges() {
    this.getTeamUsu()
  }

  /**
   * Get the team information
   */
  getTeamUsu(): void {
    this._TeamService.getTeamInfo(this.idUsu).subscribe(
      res => {
        this.myTeamInfo = res
        if (this.myTeamInfo) {
          // para saber si ya se han countM los miembros del equipo
          if (this.countM === false) {
            this.countMembers()
          }
          this.countM = true
          this.GlobalV.memberTeamNUll = this.getMemberNull()
          this.teamUsugetHeroes(this.myTeamInfo.member_1, 0)
          this.teamUsugetHeroes(this.myTeamInfo.member_2, 1)
          this.teamUsugetHeroes(this.myTeamInfo.member_3, 2)
          this.teamUsugetHeroes(this.myTeamInfo.member_4, 3)
          this.teamUsugetHeroes(this.myTeamInfo.member_5, 4)
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Get the heroes and put them in the team array
   * @param {string} member
   * @param {number} position
   */
  teamUsugetHeroes(member, position): void {
    this._heroService.getHeroById(member).subscribe(res => {
      this.TeamHeroes[position] = res
    })
  }

  /**
   * Delete a team member
   * @param {number} number
   */
  deleteMember(number): void {
    var memberSelect = `member_${number}`
    var data = { member: memberSelect }
    this._TeamService.deleteMember(this.myTeamInfo.idTeam, data).subscribe(
      res => {
        this.getTeamUsu()
        this.GlobalV.countTeamMembers--
      },
      error => {
        console.log(error)
      }
    )
  }

  /**
   * Count the members in the club
   */
  countMembers(): void {
    for (var i = 1; i < 6; i++) {
      if (this.myTeamInfo[`member_${i}`] != null) {
        this.GlobalV.countTeamMembers++
      }
    }
  }

  /**
   * Get the member that is null
   *  @returns member
   */
  getMemberNull(): any {
    // we check the member slot that is empty and store it
    for (var i = 1; i < 6; i++) {
      if (this.myTeamInfo[`member_${i}`] == null) {
        return `member_${i}`
      }
    }
  }
}
