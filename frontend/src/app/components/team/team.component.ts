import { Component, OnInit, Input, SimpleChanges, OnChanges, DoCheck } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { HeroService } from 'src/app/services/hero.service';
import { Team } from 'src/app/models/team';
import { Hero } from 'src/app/models/hero';
import { GlobalVariableService } from 'src/app/services/global-variable.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  public myTeamInfo: Team
  public TeamHeroes: Hero[] = []
  public maxMembers: boolean = false
  public countM: boolean = false;
  // decorador que va a recibir la id, con el input definimos que aucnaod se llame a este componento se le tiene que mandar una id
  @Input() idUsu: number = 0;
  @Input() newM;
  @Input() type;

  constructor(private _TeamService: TeamService,
    private _heroService: HeroService,
    private GlobalV: GlobalVariableService) { }

  ngOnInit() {
    this.getTeamUsu()
  }

  ngOnChanges() {
    console.log("ngonchange")
    this.getTeamUsu()
  }

  // obtenemos la informacion del equipo
  getTeamUsu() {
    this._TeamService.getTeamInfo(this.idUsu).subscribe(
      res => {
        this.myTeamInfo = res
        // para saber si ya se han countM los miembros del equipo
        if (this.countM === false) {
          this.countMembers()
        }
        this.countM = true
        if (this.myTeamInfo) {
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

  //obtenemos los heroes y los metemos en el array de equipo
  teamUsugetHeroes(member, position) {
    this._heroService.getHeroById(member).subscribe(res => {
      this.TeamHeroes[position] = (res)
    })
  }

  deleteMember(number) {
    var memberSelect = `member_${number}`;
    // console.log(memberSelect)
    var data = { member: memberSelect };
    this._TeamService.deleteMember(this.myTeamInfo.idTeam, data).subscribe(
      res => {
        this.getTeamUsu()
        this.GlobalV.countTeamMembers--;
        // this.GlobalV.memberTeamNUll = this.getMemberNull()
      },
      error => {
        console.log(error)
      }
    )
  }
  // contamos los miembros que hay en el club 
  countMembers() {
    for (var i = 1; i < 6; i++) {
      if (this.myTeamInfo[`member_${i}`] != null) {
        this.GlobalV.countTeamMembers++;
        console.log(this.GlobalV.countTeamMembers)
      }
    }
  }

  getMemberNull() {
    // comprobamos el hueco de member que esta vacio y lo almacenamos
    for (var i = 1; i < 6; i++) {
      if (this.myTeamInfo[`member_${i}`] == null) {
        return `member_${i}`
      }
    }
  }

}
