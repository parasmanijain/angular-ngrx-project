import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";
import { setLoadingSpinner } from "src/app/store/shared/shared.action";
import { loginStart } from "../state/auth.actions";

@Component({
    selector:'app-login',
    templateUrl:'./login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm:FormGroup;

    constructor(private store:Store<AppState>) {
    }

    ngOnInit():void {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required])
        })
    }

    showEmailErrors() {
        const emailForm = this.loginForm.get('email');
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
        const passwordForm = this.loginForm.get('password');
        if(passwordForm.touched && !passwordForm.valid) {
            if(passwordForm.errors.required) {
                return 'Password is required'
            }
        }
    }

    onLoginSubmit() {
        if(!this.loginForm.valid) {
            return;
        }
        const {email, password } = this.loginForm.value;
        this.store.dispatch(setLoadingSpinner({status:true}));
        this.store.dispatch(loginStart({email,password}))

    }

}