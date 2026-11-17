import { Routes } from '@angular/router';
import { GuideListComponent } from './pages/guide-list/guide-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'guides', pathMatch: 'full' },
  { path: 'guides', component: GuideListComponent },
  { path: '**', component: NotFoundComponent }
];