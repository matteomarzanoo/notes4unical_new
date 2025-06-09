import { Component, OnInit } from '@angular/core';
import { User } from '../shared/users';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DocService } from '../../docs/shared/doc.service';
import { AsyncPipe } from '@angular/common';
import { Observable, map } from 'rxjs';
import { Doc } from '../../docs/shared/doc';
import { UserDocsComponent } from './user-docs/user-docs.component';
import { ActiveUserService } from '../shared/active-user.service';
import { UserService } from '../shared/users.service';

@Component({
  selector: 'app-user',
  imports: [UserDocsComponent, RouterLink, AsyncPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  
  user!: User;
  favs$!: Observable<Doc[]>;
  docs$!: Observable<Doc[]>;

  constructor(
    private router: Router,
    private docService: DocService,
    private userService: UserService,
    private currentUser: ActiveUserService,
    private titleService: Title
  ) { 
    this.user = this.currentUser.getUser()!;
    this.titleService.setTitle(`${this.currentUser.getUser()!.name}\'s Profile | Notes4Unical - Be the community`);
  }
  
  ngOnInit(): void {
    this.docs$ = this.docService.getUserDocs(this.user.id!)
      .pipe(map(docs => docs.slice().reverse().slice(0, 4)));

    this.favs$ = this.userService.getLikedDocumentsByUser(this.user.id!)
      .pipe(map(favDocs => favDocs.slice().reverse().slice(0, 4)));
  }

  goToSettings() {
    this.router.navigate(['settings']);
  }

  goToUpload() {
    this.router.navigate(['docs/upload'])
  }
}
