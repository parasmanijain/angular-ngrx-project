import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { setLoadingSpinner } from 'src/app/store/shared/shared.action';
import { signUpStart } from '../state/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    signUpForm: FormGroup;

    constructor(private store:Store<AppState>) {
    }

    ngOnInit(): void {
      this.signUpForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
      })
    }

    showEmailErrors() {
      const emailForm = this.signUpForm.get('email');
      if(emailForm.touched && !emailForm.valid) {
          if(emailForm.errors.required) {
              return 'Email is required'
          }

          if(emailForm.errors.email) {
              return 'Invalid Email'
          }
      }
  }

  showPasswordErrors() {
      const passwordForm = this.signUpForm.get('password');
      if(passwordForm.touched && !passwordForm.valid) {
          if(passwordForm.errors.required) {
              return 'Password is required'
          }
      }
  }

  onSignUpSubmit() {
      if(!this.signUpForm.valid) {
          return;
      }
      const {email, password } = this.signUpForm.value;
      this.store.dispatch(setLoadingSpinner({status:true}));
      this.store.dispatch(signUpStart({email,password}));
  }
}
