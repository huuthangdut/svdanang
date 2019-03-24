import { Validators, FormBuilder, FormGroup, FormControl, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  passwordHide = true;
  form: FormGroup;

  validationMessages = {
    'username': [
      { type: 'required', message: 'Vui lòng nhập tên đăng nhập' },
      { type: 'minLength', message: 'Tên đăng nhập tối thiểu 6 ký tự' }
    ],
    'password': [
      { type: 'required', message: 'Vui lòng nhập mật khẩu' },
      { type: 'minLength', message: 'Mật khẩu tối thiểu 6 ký tự' }
    ]
  }

  constructor(private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ]
        )
      ),
      password: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ]))
    });
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit(form: NgForm) {
    if (this.form.valid) {
      console.log()
      this.router.navigate(['/']);
    }
  }
}
