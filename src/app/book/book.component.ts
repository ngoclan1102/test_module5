import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BookServiceService} from "../service/book-service.service";
import {Book} from "../model/Book";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books : Book[] = []
  book :Book = new Book(0,"","","")

  formCreate!: FormGroup;
  formEdit!: FormGroup;

  constructor( private Http : HttpClient, private bookService : BookServiceService, ) {
    this.getAll();
  }

  ngOnInit(): void {
    this.formCreate = new FormGroup({
      id: new FormControl(0),
      title: new FormControl(""),
      author: new FormControl(""),
      description: new FormControl("")
    })
    this.formEdit = new FormGroup({
      id: new FormControl(this.book.id),
      title: new FormControl(this.book.title),
      author: new FormControl(this.book.author),
      description: new FormControl(this.book.description),

    })
  }

  getAll() {
this.Http.get<Book[]>('http://localhost:3000/books').subscribe(data => {this.books = data;},
error => {})
  }

  findBookById(id : number) {
    this.bookService.findBookById(id).subscribe((data) => {
      this.book = data;
    })
  }

  showEdit(book : Book) {
    this.formEdit.controls['id']?.setValue(book.id)
      this.formEdit.controls['title']?.setValue(book.title)
      this.formEdit.controls['author']?.setValue(book.author)
    this.formEdit.controls['description']?.setValue(book.description)
  }

  edit() {
    this.bookService.edit(this.formEdit.value).subscribe(() => {
      alert("Sửa thành công");
      this.getAll();

    })
  }

  delete(id: number) {
    this.bookService.delete(id).subscribe(() => {
      alert("xóa thành công");
      this.getAll();
    })
  }

    create() {
      this.bookService.create(this.formCreate.value).subscribe(() => {
        alert("Tạo mới thành công");
        this.getAll();
      })
    }
      deleteData(){
        this.book = new Book(0,"","","")
      }
}
