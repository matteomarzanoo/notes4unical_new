import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { HomeComponent } from './features/home/home.component';
import { FeedbackComponent } from './shared/feedback/feedback.component';
import { RegisterComponent } from './core/auth/components/register/register.component';
import { LoginComponent } from './core/auth/components/login/login.component';
import { ChangepwdComponent } from './core/auth/components/changepwd/changepwd.component';
import { AdminComponent } from './features/users/admin/admin.component';
import { authGuard } from './core/auth/services/auth.guard';
import { AdminDocsComponent } from './features/users/admin/admin-docs/admin-docs.component';
import { AdminUsersComponent } from './features/users/admin/admin-users/admin-users.component';

export const routes: Routes = [
    { 
        title: 'Homepage | Notes4Unical - Be the Community', 
        path: '', 
        component: HomeComponent 
    },
    { 
        title: 'Login | Notes4Unical - Be the Community', 
        path: 'login', 
        component: LoginComponent 
    },
    { 
        title: 'Register Now! | Notes4Unical - Be the Community', 
        path: 'register', 
        component: RegisterComponent 
    },
    { 
        path: 'docs', 
        loadChildren: () => import('./features/docs/docs.routes').then(c => c.DOC_ROUTES) 
    },
    { 
        path: 'user', 
        loadChildren: () => import('./features/users/users.routes').then(c => c.USERS_ROUTES) 
    },
    {
        title: 'Admin Dashboard | Notes4Unical - Be the Community',
        path: 'admin',
        component: AdminComponent,
        canActivate: [authGuard]
    },
    {
        title: 'Doc Management | Notes4Unical - Be the Community',
        path: 'admin/docs',
        component: AdminDocsComponent,
        canActivate: [authGuard]
    },
    {
        title: 'User List | Notes4Unical - Be the Community',
        path: 'admin/users',
        component: AdminUsersComponent,
        canActivate: [authGuard]
    },
    { 
        title: 'Send a Feedback | Notes4Unical - Be the Community', 
        path: 'feedback', 
        component: FeedbackComponent 
    },
    {
        title: 'Change Password | Notes4Unical - Be the Community',
        path: 'changepwd',
        component: ChangepwdComponent
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
    },
];
