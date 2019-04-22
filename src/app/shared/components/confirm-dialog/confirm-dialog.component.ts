import { TdLoadingService } from '@covalent/core/loading';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  title: string;
  message: string;
  agreeText: string;
  disagreeText: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel
  ) {
    this.title = data.title;
    this.message = data.message;
    this.agreeText = data.agreeText || 'Có';
    this.disagreeText = data.disagreeText || 'Không';
  }
}

export class ConfirmDialogModel {
  title: string;
  message: string;
  agreeText?: string;
  disagreeText?: string;
}
