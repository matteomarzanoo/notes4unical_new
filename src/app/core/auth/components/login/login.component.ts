import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '../../../../features/users/shared/users';
import { UserRole } from '../../model/user-role';
import { ActiveUserService } from '../../../../features/users/shared/active-user.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  
  @ViewChild('email') emailInput!: ElementRef;
  @ViewChild('password') passwordInput!: ElementRef;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private currentUser: ActiveUserService
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
      return alert("L'email deve essere del dominio @studenti.unical.it");
    }

    this.authService.login(username, password)
      .subscribe({
        next: (user: User) => {
          this.currentUser.setUser(user)
          if (this.currentUser.getUser()!.role === UserRole.ADMIN) {
            this.router.navigate(['/admin']);
          } else if (this.currentUser.getUser()!.role === UserRole.USER) {
            this.router.navigate(['/user', user.name.toLowerCase()]);
          } else {
            this.router.navigate(['**']);
          }
        },
        error: () => { alert('Credenziali errate!') }
      });
  }
}