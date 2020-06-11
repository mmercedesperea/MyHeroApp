import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/services/user.service';
/**
 * Component to contain other components
 */
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  /**
   * variable to count users
   */
  public totalUsers: number = 0;
  /**
   * variable to count Teams
   */
  public totalTeams: number = 0;
  /**
   * variable to count Heroes
   */
  public totalHeros: number = 0;

  /**
   * component title
   */
  title = 'Admin Panel';

  /**
   * Constructor in which we inject our services and different elements
   */
  constructor(public _userService: UserService) { }

  /**
   * Start when the component inits
   */
  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this._userService.countAllUsers().subscribe(res => {
      this.totalUsers = res;
    }, err => {
      console.log(err)
    })
    this._userService.countAllHeroes().subscribe(res => {
      this.totalHeros = res;
    }, err => {
      console.log(err)
    })
    this._userService.countAllTeams().subscribe(res => {
      this.totalTeams = res;
    }, err => {
      console.log(err)
    })
  }
}
