import { Component, OnInit } from '@angular/core';
import { DocService } from './doc.service';
import { Doc } from './doc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-docs',
  templateUrl: './admin-docs.component.html',
  styleUrls: ['./admin-docs.component.css']
})
export class AdminDocsComponent implements OnInit {
  documents: Doc[] = [];

  constructor(private docService: DocService, private router: Router) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.docService.getDocsValid().subscribe(docs => {
      this.documents = docs;
    });
  }

  addDocument(): void {
    // Qui puoi aprire un form o altro per caricare il documento
    // oppure creare un doc demo come prima
    // esempio demo (da modificare se serve upload vero)
    const demoDoc = new FormData();
    demoDoc.append('name', `Documento Demo ${Date.now()}`);
    demoDoc.append('description', 'Documento di test demo');
    demoDoc.append('file', new Blob(['Contenuto demo'], { type: 'text/plain' }), 'demo.txt');

    this.docService.addDoc(demoDoc).subscribe(() => this.loadDocuments());
  }

  deleteDoc(doc: Doc): void {
    this.docService.deleteDoc(doc.id).subscribe(() => this.loadDocuments());
  }

  validateDoc(doc: Doc): void {
    // Se hai una API validate usa quella, altrimenti alert demo
    alert(`Documento "${doc.name}" validato!`);
    // eventualmente ricarica lista o aggiorna stato
  }

  openDetail(doc: Doc): void {
    this.router.navigate(['/admin/documents', doc.id]); // naviga al componente dettaglio
  }
}