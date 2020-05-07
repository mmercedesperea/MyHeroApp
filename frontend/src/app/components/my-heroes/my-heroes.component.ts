import { Component, OnInit } from '@angular/core'
import { HeroService } from 'src/app/services/hero.service'
import { UserHeroService } from 'src/app/services/user-hero.service'
import { TeamService } from 'src/app/services/team.service'
import { Team } from 'src/app/models/team'
import { Hero } from 'src/app/models/hero'
import { UserService } from 'src/app/services/user.service'
import { MatDialog } from '@angular/material'
import { CreateTeamDialogComponent } from '../modals/create-team-dialog/create-team-dialog.component'

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
  public TeamHeroes: Hero[] = [];
  public heroLoad: Hero;
  public i: number = 1;
  constructor(
    public dialog: MatDialog,
    private _userService: UserService,
    private _heroService: HeroService,
    private _UserHero: UserHeroService,
    private _Team: TeamService
  ) {
    this.myTeamInfo = new Team(0, 0, '', '', '', '', '', '')
    this.heroLoad = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', null)
    // this.TeamHeroes = [];

  }

  ngOnInit() {
    this.getUsu()
    this.getTeamUsu()
    this.following()
    this.favorites()
    // this.TeamHeroes = [];
    // this.addMember(622)
    // this.addMember();
    // this.deleteMember('member_3');
  }

  getUsu() {
    this.identity = this._userService.getIdentity()
  }

  // bestTeam() {
  //   this._Team.bestTeam().subscribe(res => {
  //     this.bestT = res[0];

  //     for (var i = 1; i < 6; i++) {
  //       this._hero.getHeroById(this.myTeamInfo[`member_${i}`]).subscribe(res => {
  //         console.log(res)
  //         this.TeamHeroes.push(res)
  //       })
  //     }
  //   }, error => {
  //     console.log(error)
  //   })
  // }

  async getTeamUsu() {
    this.TeamHeroes = [];
    console.log(this.TeamHeroes)
    //obtenemos la informacion basica del team basico del usuario
    this._Team.getTeamInfo(this.identity.id).subscribe(
     res => {
        this.myTeamInfo = res

        this.checkTeamNumber(this.myTeamInfo.idTeam)

        if (this.myTeamInfo) {
          this.TeamHeroes = [];

          this._heroService.getHeroById(this.myTeamInfo.member_1).subscribe(res => {
            this.TeamHeroes[0]=(res)
          })
          this._heroService.getHeroById(this.myTeamInfo.member_2).subscribe(res => {
            this.TeamHeroes[1]=(res)
          })
          this._heroService.getHeroById(this.myTeamInfo.member_3).subscribe(res => {
            this.TeamHeroes[2]=(res)
          })
          this._heroService.getHeroById(this.myTeamInfo.member_4).subscribe(res => {
            this.TeamHeroes[3]=(res)
          })
          this._heroService.getHeroById(this.myTeamInfo.member_5).subscribe(res => {
            this.TeamHeroes[4]=(res)
          })
          // if (this.myTeamInfo) {
          //   for (var i = 1; i < 6; i++) {
          //     if (this.myTeamInfo[`member_${i}`] != null) {
          //       this._heroService.getHeroById(this.myTeamInfo[`member_${i}`]).subscribe(res => {
          //         // console.log(res)
          //         this.heroLoad = res;
          //         this.TeamHeroes.push(  this.heroLoad )
          //       })
          //     } 
          //     else {
          //       // console.log(JSON.stringify(this.TeamHeroes, null, 2));
          //       console.log(i)
          //       this.heroLoad = new Hero(0, '', '', 0, 0, 0, 0, 0, 0, '', '', '', '', '', '', '', '', '', '', null)
          //       this.TeamHeroes.push(this.heroLoad)
          //     }
          //   }
          //   // // console.log(this.TeamHeroes)
          // }
          console.log(this.TeamHeroes)
        }
      },
      error => {
        console.log(error)
      }
    )
    // si ya tiene un team traemos sus miembros
    // if (this.myTeamInfo) {
    // this._Team.getTeamUsu(this.identity.id).subscribe(
    //   res => {
    //     if (res != null) {
    //       this.myTeam = res
    //       console.log(this.myTeam)
    //       this.totalPoint = this.myTeam[0].totalPoint
    //       this.checkTeamNumber(this.myTeamInfo.idTeam)
    //     }
    //     // console.log(res)
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )
    //   console.log(this.myTeamInfo)
    //   for (var i = 1; i < 6; i++) {
    //     console.log(this.myTeamInfo[`member_${i}`])
    //     this._heroService.getHeroById(this.myTeamInfo[`member_${i}`]).subscribe(res => {
    //       console.log(res)
    //       this.TeamHeroes.push(res)
    //     })
    //   }
    // }
  }

  // entity.member entity.codHero para eñ body
  addMember(idHero) {
    // comprobamos el hueco de member que esta vacio y lo almacenamos
    var member = this.getMemberNull()
    console.log(member)
    // // console.log('la ideaaaa'+this.memberNUll)
    var data = { member: member, codHero: idHero }
    this._Team.addMember(this.myTeamInfo.idTeam, data).subscribe(
      res => {
        console.log(res)
        this.getTeamUsu()
      },
      error => {
        console.log(error)
      }
    )
  }

  getMemberNull() {
    // comprobamos el hueco de member que esta vacio y lo almacenamos
    for (var i = 5; i > 0; i--) {
      // console.log('valor del array'+this.myTeam[`member_${5}`] )
      if (this.myTeamInfo[`member_${i}`] == null) {
        return `member_${i}`
      }
    }
  }

  // entity.member para el body
  deleteMember(number) {
    var memberSelect = `member_${number}`;
    console.log(memberSelect)
    var data = { member: memberSelect };
    this._Team.deleteMember(this.myTeamInfo.idTeam, data).subscribe(
      res => {
        this.checkTeamNumber(this.myTeamInfo.idTeam)
        this.TeamHeroes = [];
        this.getTeamUsu()
        // console.log(res)
      },
      error => {
        console.log(error)
      }
    )
  }

  deleteTeam() {
    this._Team.delete(this.idTeam).subscribe(
      res => {
        console.log(res)
      },
      error => {
        console.log(error)
      }
    )
  }

  // comprueba si ya estan todos los miembros
  checkTeamNumber(idTeam) {
    this._Team.checkTeam(idTeam).subscribe(
      res => {
        // si devuelve true es que el maximo de miembros en el equipo esta completo
        this.maxMembers = res
        // console.log(this.maxMembers)
      },
      error => {
        console.log(error)
      }
    )
  }

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

  createTeam(): void {
    const dialogRef = this.dialog.open(CreateTeamDialogComponent, {
      // Le pasamos los datos que queremos
      data: {
        idUsu: this.identity.id
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      this.getTeamUsu()
    })
  }
}
