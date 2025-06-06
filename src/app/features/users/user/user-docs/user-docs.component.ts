import { Component, Input } from '@angular/core';
import { Doc } from '../../../docs/shared/doc';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-docs',
  imports: [],
  template: `
    <div class="doc-card">
      <div class="doc-title">{{ doc.name }}</div>
      <button class="open-btn" (click)="goToDoc()">Open</button>
    </div>
  `,
  styles: `
    .doc-card {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      padding: 1rem 1.2rem;
      min-width: 180px;
      max-width: 220px;
      margin: 0.5rem;
      gap: 1rem;
    }

    .doc-title {
      font-size: 1.05rem;
      font-weight: 600;
      color: #1976d2;
      margin-bottom: 0.5em;
      word-break: break-word;
    }

    .open-btn {
      align-self: flex-end;
      padding: 0.4em 1.1em;
      border: none;
      border-radius: 4px;
      background: #1976d2;
      color: #fff;
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }

    .open-btn:hover {
      background: #0d47a1;
    }
  `
})
export class UserDocsComponent {
  @Input() doc!: Doc;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  goToDoc() {
    this.router.navigate(['docs', this.doc.id], { state: { docTaken: this.doc }})
  }
}
