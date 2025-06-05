import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DocService } from '../../features/docs/shared/doc.service';
import { AuthService } from '../../core/auth/services/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  documents: any[] = [];

  constructor(
    private documentService: DocService,
    private test: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.documentService.getValidDocs().subscribe(
      (data) => {
        console.log('Documenti ricevuti dalla home:', data);
        this.documents = data;
      },
      (error) => {
        console.error('Errore nel recupero dei documenti:', error);
      }
    );
  }

  navigateToDocs() {
    this.router.navigate(['/docs']);
  }
}
