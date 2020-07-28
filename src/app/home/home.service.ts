import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  url = "https://localhost:44301/api/books";


  constructor(public httpClient: HttpClient) { }

  getListOfBooks(): Observable<Books[]> {
    return this.httpClient.get<Books[]>(this.url);
  }

  search(searchword: string) : Observable<Books[]> {
    //console.log(searchword + "inside service");
    const searchUrl = `${this.url}/${searchword}`;
    return this.httpClient.get<Books[]>(searchUrl);
  }

  sort(sortExpr: string, sortDir: string): Observable<Books[]>
  {
    const sortUrl = `${this.url}/${sortExpr}/${sortDir}`;
    return this.httpClient.get<Books[]>(sortUrl);
  }


  deleteBook(id: string): Observable<{}> {
    const deleteUrl = `${this.url}/${id}`;
    return this.httpClient.delete(deleteUrl);
  }

  updateBook(id: string, book: Books): Observable<Books> {
    const editUrl = `${this.url}/${id}`;
    return this.httpClient.put<Books>(editUrl, book);
  }

  addBook(addForm: NgForm): Observable<{}> {
    return this.httpClient.post<Books>(this.url, addForm);
  }


}
