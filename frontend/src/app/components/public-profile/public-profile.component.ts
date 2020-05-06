import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UserHeroService } from 'src/app/services/user-hero.service';
import { Hero } from 'src/app/models/hero';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit {
  public idParams: number = 0;
  public user: User;
  public heroesFav: Hero[];
  public myTeam: any = "";
  public teamName: string = '';
  public totalPoint: number = 0;
  public identity;
  public followActive:any="";
  constructor(
    private _TeamService: TeamService,
    private _UserHero: UserHeroService,
    private _UserService: UserService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.user = new User(0, '', '', '', '', '', new Date(0), '', 0)
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      // const id: 0 = params["id"];
      this.idParams = params["user"];
      // this.getHero(this.idParams);
      this.getUsuInfo();
      this.favorites();
      this.getTeamUsu();
      this.getIdentity();
      this.checkFollow();
    });
  }

  getIdentity() {
    this.identity = this._UserService.getIdentity();
  }


  getUsuInfo() {
    this._UserService.getUser(this.idParams).subscribe(res => {
      this.user = res;
      console.log(res)
    },
      error => {
        console.log(error)
      }
    )
  }

  favorites() {
    this._UserHero.allHerosFav(this.idParams).subscribe(res => {
      this.heroesFav = res;
      console.log(this.heroesFav)
      
    }), error => {
      console.log(error)
    }
  }

  getTeamUsu() {
    this._TeamService.getTeamUsu(this.idParams).subscribe(res => {
      if (res != null) {
        this.myTeam = res;
        console.log(this.myTeam)
        this.teamName = this.myTeam[0].teamName;
        this.totalPoint = this.myTeam[0].totalPoint;
      }
    }, error => {
      console.log(error)
    })
  }

  followUser() {
    var ids = { idUsu: this.identity.id, idUsuFollow: this.idParams }
    this._UserService.followUser(ids).subscribe(res => {
    console.log(res)
    this.checkFollow();
    }, err => {
      console.log(err)
    })
  }


  unFollowUser() {
    this._UserService.unFollowUser( this.identity.id,this.idParams).subscribe(res => {
      console.log(res)
      this.checkFollow();
    }, err => {
      console.log(err)
    })
  }

  checkFollow(){
    this._UserService.checkFollow( this.identity.id,this.idParams).subscribe(res => {
      console.log(res)
      this.followActive= res;
    }, err => {
      console.log(err)
    })
  }
  

}

