import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, switchMap, catchError, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080'; // Cambia con il tuo backend

  currentUserSubject = new BehaviorSubject<any | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  //LOGIN
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/doLogin`, { email, password });
  }

  //REGISTRAZIONE 
  register(email: string, nome: string, cognome: string, password: string, corsoDiStudio: string): Observable<any> {
    const userData = { email, nome, cognome, password, corsoDiStudio };
    return this.http.post(`${this.apiUrl}/registrazione`, userData);
  }

  //LOGOUT
  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
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