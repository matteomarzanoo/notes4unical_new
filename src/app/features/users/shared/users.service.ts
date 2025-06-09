import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, retry } from 'rxjs';
import { Doc } from '../../docs/shared/doc';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = 'api/users'
  private apiLikes = 'api/auth/likes'

  constructor(private http: HttpClient) { }
  /**
   * GET return atual logged user
   */
  getUser() {
    return this.http.get(`http://localhost:8080/${this.api}/me`);
  }
  /**
   * Return the value for the activeUser key
   */
  getUserStorage() {
    return sessionStorage.getItem('activeUser');
  }
  /**
   * POST create a user through admin's interface
   */
  createUser(body: Observable<any>) {
    return this.http.post(`http://localhost:8080/${this.api}/register`, body.toString(), { 
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') 
    });
  }
  /**
   * GET document likes by User
   */
  getLikedDocumentsByUser(userId: number): Observable<Doc[]> {
    return this.http.get<Doc[]>(`http://localhost:8080/${this.apiLikes}/user/${userId}`, { withCredentials: true })
      .pipe(
        retry(3),
        tap(likedDocs => console.log(likedDocs))
      )
  }
  /**
   * POST document with heart for favorites
   */
  addLike(userId: number, documentId: number) {
    return this.http.post(`http://localhost:8080/${this.apiLikes}/${userId}/${documentId}`, {}, { withCredentials: true })
      .pipe(
        retry(3),
        tap(addedLike => console.log(addedLike))
      )
  }
}
