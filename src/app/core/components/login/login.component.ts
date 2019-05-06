import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  passwordHide = true;
  form: FormGroup;
  loading = false;
  returnUrl: string;
  error = '';

  validationMessages = {
    'username': [
      { type: 'required', message: 'Vui lòng nhập tên đăng nhập.' }
    ],
    'password': [
      { type: 'required', message: 'Vui lòng nhập mật khẩu.' }
    ]
  }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });

    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid)
      return;

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(data => {
        this.router.navigate([this.returnUrl]);
      }, error => {
        this.error = error.error;
        this.loading = false;
        this.snackBar.open(this.error, '', {
          duration: 2000,
          panelClass: ['error-snackbar-message']
        });
      })

  }
}
