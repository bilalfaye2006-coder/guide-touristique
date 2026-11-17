import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <main>
      <h1>Répertoire des guides touristiques</h1>
      <nav>
        <a routerLink="/guides">Guides</a>
        <a routerLink="/page-inexistante">Tester la page 404</a>
      </nav>
      <router-outlet />
    </main>
  `,
  styles: [`
    main { max-width: 900px; margin: 3rem auto; font-family: Arial, sans-serif; }
    h1 { color: #087f73; }
    nav { display: flex; gap: 1.5rem; margin-bottom: 1.5rem; }
    nav a { color: #087f73; font-weight: bold; }
  `]
})
export class AppComponent {}