import { Injectable } from '@angular/core';
import { Doc } from './doc';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocService {
  
  constructor(
    private http: HttpClient
  ) { }
  /**
   * GET docs from the server with an open API
   */
  getAllDocs() : Observable<Doc[]> {
    return this.http.get<Doc[]>('http://localhost:8080/api/open/documents')
      .pipe(tap(_ => console.log(`DEBUG TAP --> The elements were retrieved from the server`)));
  }
  /**
   * GET doc by id from the server with an authenticated account
   */
  getDoc(id: number) : Observable<Doc> {
    return this.http.get<Doc>(`http://localhost:8080/api/auth/documents/${id}`)
      .pipe(tap(el => console.log(`DEBUG TAP --> The element ${el} was retrieved from the server`)));
  }
  /**
   * GET doc file by id from the server with an authenticated account
   */
  downloadDoc(id: number): Observable<Blob> {
    return this.http.get(`http://localhost:8080/api/auth/documents/download/${id}`, { responseType: 'blob' })
      .pipe(tap(el => console.log(el)));
  }
  /**
   * GET docs whose name contains search term
   */
  searchDocs(term: string): Observable<Doc[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Doc[]>(`http://localhost:8080/api/open/documents/course/${term}`)
      .pipe(
        tap(x => x.length ? console.log(`found docs matching ${term}`) : console.log(`no docs mathing ${term}`))
      )
  }
  /**
   * POST add a new document to the server
   */
  addDoc(doc: FormData): Observable<FormData> {
    return this.http.post<FormData>(`http://localhost:8080/api/auth/documents/upload`, doc)
      .pipe(tap(el => console.log(`The element ${el} was added to the server`)));
  }
  /**
   * PUT update the doc on the server
   * TO FIX
   */
  updateDoc(doc: Doc, id: number) : Observable<any> {
    return this.http.put(`http://localhost:8080//${id}`, doc)
      .pipe(tap(el => console.log(`The element ${el} was updated on the server`)));
  }
  /**
   * DELETE delete the doc from the server with an authenticated account
   */
  deleteDoc(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/auth/documents/${id}`)
      .pipe(tap(el => console.log(`DEBUG TAP --> The element ${el} was deleted from the server`)));
  }
}
