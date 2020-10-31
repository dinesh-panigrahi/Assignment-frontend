import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { User } from '../models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User;
  submitted: boolean;
  hide = true;
  signupUrl = 'registerUser';

  signupForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router) { }

  ngOnInit(): void {
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log(this.signupForm.getRawValue());
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      console.log('Invalid');
      return;
    }

    this.appService.postRequest(this.signupUrl, this.signupForm.getRawValue()).subscribe(data => {
      console.log(data);
      if (data) {
        this.router.navigate(['/login']);
      }
    }, error => {
      console.log('error: ', error);
    });
  }

}
