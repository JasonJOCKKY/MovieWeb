import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;

  constructor(private authService: AuthenticationService, private snackBar: MatSnackBar, private router: Router, private formBuilder: FormBuilder) {
    this.loginFormGroup = new FormGroup(
      {
        email: new FormControl(''),
        password: new FormControl('')
      },
      Validators.required
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
  
//   function ageRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
//     if (control.value !== undefined && (isNaN(control.value) || control.value < 18 || control.value > 45)) {
//         return { 'ageRange': true };
//     }
//     return null;
// }

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

  // MustMatch(controlName: string):ValidatorFn{
  //   return (control: AbstractControl): { [key: string]: boolean } | null => {
      
  //     if(control.value != controlName){
  //       return {mustMatch: true};
  //     }
  //     return null;
  //   };
  // }



  async login() {
    if (this.loginFormGroup.valid) {
      try {
        await this.authService.login(this.loginFormGroup.get('email').value, this.loginFormGroup.get('password').value);
        this.router.navigate(['']);
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
        console.log(this.registerFormGroup.get('email').value);
        console.log(this.registerFormGroup.get('password').value);
        await this.authService.signUp(
          this.registerFormGroup.get('email').value,
          this.registerFormGroup.get('password').value,
          this.registerFormGroup.get('name').value
        );
        this.router.navigate(['']);
      } catch (e) {
        this.snackBar.open('Unable to register', null, {
          duration: 4000
        });
      }
    }
  }
  



  ngOnInit() {

  }

}
