import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import { DocService } from '../../features/docs/shared/doc.service';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  constructor(private router: Router) { }

  navigateToDocs() {
    this.router.navigate(['/docs']);
  }
}
