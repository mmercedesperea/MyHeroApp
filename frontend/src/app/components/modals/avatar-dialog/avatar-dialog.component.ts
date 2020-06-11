import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HeroService } from 'src/app/services/hero.service';
import { UserService } from 'src/app/services/user.service';

/**
 * Component for change avatar
 */
@Component({
  selector: 'app-avatar-dialog',
  templateUrl: './avatar-dialog.component.html',
  styleUrls: ['./avatar-dialog.component.scss']
})

export class AvatarDialogComponent implements OnInit {
  activeState: string;
  /**
   * variable to store heros url img
   */
  public heroImg: any[] = [];
  /**
   * to store user img
   */
  public img: string = "";

  /**
 * Constructor in which we inject our services and different elements
 */
  constructor(
    public dialogRef: MatDialogRef<AvatarDialogComponent>,
    private _UserService: UserService,
    private _HeroService: HeroService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /**
 * Start when the component inits
 */
  ngOnInit() {
    this.getProfilesimg()
    this.img = this.data.userPhoto;
  }

  /**
 * function to change img hero variable
 *   @param {string} imgHero
 */
  selectHero(imgHero) {
    this.img = imgHero;
    this.activeState = imgHero;
  }

  /**
  * function to get img profile user
  */
  getProfilesimg() {
    this._HeroService.profileImgHeroes().subscribe(res => {
      this.heroImg = res;
      this.heroImg.push({image:'./../../../../assets/img/nomember.jpg'})
    }, err => {
      console.log(err)
    })
  }

  /**
  * function to update img
  */
  updateImgProfile() {

    var userImgObj = { idUsu: this.data.userId, img: this.img };

    this._UserService.newImg(userImgObj).subscribe(res => {
      
      localStorage.setItem('UserPhoto', this.img)
    }, err => {
      console.log(err)
    })
    this.dialogRef.close();
  }

  /**
    * function to close modal
    */
  onNoClick(): void {
    this.dialogRef.close();
  }
}
