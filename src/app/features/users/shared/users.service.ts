import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api = 'api/users'

  constructor(
    private http: HttpClient,
  ) { }
  /**
   * GET return atual logged user
   */
  getUser() {
    return this.http.get(`http://localhost:8080/${this.api}/me`)
      .pipe(tap(user => console.log(`DEBUG --> Actual user retrieved from the server: ${user}`)))
  }
  /**
   * POST create a user through admin's interface
   */
  createUser(body: Observable<any>) {
    return this.http.post(`http://localhost:8080/${this.api}/register`, body.toString(), { 
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') 
    })
      .pipe(tap(_ => console.log('DEBUG --> The user was created in the DB')));
  }
}
