import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocService } from '../shared/doc.service';
import { DocComponent } from "../doc/doc.component";
import { Subscription, tap } from 'rxjs';
import { Doc } from '../shared/doc';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doc-list',
  imports: [DocComponent],
  template: `
    <h2>List of latest uploads</h2>
    <input 
      type="text" 
      id="finder" 
      placeholder="Find a Document">
    <article>
      @for (doc of docs; track $index) {
        @if (doc.validated) {
          <app-doc [index]="$index" [doc]="doc"/>
        }
      } @empty {
        <li>There are no items.</li>
      }
    </article>
  `,
  styles: ``
})
export class DocListComponent implements OnInit, OnDestroy {

  docs: Doc[] = [];
  private docsSub?: Subscription;

  constructor(
    private readonly docService: DocService,
    private router: Router
  ) { }
  
  ngOnDestroy(): void {
    if (this.docsSub) {
      this.docsSub.unsubscribe();
      this.docsSub.closed;
    }
  }

  ngOnInit(): void {
    this.docsSub = this.docService.getAllDocs()
      .pipe(tap(e => console.log(`This is the elem -> ${e}, ${typeof e}`)))
      .subscribe(docs => {
        if (!(Object.keys(docs).length === 0) || !(docs.constructor === Object)) {
          this.docs = docs;
        }
      })
    
    console.log(
      this.router.config
    )
  }
}
