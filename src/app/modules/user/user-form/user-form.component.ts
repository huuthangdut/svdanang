import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from './../../../core/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  departments;
  roles;
  hidePassword = true;

  validationMessages = {
    'firstName': [
      { type: 'required', message: 'Vui lòng nhập tên' }
    ],
    'lastName': [
      { type: 'required', message: 'Vui lòng nhập họ và tên đệm' }
    ],
    'userName': [
      { type: 'required', message: 'Vui lòng nhập tên đăng nhập' }
    ],
    'email': [
      { type: 'required', message: 'Vui lòng nhập địa chỉ email' }
    ],
    'password': [
      { type: 'required', message: 'Vui lòng nhập mật khẩu' }
    ],
    'departmentId': [
      { type: 'required', message: 'Vui lòng chọn ban' }
    ]
  }

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.createFormGroup();
  }

  ngOnInit() {
    this.createFormGroup();

    this.departments = [
      { id: 1, name: 'Ban 1' },
      { id: 2, name: 'Ban 2' },
      { id: 3, name: 'Ban 3' },
      { id: 4, name: 'Ban 4' },
    ]

    this.roles = [
      { id: 1, name: 'Admin' },
      { id: 2, name: 'Admod' },
    ]
  }

  createFormGroup() {
    this.form = this.fb.group({
      id: null,
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      userName: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      departmentId: [null, [Validators.required]],
      isActive: false,
      roles: null
    })
  }

  get lastName() {
    return this.form.get('lastName');
  }

  get firstName() {
    return this.form.get('firstName');
  }

  get userName() {
    return this.form.get('userName');
  }

  get password() {
    return this.form.get('password');
  }

  get email() {
    return this.form.get('email');
  }

  get departmentId() {
    return this.form.get('departmentId');
  }



  onSubmit() {
    if (this.form.valid) {
      const user = Object.assign({}, this.form.value);
      console.log(user);
      this.userService.createUser(user).subscribe();
    }

  }

}