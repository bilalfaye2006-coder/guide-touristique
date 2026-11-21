import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <main>
      <h1>Répertoire des guides touristiques</h1>
      <nav>
        <a routerLink="/guides" routerLinkActive="actif">Guides</a>
        <a routerLink="/ajouter" routerLinkActive="actif">Ajouter un guide</a>
      </nav>
      <router-outlet />
    </main>
  `,
  styles: [`
    main { max-width: 900px; margin: 3rem auto; padding: 0 1rem; font-family: Arial, sans-serif; }
    h1 { color: #087f73; }
    nav { display: flex; gap: 1.5rem; margin-bottom: 1.5rem; }
    nav a { color: #087f73; text-decoration: none; }
    nav a.actif { font-weight: bold; text-decoration: underline; }
  `]
})
export class AppComponent {}