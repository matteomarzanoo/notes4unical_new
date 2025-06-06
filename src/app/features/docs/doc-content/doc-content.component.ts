import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doc } from '../shared/doc';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Location} from '@angular/common';
import { DocService } from '../shared/doc.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-doc-content',
  imports: [],
  templateUrl: './doc-content.component.html',
  styleUrls: ['./doc-content.component.css']
})
export class DocContentComponent {
  doc!: Doc;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    protected authService: AuthService,
    private location: Location,
    private docService: DocService
  ) {
    this.route.queryParams.subscribe(_ => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.doc = this.router.getCurrentNavigation()?.extras.state?.['docTaken']
      }
    });
  }

  onDownload() {
    this.docService.downloadDoc(this.doc.id!)
      .subscribe({
        next: (file) => {
          console.log('start download:', file);
          var url = window.URL.createObjectURL(file);
          var a = document.createElement('a');
          document.body.appendChild(a);
          a.setAttribute('style', 'display: none');
          a.href = url;
          a.download = 'test.doc';
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        }
      });
  }
  
  onBack() {
    this.location.back();
  }
}
