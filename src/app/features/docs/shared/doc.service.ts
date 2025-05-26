import { inject, Injectable } from '@angular/core';
import { Doc } from './doc';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocService {
  private http = inject(HttpClient);
  private docEndpoint = 'api/documents';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  /**
   * GET docs from the server
   */
  getAllDocs() : Observable<Doc[]> {
    return this.http.get<Doc[]>(this.docEndpoint);
  }

  /**
   * GET doc by id from the server
   */
  getDoc(id: number) : Observable<Doc> {
    return this.http.get<Doc>(`${this.docEndpoint}/${id}`);
  }

  /**
   * GET docs whose name contains search term
   */
  searchDocs(term: string): Observable<Doc[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Doc[]>(`${this.docEndpoint}/?name=${term}`);
  }

  /**
   * POST add a new document to the server
   */
  addDoc(doc: FormData): Observable<FormData> {
    return this.http.post<FormData>(`localhost:8080/api/documents/upload`, doc, this.httpOptions);
  }

  /**
   * PUT update the doc on the server
   */
  updateDoc(doc: Doc, id: number) : Observable<any> {
    return this.http.put(`${this.docEndpoint}/${id}`, doc, this.httpOptions);
  }

  /**
   * DELETE: delete the doc from the server
   */
  deleteDoc(id: number): Observable<Doc> {
    return this.http.delete<Doc>(`${this.docEndpoint}/${id}`, this.httpOptions);
  }

  // Mock di prova
  docs: Doc[] = [
    {
      file: new File(["Contenuto di esempio"], "esempio.txt", {type: "text/plain"}),
      name: 'Testo 1',
      description: "Questa è una prova",
      course: "Informatica"
    }
  ]
}
