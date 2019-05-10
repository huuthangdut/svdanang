import { MatSnackBar } from '@angular/material';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;

  validationMessages = {
    'email': [
      { type: 'required', message: 'Vui lòng nhập email.' },
      { type: 'email', message: 'Vui lòng đúng định dạng email.' }
    ]
  }

  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Quên mật khẩu');

    this.buildForm();
  }

  buildForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  get f() { return this.forgotPasswordForm.controls; }

  onSubmit() {
    if (this.forgotPasswordForm.invalid)
      return;

    this.loading = true;

    this.authService.forgotPassword(this.f.email.value).subscribe(
      response => {
        if (response.success) {
          this.snackBar.open(response.message, '', { duration: 3000 });
          this.forgotPasswordForm.reset();
          this.loading = false;
        }
      },
      error => {
        this.snackBar.open(error, "", { duration: 3000 });
        this.loading = false;
      }
    );

  }

}
