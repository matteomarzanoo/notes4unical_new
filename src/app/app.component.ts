import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { AuthService } from './core/auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkSession().subscribe(user => {
      if (user && user.email) {
        console.log('Sessione valida per:', user.email);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', user.email);
      } else {
        localStorage.clear();
        console.log('Sessione non valida: rimosso stato login');
      }
    });
  }
}