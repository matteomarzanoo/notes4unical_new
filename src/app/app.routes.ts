import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '',
        title: 'Homepage | Notes4Unical - Be the Community',
        component: DashboardComponent,
        children: []
    },
    {
        path: 'docs',
        loadChildren: () => import('./features/docs/docs.routes').then(r => r.docRoutes)
    },
    {
        path: 'profile',
        loadChildren: () => import('./features/users/user.routes').then(r => r.userRoutes)
    },
    {
        path: 'feedback',
        title: 'Send a Feedback | Notes4Unical - Be the Community',
        loadComponent: () => import('./shared/feedback/feedback.component').then(c => c.FeedbackComponent)
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: '**',
        title: 'Oops! Something is missing',
        component: PageNotFoundComponent
    }
];
