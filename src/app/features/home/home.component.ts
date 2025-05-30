import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DocService } from '../../features/docs/shared/doc.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  documents: any[] = [];

  constructor(private documentService: DocService) {}

  ngOnInit(): void {
    this.documentService.getAllDocs().subscribe(
      (data) => {
        this.documents = data;
      },
      (error) => {
        console.error('Errore nel recupero dei documenti:', error);
      }
    );
  }
}