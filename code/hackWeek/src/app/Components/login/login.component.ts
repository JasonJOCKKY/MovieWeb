import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormGroupDirective, NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import {ErrorStateMatcher} from '@angular/material/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;

  get loginEmailControl(){ return this.loginFormGroup.get('email'); }
  get loginPasswordControl(){ return this.loginFormGroup.get('password'); }

  get registerNameControl() { return this.registerFormGroup.get('name'); }
  get registerEmailControl() { return this.registerFormGroup.get('email'); }
  get registerPasswordControl() { return this.registerFormGroup.get('password'); }
  get registerConfirmPasswordControl() { return this.registerFormGroup.get('confirmPassword'); }


  constructor(
    private authService: AuthenticationService, 
    private snackBar: MatSnackBar, private router: 
    Router, private formBuilder: FormBuilder, 
    private dialogRef:MatDialogRef<LoginComponent>
    ) {
    this.loginFormGroup = new FormGroup(
      {
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      }
    );

    this.registerFormGroup = this.formBuilder.group(
      {
        name: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)] )
      },{
        validator: this.MustMatch('password', 'confirmPassword')
    });
  }



  MustMatch(controlName: string, matchingControlName: string) {

    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}



  async login() {
    if (this.loginFormGroup.valid) {
      try {
        await this.authService.login(this.loginFormGroup.get('email').value, this.loginFormGroup.get('password').value);
        this.closeDialog();
      } catch (e) {
        this.snackBar.open('Unable to log in', null, {
          duration: 4000
        });
      }
    }
  }

  async register() {
    if (this.registerFormGroup.valid) {
      try {
        await this.authService.signUp(
          this.registerFormGroup.get('email').value,
          this.registerFormGroup.get('password').value,
          this.registerFormGroup.get('name').value
        );
        this.closeDialog();
      } catch (e) {
        this.snackBar.open('Unable to register', null, {
          duration: 4000
        });
      }
    }
  }

  loginWithGoogle(){
    this.authService.loginWithGoogle();
    this.dialogRef.close();
  }

  closeDialog(){
    this.dialogRef.close();
  }




  ngOnInit() {

  }

}
