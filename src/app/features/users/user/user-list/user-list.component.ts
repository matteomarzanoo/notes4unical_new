import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocService } from '../../../docs/shared/doc.service';
import { ActiveUserService } from '../../shared/active-user.service';
import { Title } from '@angular/platform-browser';
import { Doc } from '../../../docs/shared/doc';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  userDocs!: Doc[];

  constructor(
    private router: Router,  
    private docService: DocService, 
    private titleService: Title, 
    private currentUser: ActiveUserService
  ) { this.titleService.setTitle(`${this.currentUser.getUser()!.name}\'s Docs | Notes4Unical - Be the community`) }
  
  ngOnInit(): void {
    this.docService.getUserDocs(this.currentUser.getUser()!.id!)
      .subscribe({
        next: (receivedDocList) => this.userDocs = receivedDocList
      })
  }

  goToContent() {
    this.router.navigate(['docs',])
  }
}
