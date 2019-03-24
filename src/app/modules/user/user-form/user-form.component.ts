import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  departments;
  roles: string[] = ['Admin', 'Member'];
  hidePassword = true;
  constructor() { }

  ngOnInit() {
    this.departments = [
      { id: 1, name: 'Ban 1' },
      { id: 2, name: 'Ban 2' },
      { id: 3, name: 'Ban 3' },
      { id: 4, name: 'Ban 4' },
    ]

    this.form = new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('true'),
      departmentId: new FormControl('0'),
      isActive: new FormControl('false'),
    })
  }

  onSubmit() {
    if (this.form.valid) {

    }
  }

}