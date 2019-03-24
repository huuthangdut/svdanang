import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  files: File | FileList;
  disabled: boolean = false;
  constructor() { }

  ngOnInit() {
  }



}
