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
  public myTeam: any = ''
  public myTeamInfo: Team
  public TeamHeroes: Hero[] = []
  public maxMembers: boolean = false
  public contado: boolean = false;
  public countM: number = 0;
  // decorador que va a recibir la id, con el input definimos que aucnaod se llame a este componento se le tiene que mandar una id
  @Input() idUsu: number = 0;
  @Input() newM;
  @Input() type;

  constructor(private _TeamService: TeamService,
    private _heroService: HeroService,
    private GlobalV: GlobalVariableService) { }

  ngOnInit() {
    this.getTeamUsu()
    // this.countMembers()

  }

  //   ngDoCheck(): void {
  //     console.log("do check")
  //     // console.log(this. GlobalV.countTeamMembers)
  // // this.reloadTeam()
  //   // Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
  //   // Add 'implements DoCheck' to the class.
  //   // this. idUsu;
  //   // this.GlobalV.countTeamMembers
  //   // this.getTeamUsu()
  //   // this.getTeamUsu()
  //   // this.reloadTeam(this.newM.currentValue)
  //   }

  // ngOnChanges(changes: SimpleChanges) {
  ngOnChanges() {

    //   //   // this.countMembers()
    //   //   console.log(changes.idUsu.currentValue)
    //     this.reloadTeam(changes.newM.currentValue)

    //   //   // this.getTeamUsu()
    //   console.log(changes.newM.currentValue)
    console.log("ngonchange")
    this.getTeamUsu()
  }

  // obtenemos la informacion del equipo
  getTeamUsu() {
    this._TeamService.getTeamInfo(this.idUsu).subscribe(
      res => {
        // console.log(res)
        this.myTeamInfo = res
        // console.log(this.myTeamInfo)
        // si hay equipo buscamos los miembros y los añadimos
        if (this.contado === false) {
          this.countMembers()
        }
        this.contado = true

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

  // entity.member para el body
  deleteMember(number) {
    var memberSelect = `member_${number}`;
    // console.log(memberSelect)
    var data = { member: memberSelect };
    this._TeamService.deleteMember(this.myTeamInfo.idTeam, data).subscribe(
      res => {
        // this.checkTeamNumber(this.myTeamInfo.idTeam)
        // this.TeamHeroes = [];
        this.getTeamUsu()
        this.GlobalV.countTeamMembers--;
        this.GlobalV.memberTeamNUll = this.getMemberNull()
        // console.log(  this.GlobalV.countTeamMembers)
      },
      error => {
        console.log(error)
      }
    )
  }

  countMembers() {
    for (var i = 1; i < 6; i++) {
      // console.log("teaminfo")
      // console.log(this.myTeamInfo)
      if (this.myTeamInfo[`member_${i}`] != null) {
        this.GlobalV.countTeamMembers++;
        console.log(this.GlobalV.countTeamMembers)
      }
    }

  }

  reloadTeam() {
    // this.countM = members
    this.getTeamUsu()
  }


  getMemberNull() {
    // comprobamos el hueco de member que esta vacio y lo almacenamos
    for (var i = 1; i < 6; i++) {
      // console.log('valor del array'+this.myTeam[`member_${5}`] )
      if (this.myTeamInfo[`member_${i}`] == null) {
        return `member_${i}`
      }
    }
  }
  // countTeamMembers:number=0;

  //  // comprueba si ya estan todos los miembros
  //  checkTeamNumber(idTeam) {
  //   this. _TeamService.checkTeam(idTeam).subscribe(
  //     res => {
  //       // si devuelve true es que el maximo de miembros en el equipo esta completo
  //       this.maxMembers = res
  //       // console.log(this.maxMembers)
  //     },
  //     error => {
  //       console.log(error)
  //     }
  //   )
  // }



}
