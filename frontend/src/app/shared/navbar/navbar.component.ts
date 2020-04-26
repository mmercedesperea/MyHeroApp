import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, DoCheck {
  public title: string;
  public identity;
  public searchForm: FormGroup;
  public selectedValue2: string = 'Hero Name'
  isAnonymous :boolean=true;

  constructor(private formBuilder: FormBuilder, private _userService: UserService, private _router: Router) {
    this.searchForm = this.formBuilder.group({
      search: [
        '',
        // [Validators.required, Validators.minLength(3), Validators.maxLength(30)]
      ],
      selectedValue: [
        '',
        // [
        //   Validators.required,
        //   Validators.minLength(6),
        //   Validators.maxLength(30)
        // ]
      ]
      });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.identity = this._userService.getIdentity();
    // this._userService.isLoggedIn();
    // this.isLog();

  }

  searchValue = [
    {value: 'Hero Name', viewValue: 'Hero'},
    {value: 'Marvel', viewValue: 'All Marvel Heroes'},
    {value: 'DC', viewValue: 'All DC Heroes'}
  ];

  // selectedValue2: string = "HeroName"
  

  // para que cuando se produzca cualquier cambio en la app se compruebe esto esta continuamente comprobando esto
  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.identity = this._userService.getIdentity();
  }

  // isLog() {
  //   if (!this._userService.isLoggedIn()) {
  //     localStorage.clear();
  //     this.identity = null;
  //     this._router.navigate(['/']);
  //   }else{
  //     console.log('logueado')
  //   }

  // }

  logout() {
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }


  searchHP(){
    console.log(this.searchForm.value.search)
    if(this.searchForm.value.search){
      this._router.navigate([`/heroesSearch/${this.searchForm.value.search}`]);
    }else{
      this._router.navigate([`/heroesSearch/${this.searchForm.value.selectedValue}`]);
    }
    console.log(this.searchForm.value.selectedValue)
    
    // this._router.navigate(['/heroesSearch']);
  }

}
