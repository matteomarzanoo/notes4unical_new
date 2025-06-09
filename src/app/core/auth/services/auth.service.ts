import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private loginApi = 'api/users';

  constructor(private http: HttpClient) { }
  /**
   * Send a login request to the server
   */
  login(email: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.post<any>(`http://localhost:8080/${this.loginApi}/login`, body.toString(), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: true }) 
  }
  /**
   * Send a logout request to the backend
   */
  logout(): Observable<any> {
    return this.http.post(`http://localhost:8080/${this.loginApi}/logout`, {}, { withCredentials: true });
  }
  /**
   * Send the form for the actual registration on the server
   */
  register(email: string, nome: string, cognome: string, password: string, corsoDiStudio: string) {
    const utente = {
      email: email,
      name: nome,                
      surname: cognome,       
      password: password,
      faculty: corsoDiStudio   
    };
    return this.http.post('http://localhost:8080/api/users/register', utente, { withCredentials: true });
  }
}