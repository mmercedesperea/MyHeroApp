import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,DoCheck {
    public title:string;
    public identity;
  
    constructor(private _userService: UserService,   private _router: Router){
      this.title = 'Heroes';
    }
  
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.identity = this._userService.getIdentity();
      this._userService.isLoggedIn();
      
    }

    // para que cuando se produzca cualquier cambio en la app se compruebe esto esta continuamente comprobando esto
    ngDoCheck(): void {
      //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
      //Add 'implements DoCheck' to the class.
      this.identity = this._userService.getIdentity();
    }

logout(){
  localStorage.clear();
  this.identity =null;
  this._router.navigate(['/']);
}

  }
