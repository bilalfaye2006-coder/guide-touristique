import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <h2>Page introuvable (404)</h2>
    <p>La page demandée n'existe pas.</p>
    <a routerLink="/guides">Retour à la liste des guides</a>
  `
})
export class NotFoundComponent {}