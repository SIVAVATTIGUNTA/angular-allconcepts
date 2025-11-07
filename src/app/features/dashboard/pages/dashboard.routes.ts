 // src/app/features/dashboard/dashboard.routes.ts
import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ReportsComponent } from './reports/reports.component';


export const DASHBOARD_ROUTES: Routes = [
  // When the parent route matches '/dashboard'
  { path: '', component: MainComponent }, // This will be /dashboard
  { path: 'reports', component: ReportsComponent }, // This will be /dashboard/reports
];