import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted: boolean;
  errorMsg = '';
  hide = true;
  loginUrl = 'authenticate';

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router) { }

  loginForm = this.fb.group({
    userName: ['',
      [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  ngOnInit(): void {
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.errorMsg = '';
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log('Invalid');
      return;
    }
    this.appService.postRequest(this.loginUrl, this.loginForm.getRawValue()).subscribe(res => {
      console.log(res);
      if (res) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.userId);
        this.router.navigate(['home']);
      }
    }, error => {
      if (error) {
        this.errorMsg = error.errorMessage;
      }
    });
  }

}
