import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Component for navbar
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, DoCheck {
  /**
   * to save the title
   */
  public title: string;
  /**
   * to save the users identity
   */
  public identity;
  /**
   * to add FormGroup
   */
  public searchForm: FormGroup;
  /**
   * to save the selected value in the form
   */
  public selectedValue2: string = 'HeroName'

  /**
   * to save the photo from storage
   */
  public photo: string = ''

  /**
   * Constructor in which we inject our services and different elements
   */
  constructor(private formBuilder: FormBuilder, private _userService: UserService, private _router: Router) {
    this.searchForm = this.formBuilder.group({
      search: [
        ''
      ],
      selectedValue: [
        ''
      ]
    });
  }

  /**
   * Start when the component inits
   */
  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.photo = localStorage.getItem('UserPhoto')

  }

  /**
   * search value options
   */
  searchValue = [
    { value: 'HeroName', viewValue: 'Hero' },
    { value: 'Marvel', viewValue: 'All Marvel Heroes' },
    { value: 'DC', viewValue: 'All DC Heroes' },
    { value: 'User', viewValue: 'User' }
  ];

  /**
   * Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
   */
  ngDoCheck(): void {
    this.identity = this._userService.getIdentity();
    this.photo = localStorage.getItem('UserPhoto')
  }

  /**
   * Logout from the app
   */
  logout() {
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }

  /**
   * Search hero or user
   */
  searchHP() {
    if (this.searchForm.value.search) {
      this._router.navigate([`/heroesSearch/${this.searchForm.value.selectedValue}/${this.searchForm.value.search}`]);

    } else {
      this._router.navigate([`/heroesSearch/${this.searchForm.value.selectedValue}/publisher`]);
    }
    this.searchForm.reset()
  }

}

