import { MatSnackBar } from '@angular/material';
import { UserPasswordModel } from '../../core/models/user-password.model';
import { CrossFieldErrorMatcher } from './../../core/validators/cross-field-error-matcher';
import { UpdatePasswordFormService } from './../../core/services/forms/update-password-form.service';
import { PasswordValidators } from './../../core/validators/password.validator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserProfile, UserProfileModel } from '../../core/models';
import { UserProfileFormService } from './../../core/services/forms/user-profile-form.service';
import { UserService } from './../../core/services/user.service';
import { UserEmailValidators } from './../../core/validators/user-email.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  files: File | FileList;
  disabled: boolean = false;

  errorMatcher = new CrossFieldErrorMatcher();

  userProfile: UserProfile;

  profileForm: FormGroup;
  updatePasswordForm: FormGroup;

  profileFormErrors: any;
  updatePasswordFormErrors: any;

  submitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private userProfileFormService: UserProfileFormService,
    private updatePasswordFormService: UpdatePasswordFormService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.profileFormErrors = this.userProfileFormService.formErrors;
    this.updatePasswordFormErrors = this.updatePasswordFormService.formErrors;

    this.buildProfileForm();
    this.buildUpdatePasswordForm();

    this.getUserProfileAndPopulateToProfileForm();
  }


  getUserProfileAndPopulateToProfileForm() {
    this.userService.getCurrentUser()
      .subscribe((response) => {
        this.userProfile = response.data;

        this.setProfileFormValue(this.userProfile);

        this.userProfileFormService.markDirty(this.profileForm);
        this.profileForm.updateValueAndValidity();
      });
  }

  setProfileFormValue(userProfile: UserProfile) {
    this.profileForm.patchValue({
      firstName: userProfile.userName,
      lastName: userProfile.lastName,
      userName: userProfile.userName,
      department: userProfile.department,
      email: userProfile.email,
      phoneNumber: userProfile.phoneNumber,
      birthDate: userProfile.birthDate,
      gender: userProfile.gender,
      address: userProfile.address,
      city: userProfile.city,
      facebookLink: userProfile.facebookLink,
    });
  }

  buildProfileForm() {
    this.profileForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      userName: [{ value: null, disabled: true }],
      department: [{ value: null, disabled: true }],
      email: [{ value: null, disabled: true }],
      phoneNumber: null,
      birthDate: null,
      gender: null,
      address: null,
      city: null,
      facebookLink: null
    });

    this.profileForm.valueChanges.subscribe(data => this.onProfileFormValueChanged());

    this.onProfileFormValueChanged();
  }

  buildUpdatePasswordForm(): any {
    this.updatePasswordForm = this.formBuilder.group({
      oldPassword: [null, Validators.required],
      passwordGroup: this.formBuilder.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, { validators: PasswordValidators.matchPassword })
    });

    this.updatePasswordForm.valueChanges.subscribe(data =>
      this.onUpdatePasswordFormValueChanged());

    this.onUpdatePasswordFormValueChanged();
  }

  onUpdatePasswordFormValueChanged(): void {
    if (!this.updatePasswordForm) { return; }

    this.updatePasswordFormService.logValidationErrors(this.updatePasswordForm);
    console.log(this.updatePasswordFormErrors);
  }


  onProfileFormValueChanged(): void {
    if (!this.profileForm) { return; }

    this.userProfileFormService.logValidationErrors(this.profileForm);
  }

  getUserProfileModel(): UserProfileModel {
    const formValue = Object.assign({}, this.profileForm.value);

    return new UserProfileModel(
      formValue.firstName,
      formValue.lastName,
      formValue.phoneNumber,
      null,
      formValue.gender,
      formValue.address,
      formValue.city,
      formValue.facebookLink,
      null,
    );
  }

  getUserPasswordModel(): UserPasswordModel {
    const formValue = Object.assign({}, this.updatePasswordForm.value);

    return new UserPasswordModel(formValue.oldPassword, formValue.passwordGroup.password);
  }


  onSubmitProfileForm() {
    this.submitting = true;
    if (this.profileForm.valid) {
      const userProfile = this.getUserProfileModel();

      this.userService.updateCurrentUser(userProfile).subscribe(
        response => this.handleSubmitProfileSuccess(response),
        error => this.handleSubmitError(error));
    }
  }

  onSubmitUpdatePasswordForm() {
    this.submitting = true;
    if (this.updatePasswordForm.valid) {
      const userPassword = this.getUserPasswordModel();

      this.userService.updateCurrentUserPassword(userPassword).subscribe(
        response => this.handleSubmitPasswordSuccess(response),
        error => this.handleSubmitError(error));
    }
  }

  handleSubmitProfileSuccess(response) {
    this.submitting = false;
    const message = "Cập nhật thông tin cá nhân thành công";

    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  handleSubmitPasswordSuccess(response) {
    this.submitting = false;
    this.updatePasswordForm.reset();
    const message = "Cập nhật mật khẩu thành công";

    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  handleSubmitError(error) {
    this.submitting = false;
    console.log(error);

    this.snackBar.open("Có lỗi xảy ra. Vui lòng thử lại.", '', {
      duration: 2000,
    });
  }

}
