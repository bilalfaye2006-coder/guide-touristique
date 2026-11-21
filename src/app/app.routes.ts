import { Routes } from '@angular/router';
import { GuideListComponent } from './pages/guide-list/guide-list.component';
import { GuideFormComponent } from './pages/guide-form/guide-form.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'guides', pathMatch: 'full' },
  { path: 'guides', component: GuideListComponent },
  { path: 'ajouter', component: GuideFormComponent },
  { path: '**', component: NotFoundComponent }
];