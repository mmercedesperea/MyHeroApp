import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HeroService } from 'src/app/services/hero.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-avatar-dialog',
  templateUrl: './avatar-dialog.component.html',
  styleUrls: ['./avatar-dialog.component.scss']
})
export class AvatarDialogComponent implements OnInit {
  public heroImg: any[] = [];
  public img: string = "";

  constructor(
    public dialogRef: MatDialogRef<AvatarDialogComponent>,
    private _UserService: UserService,
    private _HeroService: HeroService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.getProfilesimg()
    this.img= this.data.userPhoto;
  }

  selectHero(imgHero) {
    this.img = imgHero;
    console.log(this.img)
  }


  getProfilesimg() {
    this._HeroService.profileImgHeroes().subscribe(res => {
      this.heroImg = res;
    }, err => {
      console.log(err)
    })
  }

  updateImgProfile(){
    this.dialogRef.close();
    var userImgObj = {idUsu: this.data.userId, img: this.img};

    this._UserService.newImg(userImgObj).subscribe(res=>{
      console.log(res)
    },err=>{
      console.log(err)
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
