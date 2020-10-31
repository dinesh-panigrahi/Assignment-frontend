import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../app.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  bookForm = this.fb.group({
    id: [''],
    bookName: ['', [Validators.required]],
    userId: [localStorage.getItem('userId')]
  });

  constructor(public dialogRef: MatDialogRef<BookComponent>, private fb: FormBuilder, private appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data) {
      this.bookForm.get('id').setValue(this.data.id);
      this.bookForm.get('bookName').setValue(this.data.bookName);
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.bookForm.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.bookForm.invalid) {
      console.log('Invalid');
      return;
    }
    this.appService.postRequest('book/addBook', this.bookForm.getRawValue()).subscribe(res => {
      if (res) {
        this.dialogRef.close(res);
      }
    }, error => {
      if (error) {
        console.log(error);
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
