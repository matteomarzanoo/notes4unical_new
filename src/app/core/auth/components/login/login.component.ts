import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../../../../features/users/shared/users';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  
  @ViewChild('email') emailInput!: ElementRef;
  @ViewChild('password') passwordInput!: ElementRef;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

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
      return alert("L'email deve essere del dominio @studenti.unical.it");
    }

    this.authService.login(username, password)
      .subscribe({
        next: (user: User) => {
          sessionStorage.setItem('user', JSON.stringify(user)),
          sessionStorage.setItem('isLoggedIn', 'true'),
          this.router.navigate(['/user', user.name.toLowerCase()], { state: { activeUser: user }})
        },
        error: () => { alert('Credenziali errate!') }
      });
  }
}