import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users'; // prefisso corretto

  constructor(private http: HttpClient) {}

  // LOGIN
login(email: string, password: string): Observable<any> {
  const body = new HttpParams()
    .set('email', email)
    .set('password', password);

  const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  return this.http.post(`${this.apiUrl}/login`, body.toString(), {
    headers: headers,
    withCredentials: true
  }).pipe(
    tap((response: any) => {
      // Salva in localStorage i dati dell’utente appena ricevuti dal backend
      localStorage.setItem('user', JSON.stringify(response));
      // Puoi anche settare il flag di login se vuoi
      localStorage.setItem('isLoggedIn', 'true');
      console.log(response);
    })
  );
}



  // REGISTRAZIONE
 register(email: string, nome: string, cognome: string, password: string, corsoDiStudio: string) {
  const utente = {
    email: email,
    name: nome,                
    surname: cognome,       
    password: password,
    faculty: corsoDiStudio   
  };
  return this.http.post('http://localhost:8080/api/users/register', utente, {
    withCredentials: true // importante se usi sessione/cookie
  });
}



  //LOGOUT
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }


  //CONTROLLO SE L'UTENTE È LOGGATO
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  isAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }

checkSession() {
  return this.http.get<any>(`${this.apiUrl}/check-session`, { withCredentials: true })
    .pipe(
      catchError(err => {
        // Se errore (es. 401), ritorna un errore che arriva all’error handler del subscribe
        return of(null); // oppure throwError(err) se vuoi gestire diversamente
      })
    );
}
}