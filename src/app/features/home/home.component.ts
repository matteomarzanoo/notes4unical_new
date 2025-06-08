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

export class HomeComponent implements OnInit {
  currentSlide = 0;
  private autoSlideInterval: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startAutoSlide();
  }

  navigateToDocs() {
    this.router.navigate(['/docs']);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % 2;
    this.restartAutoSlide();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + 2) % 2;
    this.restartAutoSlide();
  }

  private startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 10000);
  }

  private restartAutoSlide() {
    clearInterval(this.autoSlideInterval);
    this.startAutoSlide();
  }
}
