import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveUserService } from '../shared/active-user.service';
import { CommonModule } from '@angular/common';

import { Doc } from '../../docs/shared/doc';
import { Subscription } from 'rxjs';
import { DocService } from '../../docs/shared/doc.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  currentTime: Date = new Date();
  private timer: any;
  nonValidati: Doc[] = [];
  validati: Doc[] = [];
  adminId = 3;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    protected currentUser: ActiveUserService,
    private docService: DocService
  ) {}

ngOnInit(): void {

    this.timer = setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  valida(id: number): void {
    this.docService.validateDoc(id, this.adminId).subscribe({
      next: () => {
        // Aggiorna la lista dopo la validazione
        this.docService.getNotValidated().subscribe(data => this.nonValidati = data);
        this.docService.getValidated().subscribe(data => this.validati = data);
      },
      error: (err: any) => {
        console.error('Errore nella validazione:', err);
      }
    });
  }

  changeView(action: string): void {
    switch (action) {
      case 'changePassword':
        this.router.navigate(['changepwd']);
        break;
      case 'users':
        this.router.navigate(['users'], { relativeTo: this.route });
        break;
      case 'documents':
        this.router.navigate(['docs'], { relativeTo: this.route });
        break;
      default:
        this.router.navigate(['/'], { relativeTo: this.route });
        break;
    }
  }
}