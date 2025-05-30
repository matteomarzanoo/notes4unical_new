import { Injectable } from '@angular/core';
import { Doc } from './doc';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocService {

  private readonly docEndpoint = 'api/documents';
  
  constructor(private readonly http: HttpClient) { }
  /**
   * GET docs from the server
   */
  getAllDocs() : Observable<Doc[]> {
    return this.http.get<Doc[]>(`http://localhost:8080/${this.docEndpoint}`)
      .pipe(tap(_ => console.log(`The elements were retrieved from the server`)));
  }

  /**
   * GET doc by id from the server
   */
  getDoc(id: number) : Observable<Doc> {
    return this.http.get<Doc>(`http://localhost:8080/${this.docEndpoint}/${id}`)
      .pipe(tap(el => console.log(`The element ${el} was retrieved from the server`)));
  }

  /**
   * GET docs whose name contains search term
   */
  searchDocs(term: string): Observable<any> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get(`http://localhost:8080/${this.docEndpoint}/?name=${term}`);
  }

  /**
   * POST add a new document to the server
   */
  addDoc(doc: FormData): Observable<FormData> {
    return this.http.post<FormData>(`http://localhost:8080/${this.docEndpoint}/upload`, doc)
      .pipe(tap(el => console.log(`The element ${el} was added to the server`)));
  }

  /**
   * PUT update the doc on the server
   */
  updateDoc(doc: Doc, id: number) : Observable<any> {
    return this.http.put(`http://localhost:8080/${this.docEndpoint}/${id}`, doc)
      .pipe(tap(el => console.log(`The element ${el} was updated on the server`)));
  }

  /**
   * DELETE: delete the doc from the server
   */
  deleteDoc(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/${this.docEndpoint}/${id}`)
      .pipe(tap(el => console.log(`The element ${el} was deleted from the server`)));
  }
}
