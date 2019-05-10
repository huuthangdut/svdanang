import { ActivatedRoute, Router } from '@angular/router';
import { PasswordValidators } from './../../validators/password.validator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { CrossFieldErrorMatcher } from '../../validators/cross-field-error-matcher';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;

  validationMessages = {
    'password': [
      { type: 'required', message: 'Vui lòng nhập mật khẩu mới.' },
    ],
    'confirmPassword': [
      { type: 'required', message: 'Vui lòng nhập xác nhận mật khẩu mới.' },
    ],
    'changePasswordForm': [
      { type: 'passwordMismatch', message: 'Mật khẩu và xác nhận mật khẩu không khớp.' }
    ]
  }

  errorMatcher = new CrossFieldErrorMatcher();

  token: string;

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.changePasswordForm = this.formBuilder.group({
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    }, { validators: PasswordValidators.matchPassword });
  }

  get password() {
    return this.changePasswordForm.get('password');
  }

  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword');
  }

  get f() { return this.changePasswordForm.controls; }

  onSubmit() {
    if (this.changePasswordForm.invalid)
      return;

    this.loading = true;
    this.authService.resetPassword(this.token, this.f.password.value).subscribe(response => {
      if (response.success) {
        this.snackBar.open(response.message, '', { duration: 3000 });
        this.loading = false;

        this.router.navigate(['/login']);
      }
    }, error => {
      this.snackBar.open(error, '', { duration: 3000 });
      this.loading = false;
    });

  }

}
