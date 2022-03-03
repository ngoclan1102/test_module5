import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../model/Book";

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  constructor(private Http :HttpClient) { }


  getAll(): Observable<Book[]> {
    return this.Http.get<Book[]>('http://localhost:3000/products');
  }

  findBookById(id: number): Observable<Book> {
    return this.Http.get<Book>('http://localhost:3000/books/' + id);
  }


  delete(id: number): Observable<void> {
    return this.Http.delete<void>(`http://localhost:3000/books/` + id);
  }

  create(book: Book): Observable<any> {
    return this.Http.post('http://localhost:3000/books',book);
  }
  edit(book: Book): Observable<any> {
    return this.Http.put('http://localhost:3000/books' + book.id,book);
  }
}
