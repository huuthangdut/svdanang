import { UploadService } from './../../core/services/upload.service';
import { DatePipeService } from './../../shared/services/date-pipe.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { UserProfile, UserProfileModel } from '../../core/models';
import { UserPasswordModel } from '../../core/models/user-password.model';
import { UpdatePasswordFormService } from './../../core/services/forms/update-password-form.service';
import { UserProfileFormService } from './../../core/services/forms/user-profile-form.service';
import { UserService } from './../../core/services/user.service';
import { CrossFieldErrorMatcher } from './../../core/validators/cross-field-error-matcher';
import { PasswordValidators } from './../../core/validators/password.validator';
import { map, switchMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  file: File;
  avatar: string;

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
    private uploadService: UploadService,
    private datePipeService: DatePipeService,
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
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      userName: userProfile.userName,
      department: userProfile.department,
      email: userProfile.email,
      phoneNumber: userProfile.phoneNumber,
      birthDate: this.datePipeService.fromUnixTimeStamp(userProfile.birthDate),
      gender: userProfile.gender,
      address: userProfile.address,
      city: userProfile.city,
      facebookLink: userProfile.facebookLink,
    });

    this.avatar = this.userProfile.avatar;
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

  onSelectImage(file: File) {
    this.file = file;

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      this.avatar = event.target.result;
      console.log(this.avatar);
    }
  }

  onClearImage() {
    this.file = null;
    this.avatar = this.userProfile ? this.userProfile.avatar : '';
  }

  getUserProfileModel(): UserProfileModel {
    const formValue = Object.assign({}, this.profileForm.value);

    return new UserProfileModel(
      formValue.firstName,
      formValue.lastName,
      formValue.phoneNumber,
      this.datePipeService.toUnixTimestamp(formValue.birthDate),
      formValue.gender,
      formValue.address,
      formValue.city,
      formValue.facebookLink,
      this.userProfile ? this.userProfile.avatar : null,
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

      if (this.file) {
        this.uploadService.uploadFile(this.file).pipe(
          map(params => params['fileDownloadUri']),
          switchMap(fileUrl => {
            userProfile.avatar = fileUrl
            return this.userService.updateCurrentUser(userProfile)
          })
        ).subscribe(
          response => this.handleSubmitProfileSuccess(response),
          error => this.handleSubmitError(error)
        );
      } else {
        this.userService.updateCurrentUser(userProfile).subscribe(
          response => this.handleSubmitProfileSuccess(response),
          error => this.handleSubmitError(error)
        );
      }



    }
  }

  onSubmitUpdatePasswordForm() {
    this.submitting = true;
    if (this.updatePasswordForm.valid) {
      const userPassword = this.getUserPasswordModel();

      this.userService.updateCurrentUserPassword(userPassword)
        .subscribe(
          response => this.handleSubmitPasswordSuccess(response),
          error => this.handleSubmitError(error)
        );
    }
  }

  handleSubmitProfileSuccess(response) {
    console.log(response);
    this.submitting = false;
    const message = "Cập nhật thông tin cá nhân thành công";

    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  handleSubmitPasswordSuccess(response) {
    console.log(response);
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

    this.snackBar.open(error, '', {
      duration: 2000,
    });
  }

}
