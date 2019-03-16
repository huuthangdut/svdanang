import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RoleFormComponent>) { }

  ngOnInit() {

  }

  onSubmit() {
    this.onClose();
  }

  onClose() {
    // form reset
    this.dialogRef.close();
  }

}
