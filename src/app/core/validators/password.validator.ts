import { AbstractControl, ValidationErrors } from '@angular/forms';


export class PasswordValidators {

  static matchPassword(group: AbstractControl): ValidationErrors | null {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');

    console.log(passwordControl.value + " - confirm: " + confirmPasswordControl.value);

    if ((passwordControl.value === confirmPasswordControl.value)) {
      return null;
    }

    return { 'passwordMismatch': true };
  }
}
