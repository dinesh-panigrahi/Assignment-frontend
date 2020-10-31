import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../app.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  hide = true;

  createUserForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  editUserForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    email: [''],
    password: ['']
  });

  constructor(public dialogRef: MatDialogRef<UserComponent>, private fb: FormBuilder, private appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data === 'edit') {
      this.appService.getRequest('user/' + localStorage.getItem('userId')).subscribe(data => {
        console.log(data);
        this.editUserForm.get('id').setValue(data.id);
        this.editUserForm.get('name').setValue(data.name);
        this.editUserForm.get('email').setValue(data.email);
        this.editUserForm.get('password').setValue(data.password);
      }, error => {
        console.log('error: ', error);
      });
    }
  }

  // convenience getter for easy access to form fields
  get c() { return this.createUserForm.controls; }

  // convenience getter for easy access to form fields
  get e() { return this.editUserForm.controls; }

  createUser() {
    console.log(this.createUserForm.getRawValue());
    // stop here if form is invalid
    if (this.createUserForm.invalid) {
      console.log('Invalid');
      return;
    }

    this.appService.postRequest('registerUser', this.createUserForm.getRawValue()).subscribe(data => {
      console.log(data);
      if (data) {
        this.dialogRef.close();
      }
    }, error => {
      console.log('error: ', error);
    });
  }

  editUser() {
    console.log(this.editUserForm.getRawValue());
    // stop here if form is invalid
    if (this.editUserForm.invalid) {
      console.log('Invalid');
      return;
    }

    this.appService.putRequest('user/updateUser', this.editUserForm.getRawValue()).subscribe(data => {
      console.log(data);
      if (data) {
        this.dialogRef.close();
      }
    }, error => {
      console.log('error: ', error);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
