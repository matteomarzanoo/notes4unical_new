import { Component, OnInit } from '@angular/core';
import { DocService } from '../../../docs/shared/doc.service';
import { Doc } from '../../../docs/shared/doc';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  
  selector: 'app-admin-docs',
  imports: [CommonModule],
  standalone:true, 
  templateUrl: './admin-docs.component.html',
  styleUrls: ['./admin-docs.component.css']
})
export class AdminDocsComponent implements OnInit {
  nonValidati: Doc[] = [];
  validati: Doc[] = [];
  selectedDoc: Doc | null = null;
  adminId = 3;

  constructor(private docService: DocService, private router: Router) {}

  ngOnInit(): void {
    this.docService.getNotValidated().subscribe(data => {
      console.log('Documenti non validati:', data);
      this.nonValidati = data;
    });

    this.docService.getValidated().subscribe(data => {
      console.log('Documenti validati:', data);
      this.validati = data;
    });
  }

  selectDoc(doc: Doc): void {
    this.selectedDoc = doc;
  }


  loadDocuments(): void {
    this.docService.getNotValidated().subscribe(data => this.nonValidati = data);
    this.docService.getValidated().subscribe(data => this.validati = data);
  }

  valida(id: number) {
    this.docService.validateDoc(id, this.adminId).subscribe(() => {
      this.loadDocuments();
    });
  }

  addDocument(): void {
    const demoDoc = new FormData();
    demoDoc.append('name', `Documento Demo ${Date.now()}`);
    demoDoc.append('description', 'Documento di test demo');
    demoDoc.append('file', new Blob(['Contenuto demo'], { type: 'text/plain' }), 'demo.txt');

    this.docService.addDoc(demoDoc).subscribe(() => this.loadDocuments());
  }

  deleteDoc(doc: Doc): void {
    if (doc.id !== undefined) {
      this.docService.deleteDoc(doc.id).subscribe(() => this.loadDocuments());
    } else {
      console.error('ID del documento non definito');
    }
  }

  validateDoc(doc: Doc): void {
    alert(`Documento "${doc.name}" validato!`);
  }

  openDetail(doc: Doc): void {
    this.router.navigate(['/admin/documents', doc.id]);
  }

    goBack() {
      this.router.navigate(['/admin']);
  }

  closePopup(): void {
    this.selectedDoc = null;
  }

  onDownload(): void {
    if (this.selectedDoc) {
      // Per simulare un download (solo esempio)
      const blob = new Blob([`Contenuto del documento "${this.selectedDoc.name}"`], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${this.selectedDoc.name}.txt`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }
}