import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UserHeroService } from 'src/app/services/user-hero.service';
import { Hero } from 'src/app/models/hero';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.scss']
})
export class PublicProfileComponent implements OnInit {
  public idParams: number = 0;
  public user: User;
  public heroesFav: Hero[];
  // public myTeam: any = ''
  // public myTeamInfo: Team
  public identity;
  public followActive: any = "";
  public FollowedUsers: User[] = []
  public FollowersUsers: User[] = []
  // public TeamHeroes: Hero[] = []

  constructor(
    private _TeamService: TeamService,
    private _UserHero: UserHeroService,
    private _UserService: UserService,
    private _heroService: HeroService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.user = new User(0, '', '', '', '', '', new Date(0), '', false)
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      // const id: 0 = params["id"];
      this.idParams = params["user"];
      // this.getHero(this.idParams);
      this.getUsuInfo();
      this.favorites();
      // this.getTeamUsu();
      this.getIdentity();
      this.checkFollow();
      this.getFollowersUsers()
      this.getFollowedUsers()
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



  followUser() {
    var ids = { idUsu: this.identity.id, idUsuFollow: this.idParams }
    this._UserService.followUser(ids).subscribe(res => {
      console.log(res)
      this.checkFollow();
      this.getFollowersUsers()
    }, err => {
      console.log(err)
    })
  }


  unFollowUser() {
    this._UserService.unFollowUser(this.identity.id, this.idParams).subscribe(res => {
      console.log(res)
      this.checkFollow();
      this.getFollowersUsers()
    }, err => {
      console.log(err)
    })
  }

  checkFollow() {
    this._UserService.checkFollow(this.identity.id, this.idParams).subscribe(res => {
      console.log(res)
      this.followActive = res;
    }, err => {
      console.log(err)
    })
  }

  getFollowedUsers() {
    this._UserService.getFollowUsers(this.idParams).subscribe(
      res => {
        console.log(res)
        this.FollowedUsers = res
      },
      error => {
        console.log(error)
      }
    )
  }

  getFollowersUsers() {
    this._UserService.getFollowersUsers(this.idParams).subscribe(
      res => {
        console.log(res)
        this.FollowersUsers = res
      },
      error => {
        console.log(error)
      }
    )
  }


}

