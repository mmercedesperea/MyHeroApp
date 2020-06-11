import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from "@angular/material/dialog";
import { AdminDeleteUserDialogComponent } from 'src/app/components/modals/admin-delete-user-dialog/admin-delete-user-dialog.component';

/**
 * Component that brings the List of users
 */
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
  page = 1;
  pageSize = 10;
  /**
   * variable to store the list of users from app
   */
  public users: User[] = [];

  /**
   * Constructor in which we inject our services and different elements
   */
  constructor(public dialog: MatDialog, private _userService: UserService) { }

  /**
   * Start when the component inits
   */
  ngOnInit() {
    this.getAllUsers()
  }

  /**
   * To get all users in the app
   */
  getAllUsers() {
    this._userService.allusers().subscribe(res => {
      this.users = res;
    }, err => {
      console.log(err)
    })
  }

  /**
   * To delete a user from app
   * @param {number}idUsu
   */
  deteteUser(idUsu) {
    this._userService.adminDeleteUser(idUsu).subscribe(res => {
      this.getAllUsers()
    }, err => {
      console.log(err)
    })
  }

  /**
   * Open modal to delete a user
   * @param {number} idUsu
   * @param {string}name
   */
  deleteUserDialog(idUsu, name): void {
    const dialogRef = this.dialog.open(AdminDeleteUserDialogComponent, {
      data: {
        userId: idUsu,
        UserName: name
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      if (result) {
        this.deteteUser(result)
      }
    });
  }
}
