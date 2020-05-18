import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-admin-delete-user-dialog',
  templateUrl: './admin-delete-user-dialog.component.html',
  styleUrls: ['./admin-delete-user-dialog.component.scss']
})
export class AdminDeleteUserDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AdminDeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

}
