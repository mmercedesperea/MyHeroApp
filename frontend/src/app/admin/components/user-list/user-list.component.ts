import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from "@angular/material/dialog";
import { AdminDeleteUserDialogComponent } from 'src/app/components/modals/admin-delete-user-dialog/admin-delete-user-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public users: User[] = [];

  constructor(  public dialog: MatDialog,private _userService: UserService) { }

  ngOnInit() {
    this.getAllUsers()
  }

  getAllUsers() {
    this._userService.allusers().subscribe(res => {
      this.users = res;
      console.log(this.users)
    }, err => {
      console.log(err)
    })
  }

  deteteUser(idUsu){
    this._userService.adminDeleteUser(idUsu).subscribe(res => {
      console.log(res)
      this.getAllUsers()
    }, err => {
      console.log(err)
    })
  }


  deleteUserDialog(idUsu,name): void {
    console.log(idUsu,name)
    const dialogRef = this.dialog.open(AdminDeleteUserDialogComponent, {
      // Le pasamos los datos que queremos
      
      data: {
        userId: idUsu,
        UserName:name
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      if(result){
        this.deteteUser(result)
      }
    });
  }
}
