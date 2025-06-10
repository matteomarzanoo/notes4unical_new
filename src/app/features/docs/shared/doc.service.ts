import { Injectable } from '@angular/core';
import { Doc, DocFile } from './doc';
import { HttpClient } from '@angular/common/http';
import { Observable, of, retry, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocService {

  private readonly openApi = 'api/open';
  private readonly authApi = 'api/auth';
  
  constructor(private http: HttpClient) { }
  /**
   * GET all docs from the server
   */
  getAllDocs(): Observable<Doc[]> {
    return this.http.get<Doc[]>(`http://localhost:8080/${this.openApi}/documents`)
      .pipe(
        retry(3),
        tap((list) => console.log(list))
      );
  }
  /**
   * GET docs from the server
   */
  getDocsValid(): Observable<Doc[]> {
    return this.http.get<Doc[]>(`http://localhost:8080/${this.openApi}/documents/valid`)
      .pipe(
        retry(3),
        tap((list) => console.log(list))
      );
  }
  /**
   * GET all doc not validated from the server 
   */
  getDocsNotValid(): Observable<Doc[]> {
    return this.http.get<Doc[]>(`http://localhost:8080/${this.authApi}/documents/not-valid`, { withCredentials: true })
      .pipe(
        retry(3),
        tap((list) => console.log(list))
      );
  }
  /**
   * GET doc by id from the server
   */
  getDoc(id: number): Observable<Doc> {
    return this.http.get<Doc>(`http://localhost:8080/${this.authApi}/documents/${id}`, { withCredentials: true })
      .pipe(
        retry(3),
        tap(doc => console.log(doc))
      );
  }
  /**
   * GET docs of certain user
   */
  getUserDocs(userId: number): Observable<Doc[]> {
    return this.http.get<Doc[]>(`http://localhost:8080/${this.authApi}/documents/user/${userId}`, { withCredentials: true })
      .pipe(
        retry(3),
        tap(userDocs => console.log(userDocs))
      )
  }
  /**
   * GET doc file by id from the server with an authenticated account
   */
  downloadDoc(id: number): Observable<DocFile> {
    return this.http.get<DocFile>(`http://localhost:8080/${this.authApi}/documents/download-json/${id}`, { withCredentials: true })
      .pipe(
        retry(3)
      );
  }
  /**
   * GET docs whose name contains search term
   */
  searchDocs(term: string): Observable<Doc[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Doc[]>(`http://localhost:8080/${this.openApi}/documents/course/${term}`)
      .pipe(
        tap(x => x.length ? console.log(`found docs matching ${term}`) : console.log(`no docs mathing ${term}`))
      )
  }
  /**
   * POST add a new document to the server
   */
  addDoc(doc: FormData): Observable<FormData> {
    return this.http.post<FormData>(`http://localhost:8080/${this.authApi}/documents/upload`, doc, { withCredentials: true })
      .pipe(
        retry(3),
        tap(el => console.log(el))
      );
  }
  /**
   * DELETE delete the doc from the server with an authenticated account
   */
  deleteDoc(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/${this.authApi}/documents/${id}`, { withCredentials: true })
      .pipe(retry(3));
  }
  /**
   * PATCH validate a document through admin
   */
  validateDoc(documentId: number, adminId: number): Observable<void> {
    return this.http.patch<void>(`http://localhost:8080/api/admin/documents/${documentId}/validate/${adminId}`, {}, { withCredentials: true })
      .pipe(
        retry(3),
        tap(el => console.log(el))
      );
  }
}
