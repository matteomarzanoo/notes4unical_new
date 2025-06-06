import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { AuthService } from './core/auth/services/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.checkSession()
      .pipe(tap(() => console.log('check session')))
      .subscribe()
  }
}