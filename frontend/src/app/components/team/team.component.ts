import { Component, OnInit, Input } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { HeroService } from 'src/app/services/hero.service';
import { Team } from 'src/app/models/team';
import { Hero } from 'src/app/models/hero';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  public myTeam: any = ''
  public myTeamInfo: Team
  public TeamHeroes: Hero[] = []
  public maxMembers: boolean = false

  // decorador que va a recibir la id, con el input definimos que aucnaod se llame a este componento se le tiene que mandar una id
  @Input() idUsu: number = 0;

  constructor(private _TeamService: TeamService,
    private _heroService: HeroService, ) { }

  ngOnInit() {
    this.getTeamUsu()
  }

  // obtenemos la informacion del equipo
  getTeamUsu() {
    this._TeamService.getTeamInfo(this.idUsu).subscribe(
      res => {
        console.log(res)
        this.myTeamInfo = res
        // si hay equipo buscamos los miembros y los añadimos
        if (this.myTeamInfo) {
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





}
