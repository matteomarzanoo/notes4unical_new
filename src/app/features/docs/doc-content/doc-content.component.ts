import { Component, inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doc } from '../shared/doc';
import { DocService } from '../shared/doc.service';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-doc-content',
  imports: [],
  templateUrl: './doc-content.component.html',
  styleUrls: ['./doc-content.component.css']
})
export class DocContentComponent {
  doc!: Doc;
  auth = inject(AuthService);
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private docService: DocService,
  ) {
    this.route.queryParams.subscribe(_ => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.doc = this.router.getCurrentNavigation()?.extras.state?.['docTaken']
      }
    });

    console.log('User auth? -> ' + this.auth.isLoggedIn());
  }

  onDownload() {
    this.docService.downloadDoc(this.doc.id!)
      .subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'filename.ext';
        document.body.appendChild(a);
        a.click();

        // Pulizia
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
  }
  
  onBack() {
    console.log(this.router.config)
    this.router.navigate(['../'], { relativeTo: this.route })
  }
}
