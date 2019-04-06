import { ConfirmDialogComponent, ConfirmDialogModel } from './../components/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(dialogData: ConfirmDialogModel) {
    return this.dialog.open(ConfirmDialogComponent, {
      width: "390px",
      // maxWidth: "400px",
      disableClose: false,
      data: dialogData
    })
  }
}
