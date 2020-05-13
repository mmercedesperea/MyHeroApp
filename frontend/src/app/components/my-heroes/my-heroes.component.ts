import { Component, OnInit } from '@angular/core'
import { HeroService } from 'src/app/services/hero.service'
import { UserHeroService } from 'src/app/services/user-hero.service'
import { TeamService } from 'src/app/services/team.service'
import { Team } from 'src/app/models/team'
import { Hero } from 'src/app/models/hero'
import { UserService } from 'src/app/services/user.service'
import { MatDialog } from '@angular/material'
import { TeamDialogComponent } from '../modals/team-dialog/team-dialog.component'
import { Observable } from 'rxjs';
import { GlobalVariableService } from 'src/app/services/global-variable.service'
@Component({
  selector: 'app-my-heroes',
  templateUrl: './my-heroes.component.html',
  styleUrls: ['./my-heroes.component.scss']
})
export class MyHeroesComponent implements OnInit {
  public identity
  public myTeam: any = ''
  public myTeamInfo: Team
  public heroesFol: Hero[]
  public heroesFav: Hero[]
  public maxMembers: boolean = false
  public idTeam: number = 0
  public memberNUll: string = ''
  public teamName: string = ''
  public totalPoint: number = 0
  public TeamHeroes: Hero[] = []
  public heroLoad: Hero;
  public idUser: number = 0;
  public retultado: any;
  public members: number = 0;
  public newM: number = 0;
  public type: boolean = true;

  constructor(
    public dialog: MatDialog,
    private _userService: UserService,
    private _heroService: HeroService,
    private _UserHero: UserHeroService,
    private _Team: TeamService,
    private GlobalV: GlobalVariableService
  ) {
    this.myTeamInfo = new Team(0, 0, '', '', '', '', '', '')
    this.heroLoad = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', null)
    this.TeamHeroes = [];

  }

  ngOnInit() {
    this.getUsu()
    this.getTeamUsu()
    this.following()
    this.favorites()
    this.GlobalV.countTeamMembers = 0;
  }

  getUsu() {
    this.identity = this._userService.getIdentity()
    this.idUser = this.identity.id
  }

  getTeamUsu() {
    //obtenemos la informacion basica del team basico del usuario
    this._Team.getTeamInfo(this.identity.id).subscribe(
      res => {
        console.log(res)
        this.myTeamInfo = res
        if (this.myTeamInfo) {
          // this.countMembers()
          //   this.checkTeamNumber(this.myTeamInfo.idTeam)
          //   this.teamUsugetHeroes(this.myTeamInfo.member_1, 0)
          //   this.teamUsugetHeroes(this.myTeamInfo.member_2, 1)
          //   this.teamUsugetHeroes(this.myTeamInfo.member_3, 2)
          //   this.teamUsugetHeroes(this.myTeamInfo.member_4, 3)
          //   this.teamUsugetHeroes(this.myTeamInfo.member_5, 4)
        }
      },
      error => {
        console.log(error)
      }
    )
  }
  // //obtenemos los heroes y los metemos en el array de equipo
  //   teamUsugetHeroes(member, position) {
  //     this._heroService.getHeroById(member).subscribe(res => {
  //       this.TeamHeroes[position] = (res)
  //     })
  //   }

  // entity.member entity.codHero para eñ body
  addMember(idHero) {
    // comprobamos el hueco de member que esta vacio y lo almacenamos
    // var member = this.getMemberNull()
    // var member= this.GlobalV.memberTeamNUll;
    // console.log(member)
    // // console.log('la ideaaaa'+this.memberNUll)
    var data = { member: this.GlobalV.memberTeamNUll, codHero: idHero }
    this._Team.addMember(this.myTeamInfo.idTeam, data).subscribe(
      res => {
        // this.members=this.members+1;
        console.log(res)
        this.getTeamUsu()
        this.GlobalV.countTeamMembers++;
        this.newM = this.newM + 1
        console.log("cambio?" + this.newM)
        // this.countMembers()
        // this.idUser = this.identity.id
        // this.checkTeamNumber(this.myTeamInfo.idTeam)
      },
      error => {
        console.log(error)
      }
    )
  }

  // getMemberNull() {
  //   // comprobamos el hueco de member que esta vacio y lo almacenamos
  //   for (var i = 1; i < 6; i++) {
  //     // console.log('valor del array'+this.myTeam[`member_${5}`] )
  //     if (this.myTeamInfo[`member_${i}`] == null) {
  //       return `member_${i}`
  //     }
  //   }
  // }

  // // entity.member para el body
  // deleteMember(number) {
  //   var memberSelect = `member_${number}`;
  //   console.log(memberSelect)
  //   var data = { member: memberSelect };
  //   this._Team.deleteMember(this.myTeamInfo.idTeam, data).subscribe(
  //     res => {
  //       this.checkTeamNumber(this.myTeamInfo.idTeam)
  //       // this.TeamHeroes = [];
  //       this.getTeamUsu()
  //       // console.log(res)
  //     },
  //     error => {
  //       console.log(error)
  //     }
  //   )
  // }

  // countMembers() {
  //   for (var i = 1; i < 6; i++) {
  //     console.log("teaminfo")
  //     console.log(this.myTeamInfo)
  //     if (this.myTeamInfo[`member_${i}`] != null) {
  //       this. GlobalV.countTeamMembers++;
  //       console.log(this.GlobalV.countTeamMembers)
  //     }
  //   }

  // }

  // comprueba si ya estan todos los miembros
  // checkTeamNumber(idTeam) {

  //   console.log("llego aqui")
  //   this._Team.checkTeam(idTeam).subscribe(
  //     res => {
  //       console.log("Ressss"+res)
  //       // si devuelve true es que el maximo de miembros en el equipo esta completo
  //       this.maxMembers = res
  //       // console.log(this.maxMembers)
  //     },
  //     error => {
  //       console.log(error)
  //     }
  //   )
  // }

  following() {
    this._UserHero.allHerosFoll(this.identity.id).subscribe(res => {
      this.heroesFol = res
      // console.log(this.heroesFol)
    }),
      error => {
        console.log(error)
      }
  }

  favorites() {
    this._UserHero.allHerosFav(this.identity.id).subscribe(res => {
      this.heroesFav = res
      // console.log(this.heroesFav)
    }),
      error => {
        console.log(error)
      }
  }

  createTeam(statusF): void {
    const dialogRef = this.dialog.open(TeamDialogComponent, {
      // Le pasamos los datos que queremos
      data: {
        idUsu: this.identity.id,
        status: statusF,
        teamInfo: this.myTeamInfo,
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      // this.getTeamUsu()
      this.idUser = this.identity.id
    })
  }

}
