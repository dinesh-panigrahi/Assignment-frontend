import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../app.service';
import { BookComponent } from '../book/book.component';
import { Book } from '../models/book';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books: Book[] = [];
  constructor(private appService: AppService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.appService.getAllRequest('user/getBooks/' + localStorage.getItem('userId')).subscribe(res => {
      if (res) {
        this.books = res;
      }
    }, error => {
    });
  }

  createBook() {
    const dialogRef = this.dialog.open(BookComponent, {
      width: '50%',
      height: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
      if (result) {
        this.books.push(result);
      }
    });
  }

  editBook(book: Book) {
    const dialogRef = this.dialog.open(BookComponent, {
      width: '50%',
      height: '50%',
      data: book
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
      if (result) {
        this.books.splice(this.books.indexOf(book), 1, result);
      }
    });
  }

  createUser() {
    const dialogRef = this.dialog.open(UserComponent, {
      width: '50%',
      height: '50%',
      data: 'create'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }

  editUserDetails() {
    const dialogRef = this.dialog.open(UserComponent, {
      width: '50%',
      height: '50%',
      data: 'edit'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
    });
  }

}
