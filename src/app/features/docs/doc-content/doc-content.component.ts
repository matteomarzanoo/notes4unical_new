import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Doc } from '../shared/doc';
import { AuthService } from '../../../core/auth/services/auth.service';
import { Location} from '@angular/common';
import { DocService } from '../shared/doc.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActiveUserService } from '../../users/shared/active-user.service';
import { UserService } from '../../users/shared/users.service';

@Component({
  selector: 'app-doc-content',
  imports: [],
  templateUrl: './doc-content.component.html',
  styleUrls: ['./doc-content.component.css']
})
export class DocContentComponent {
  
  doc!: Doc;
  isFavorite: boolean = false;
  showPopup: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    protected authService: AuthService,
    private location: Location,
    private docService: DocService,
    private currentUser: ActiveUserService,
    private userService: UserService
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
  
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    
    if (this.isFavorite) {
      this.showPopup = true;
      setTimeout(() => {
        this.showPopup = false;
      }, 2000);
    }

    this.userService.addLike(this.currentUser.getUser()!.id!, this.doc.id!)
      .subscribe()
  }

  onBack() {
    this.location.back();
  }
}
