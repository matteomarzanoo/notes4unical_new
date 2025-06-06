import { Component, OnInit } from '@angular/core';
import { User } from '../shared/users';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DocService } from '../../docs/shared/doc.service';
import { AsyncPipe } from '@angular/common';
import { Observable, map } from 'rxjs';
import { Doc } from '../../docs/shared/doc';
import { UserDocsComponent } from './user-docs/user-docs.component';

@Component({
  selector: 'app-user',
  imports: [UserDocsComponent, AsyncPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  currentUser!: User;
  items = [];
  //docs$!: Observable<Doc[]>;
  docs: Doc[] = [
    {
      course: 'Prova1',
      data: new File([], 'esempio.txt'),
      description: 'Questa è una prova',
      name: 'Testo',
      id: 50,
      validated: true,
    }
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private docService: DocService
  ) { 
    this.route.queryParams
      .subscribe(() => {
        if (this.router.getCurrentNavigation()?.extras.state) {
          this.currentUser = this.router.getCurrentNavigation()?.extras.state?.['activeUser'];
        }
      });
    this.titleService.setTitle(`${this.currentUser.name}\'s Profile | Notes4Unical - Be the community`);
  }
  
  ngOnInit(): void {
    /**this.docs$ = this.docService.getUserDocs(this.currentUser.id!)
      .pipe(map(docs => docs.slice().reverse().slice(0, 4)));*/
  }

  goToSettings() {
    this.router.navigate(['settings'], { relativeTo: this.route });
  }
}
