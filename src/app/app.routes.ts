import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { HomeComponent } from './features/home/home.component';
import { FeedbackComponent } from './shared/feedback/feedback.component';
import { RegisterComponent } from './core/auth/components/register/register.component';
import { LoginComponent } from './core/auth/components/login/login.component';

export const routes: Routes = [
    {
        title: 'Homepage | Notes4Unical - Be the Community',
        path: '',
        component: HomeComponent
    },
    {
        title: 'Login | Notes4Unical - Be the Community',
        path: 'login',
        component: LoginComponent,
    },
    {
        title: 'Register Now! | Notes4Unical - Be the Community',
        path: 'register',
        component: RegisterComponent,
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
        title: 'Send a Feedback | Notes4Unical - Be the Community',
        path: 'feedback',
        component: FeedbackComponent
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        title: 'Oops! Something is missing',
        path: '**',
        component: PageNotFoundComponent
    }
];
