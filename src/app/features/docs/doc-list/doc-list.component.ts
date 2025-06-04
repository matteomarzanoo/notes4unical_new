import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocService } from '../shared/doc.service';
import { DocComponent } from "../doc/doc.component";
import { Observable, Subject, debounceTime, switchMap, distinctUntilChanged, startWith } from 'rxjs';
import { Doc } from '../shared/doc';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-doc-list',
  imports: [DocComponent, AsyncPipe],
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.css']
})
export class DocListComponent implements OnInit, OnDestroy {
  docs$!: Observable<Doc[]>;
  private searchTerms = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private docService: DocService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const allDocs$ = this.docService.getAllDocs()
        .pipe(
     map(docs => docs.slice().reverse().slice(0, 10)) // ultimi 10 docuemnrti inseriti
    );

    this.docs$ = this.searchTerms
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => term.trim()
          ? this.docService.searchDocs(term)
          : allDocs$
        )
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  goToUpload(): void {
    this.router.navigate(['upload'], { relativeTo: this.route });
  }
}