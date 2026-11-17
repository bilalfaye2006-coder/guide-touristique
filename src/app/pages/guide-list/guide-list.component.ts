import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GuideTouristique } from '../../models/guide-touristique';
import { GuideTouristiqueService } from '../../services/guide-touristique.service';

@Component({
  selector: 'app-guide-list',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Liste des guides</h2>

    <input type="search" [(ngModel)]="recherche"
      placeholder="Rechercher un guide"
      aria-label="Rechercher un guide">

    @if (enChargement()) {
      <p>Chargement des guides…</p>
    } @else if (erreur()) {
      <p class="erreur">{{ erreur() }}</p>
    } @else {
      @for (guide of guidesFiltres; track guide.id) {
        <article>
          <h3>{{ guide.prenom }} {{ guide.nom }}</h3>
          <p>Région : {{ guide.region }}</p>
          <p>Spécialités : {{ guide.specialites }}</p>
        </article>
      } @empty {
        <p>Aucun résultat pour cette recherche.</p>
      }
    }

    <button type="button" [disabled]="enChargement()" (click)="afficherMessage()">Contacter</button>
    <p>{{ message }}</p>
  `,
  styles: [`
    input { width: 100%; padding: 0.6rem; margin-bottom: 1rem; font-size: 1rem; }
    article { border: 1px solid #ddd; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; }
    button { padding: 0.6rem 1.2rem; background: #087f73; color: white; border: none; border-radius: 6px; cursor: pointer; }
    .erreur { color: #b00020; font-weight: bold; }
  `]
})
export class GuideListComponent implements OnInit {
  private readonly guideService = inject(GuideTouristiqueService);

  guides = signal<GuideTouristique[]>([]);
  enChargement = signal(false);
  erreur = signal('');
  recherche = '';
  message = '';

  ngOnInit(): void {
    this.enChargement.set(true);
    this.guideService.lister().subscribe({
      next: (data) => {
        this.guides.set(data);
        this.enChargement.set(false);
      },
      error: () => {
        this.erreur.set('Impossible de charger les guides. Réessayez plus tard.');
        this.enChargement.set(false);
      }
    });
  }

  get guidesFiltres(): GuideTouristique[] {
    const q = this.recherche.trim().toLocaleLowerCase('fr');
    return this.guides().filter(g =>
      `${g.prenom} ${g.nom} ${g.specialites}`.toLocaleLowerCase('fr').includes(q)
    );
  }

  afficherMessage(): void {
    this.message = 'Fonction à compléter dans le TP.';
  }
}