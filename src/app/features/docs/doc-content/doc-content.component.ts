import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doc } from '../shared/doc';
import { Location } from '@angular/common';

@Component({
  selector: 'app-doc-content',
  imports: [],
  template: `
    <h1>Questo è il contenuto di un documento di prova</h1>
    <h2>Autore: {{ doc.user_id }}</h2>
    <h3>Frequentante il corso di: {{ doc.course }}</h3>
    <p>Descrizione breve: {{ doc.description }}</p>

    <!-- Aggiungere controllo sull'auth. Se non loggato, allora non può accedere -->
    <button type="submit" (click)="onDownload()" >Download</button>
    <button type="button" (click)="onBack()">Back</button>
    
  `,
  styles: ``
})
export class DocContentComponent {
  doc!: Doc;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.route.queryParams.subscribe(_ => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.doc = this.router.getCurrentNavigation()?.extras.state?.['docTaken']
      }
    });
  }

  onDownload() { }

  onBack() {
    console.log(this.router.config)
    this.router.navigate(['../'], { relativeTo: this.route })
  }
}
