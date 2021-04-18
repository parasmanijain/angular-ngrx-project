import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

const routes:Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                redirectTo:'login'
            },
            {
                path: 'login',
                component:LoginComponent
            },
            {
                path: 'signup',
                component:SignupComponent
            }
        ]
    }
];

@NgModule({
    imports:[
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    declarations:[LoginComponent, SignupComponent]
})
export class AuthModule {

}