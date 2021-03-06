import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

/**
 * Component for admin to delete a user
 */
@Component({
  selector: 'app-admin-delete-user-dialog',
  templateUrl: './admin-delete-user-dialog.component.html',
  styleUrls: ['./admin-delete-user-dialog.component.scss']
})

export class AdminDeleteUserDialogComponent implements OnInit {

  /**
   * Constructor in which we inject our services and different elements
   */
  constructor(
    public dialogRef: MatDialogRef<AdminDeleteUserDialogComponent>,
    /**
     * variable for store the data for modal
     */
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  /**
   * Start when the component inits
   */
  ngOnInit() {
  }

  /**
   * To close modal
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

}
