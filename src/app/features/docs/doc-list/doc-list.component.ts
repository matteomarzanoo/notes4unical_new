import { Component, OnInit } from '@angular/core';
import { DocService } from '../shared/doc.service';
import { DocComponent } from '../doc/doc.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doc-list',
  imports: [CommonModule, DocComponent],
  template: `
    <section class="hero-section">
      <h2 class="hero-text">Questa è una lista di documenti</h2>
    </section>
    <article class="doc-list">
      <app-doc *ngFor="let doc of docService.docs; let i = index" [index]="i" [doc]="doc"/>
    </article>
  `,
  styles: [`
  .doc-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px; 
    padding: 10px;
  }

  .hero-text {
    font-size: 25pt;
    padding: 10px;
  }
`]
})
export class DocListComponent implements OnInit {
  constructor(readonly docService: DocService) { }
  
  // Printing type here
  ngOnInit(): void {
    console.log(this.docService.docs);
  }
}
