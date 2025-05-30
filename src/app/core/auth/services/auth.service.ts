import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpParams } from '@angular/common/http';

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
    withCredentials: true // IMPORTANTISSIMO per mandare cookie sessione
  });
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
logout(): void {
  this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe({
    next: () => {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
    },
    error: err => {
      console.error('Errore durante il logout:', err);
    }
  });
}


  //CONTROLLO SE L'UTENTE È LOGGATO
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  isAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }

  getUser(): Observable<any | null> {
    if (this.currentUserSubject.value) {
      // Se l'utente è già presente, restituisci il valore
      return of(this.currentUserSubject.value);
    }

    // Altrimenti, effettua una chiamata HTTP per recuperare l'utente
    return this.http.get<any>(`/api/auth/v1/check-user`, {
      withCredentials: true,
    }).pipe(
      switchMap((user) => {
        // Se l'utente è autenticato, aggiorna il BehaviorSubject
        this.currentUserSubject.next(user);
        return of(user);
      }),
      catchError(() => {
        // In caso di errore (es: 401 Unauthorized), restituisci null
        this.currentUserSubject.next(null);
        return of(null);
      })
    );
  }
}