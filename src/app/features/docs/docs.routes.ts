import { Routes } from "@angular/router";
import { DocListComponent } from "./doc-list/doc-list.component";

export const docRoutes: Routes = [
    {
        path: '',
        title: 'Last Documents | Notes4Unical - Be the Community',
        component: DocListComponent
    },
    {
        path: 'upload',
        title: 'Upload your Notes! | Notes4Unical - Be the Community',
        loadComponent: () => import('./doc-upload/doc-upload.component').then(c => c.DocUploadComponent),
    },
    {
        path: ':id',
        title: 'Document Overview | Notes4Unical - Be the Community',
        loadComponent: () => import('./doc-content/doc-content.component').then(c => c.DocContentComponent)
    }
]