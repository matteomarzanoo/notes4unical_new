import { Component, Input, OnInit } from '@angular/core';
import { Doc } from '../shared/doc';

@Component({
  selector: 'app-doc',
  imports: [],
  template: `
    <article class="doc-card">
      <p class="doc-headline">Read <span class="doc-name">{{doc.name}}</span></p>
      <p class="doc-description"> 
        <span class="doc-name">{{doc.name}}</span> wants you to know this about {{doc.name}}:
        {{doc.description}}

      </p>
      <p class="docs-learn-more"><a href="/details/{{index}}">Learn More</a></p>
    <article>
  `,
  styles: [`
  .doc-card {
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    width: 300px;
  }

  .doc-img {
    border-radius: 10px 10px 0 0;
    width: 300px;
  }

  .doc-name {
    font-weight: bolder;
  }

  .doc-description, .doc-headline, .doc-learn-more {
    padding: 10px;
  }

  .doc-headline {
    font-size: 18pt;
  }
`]
})
export class DocComponent implements OnInit {
  @Input() doc!: Doc;
  @Input() index!: Number;

  constructor() { }
  
  ngOnInit(): void {
  }

}
