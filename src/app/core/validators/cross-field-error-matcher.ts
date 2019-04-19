import { FormGroupDirective, FormControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from "@angular/material";

export class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control.touched || control.dirty) && form.invalid;
  }
}