import { Component, OnInit } from '@angular/core';
import { DocService } from '../../../docs/shared/doc.service';
import { Doc } from '../../../docs/shared/doc';
import { Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { ActiveUserService } from '../../shared/active-user.service';

@Component({
  
  selector: 'app-admin-docs',
  imports: [CommonModule],
  standalone:true, 
  templateUrl: './admin-docs.component.html',
  styleUrls: ['./admin-docs.component.css']
})
export class AdminDocsComponent implements OnInit {
  
  docs: Doc[] = [];
  selectedDoc!: Doc | null;

  constructor(private docService: DocService, private router: Router, private location: Location, private currentUser: ActiveUserService) { }

  ngOnInit(): void {
    this.docService.getDocsNotValid()
      .subscribe({
        next: (docs) => { this.docs = docs },
        error: () => { console.error('Error retrieving docs') }
      });
  }

  selectDoc(doc: Doc): void {
    this.selectedDoc = doc;
  }

  addDocument(): void {
    this.router.navigate(['docs/upload']);
  }

  deleteDoc(doc: Doc): void {
    this.docService.deleteDoc(doc.id!)
      .subscribe({
        next: () => this.ngOnInit()
      });
  }

  validateDoc(doc: Doc): void {
    this.docService.validateDoc(doc.id!, this.currentUser.getUser()!.id!)
  }

  goBack() {
    this.location.back();
  }

  closePopup(): void {
    this.selectedDoc = null;
  }

  onDownload(): void {
    this.docService.downloadDoc(this.selectedDoc!.id!)
      .subscribe({
        next: (file) => {
          console.log(file);
          const byteCharacters = atob(file.base64Content);
          const byteNumbers = Array.from(byteCharacters, c => c.charCodeAt(0));
          const byteArray = new Uint8Array(byteNumbers);

          const blob = new Blob([byteArray]);
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = file.fileName || 'downloaded_file' + (file.fileExtension ? '.' + file.fileExtension : '');
          a.click();
          window.URL.revokeObjectURL(url);
          }
      });
  }
}