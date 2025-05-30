import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('email') emailInput!: ElementRef;
  @ViewChild('password') passwordInput!: ElementRef;

  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit() {
    setTimeout(() => {
      const title = document.querySelector('h1');
      if (title) {
        title.classList.add('no-cursor');
      }
    }, 1500);
  }

  login(event: Event) {
    event.preventDefault();

    const username = this.emailInput.nativeElement.value.trim();
    const password = this.passwordInput.nativeElement.value;

    if (!username.endsWith('@studenti.unical.it')) {
      alert("L'email deve essere del dominio @studenti.unical.it");
      return;
    }

this.authService.login(username, password).subscribe(
  response => {
    console.log('Login riuscito:', response);
    // Qui puoi salvare solo info essenziali:
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', username);
    alert('Login effettuato con successo!');
    this.router.navigate(['/']);
  },
  error => {
    console.error('Errore di login:', error);
    alert('Credenziali errate!');
  }
);

  }
}