import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.scss']
})
export class MeetingFormComponent implements OnInit {

  date;
  constructor(
    public dialogRef: MatDialogRef<MeetingFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any, ) {

  }

  ngOnInit() {
    this.date = this.data.date;
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

  autoGrowTextZone(e) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25) + "px";

  }

}
