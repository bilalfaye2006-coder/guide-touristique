import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GuideTouristique } from './models/guide-touristique';
import { GuideTouristiqueService } from './services/guide-touristique.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <main>
      <h1>Guides touristiques</h1>

      <input type="search" [(ngModel)]="recherche"
        placeholder="Rechercher un guide"
        aria-label="Rechercher un guide">

      @for (guide of guidesFiltres; track guide.id) {
        <article>
          <h2>{{ guide.prenom }} {{ guide.nom }}</h2>
          <p>Région : {{ guide.region }}</p>
          <p>Spécialités : {{ guide.specialites }}</p>
        </article>
      } @empty {
        <p>Aucun résultat pour cette recherche.</p>
      }

      <button type="button" [disabled]="enChargement" (click)="afficherMessage()">Contacter</button>
      <p>{{ message }}</p>
    </main>
  `,
  styles: [`
    main { max-width: 900px; margin: 3rem auto; font-family: Arial, sans-serif; }
    h1 { color: #087f73; }
    input { width: 100%; padding: 0.6rem; margin-bottom: 1rem; font-size: 1rem; }
    article { border: 1px solid #ddd; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; }
    button { padding: 0.6rem 1.2rem; background: #087f73; color: white; border: none; border-radius: 6px; cursor: pointer; }
  `]
})
export class AppComponent implements OnInit {
  private readonly guideService = inject(GuideTouristiqueService);

  guides: GuideTouristique[] = [];
  recherche = '';
  message = '';
  enChargement = false;

  ngOnInit(): void {
    this.guides = this.guideService.getAll();
  }

  get guidesFiltres(): GuideTouristique[] {
    const q = this.recherche.trim().toLocaleLowerCase('fr');
    return this.guides.filter(g =>
      `${g.prenom} ${g.nom} ${g.specialites}`.toLocaleLowerCase('fr').includes(q)
    );
  }

  afficherMessage(): void {
    this.message = 'Fonction à compléter dans le TP.';
  }
}