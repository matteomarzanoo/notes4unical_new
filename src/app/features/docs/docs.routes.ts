import { Routes } from "@angular/router";
import { docDeactivateGuard } from "./shared/doc-deactivate.guard";
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
        canActivate: [], // Import the auth guard
        canDeactivate: [docDeactivateGuard]
    },
    {
        path: ':id',
        title: 'Document Overview | Notes4Unical - Be the Community',
        loadComponent: () => import('./doc-content/doc-content.component').then(c => c.DocContentComponent)
    }
]