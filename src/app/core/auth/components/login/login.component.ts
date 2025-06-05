import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from '../../../../features/users/shared/users';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('email') emailInput!: ElementRef;
  @ViewChild('password') passwordInput!: ElementRef;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute
  ) { }

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

    this.authService.login(username, password)
      .pipe(tap(() => console.log('Login effettuato con successo')))
      .subscribe((user: User) => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', username);
        this.router.navigate(['/user', user.name.toLowerCase()], {
          state: { activeUser: user },
          relativeTo: this.route
        })
      }, (err) => {
        console.error('Errore di login:', err);
        alert('Credenziali errate!');
      })
  }
}