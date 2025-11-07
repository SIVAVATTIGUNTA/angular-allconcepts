import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './features/auth/pages/auth.routes';
import { authGuard } from './core/guards/auth.guard';
import { DASHBOARD_ROUTES } from './features/dashboard/pages/dashboard.routes';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full', // this ensures exact match
    },
    {
        path: 'auth',

        loadChildren: () => import('./features/auth/pages/auth.routes').then(m => m.AUTH_ROUTES)
    },

    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadChildren: () => import('./features/dashboard/pages/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
    },
];
