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

    <div class="filtres">
      <input type="search" [(ngModel)]="recherche"
        placeholder="Rechercher par nom ou spécialité"
        aria-label="Rechercher un guide">

      <select [(ngModel)]="regionChoisie" aria-label="Filtrer par région">
        <option value="">Toutes les régions</option>
        @for (region of regions; track region) {
          <option [value]="region">{{ region }}</option>
        }
      </select>
    </div>

    @if (message) {
      <p class="succes" role="status">{{ message }}</p>
    }

    @if (enChargement()) {
      <p>Chargement des guides…</p>
    } @else if (erreur()) {
      <p class="erreur">{{ erreur() }}</p>
    } @else {
      <p class="compteur">{{ guidesFiltres.length }} guide(s) trouvé(s)</p>

      @for (guide of guidesFiltres; track guide.id) {
        <article>
          <h3>{{ guide.prenom }} {{ guide.nom }}</h3>
          <p>Région : {{ guide.region }}</p>
          <p>Langues : {{ guide.langues.join(', ') }}</p>
          <p>Spécialités : {{ guide.specialites }}</p>
          <button type="button" [disabled]="!guide.actif" (click)="contacter(guide)">
            {{ guide.actif ? 'Contacter' : 'Indisponible' }}
          </button>
        </article>
      } @empty {
        <p>Aucun guide ne correspond à votre recherche.</p>
        <button type="button" (click)="reinitialiser()">Effacer les filtres</button>
      }
    }
  `,
  styles: [`
    .filtres { display: flex; gap: 1rem; margin-bottom: 1rem; }
    input { flex: 1; padding: 0.6rem; font-size: 1rem; }
    select { padding: 0.6rem; font-size: 1rem; }
    article { border: 1px solid #ddd; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; }
    button { padding: 0.6rem 1.2rem; background: #087f73; color: white; border: none; border-radius: 6px; cursor: pointer; }
    button:disabled { background: #999; cursor: not-allowed; }
    .compteur { color: #555; }
    .succes { background: #e3f6ef; color: #0a6b4f; padding: 0.8rem; border-radius: 6px; }
    .erreur { color: #b00020; font-weight: bold; }
  `]
})
export class GuideListComponent implements OnInit {
  private readonly guideService = inject(GuideTouristiqueService);

  guides = this.guideService.guides;
  enChargement = signal(false);
  erreur = signal('');
  recherche = '';
  regionChoisie = '';
  message = '';

  ngOnInit(): void {
    if (!this.guideService.estCharge()) {
      this.enChargement.set(true);
      this.guideService.charger().subscribe({
        next: () => this.enChargement.set(false),
        error: () => {
          this.erreur.set('Impossible de charger les guides. Réessayez plus tard.');
          this.enChargement.set(false);
        }
      });
    }
  }

  get regions(): string[] {
    const toutes = this.guides().map(g => g.region);
    return [...new Set(toutes)].sort((a, b) => a.localeCompare(b, 'fr'));
  }

  get guidesFiltres(): GuideTouristique[] {
    const q = this.recherche.trim().toLocaleLowerCase('fr');
    return this.guides().filter(g => {
      const texte = `${g.prenom} ${g.nom} ${g.specialites}`.toLocaleLowerCase('fr');
      const bonneRegion = this.regionChoisie === '' || g.region === this.regionChoisie;
      return texte.includes(q) && bonneRegion;
    });
  }

  contacter(guide: GuideTouristique): void {
    this.message = `Votre demande de contact a bien été envoyée à ${guide.prenom} ${guide.nom}.`;
  }

  reinitialiser(): void {
    this.recherche = '';
    this.regionChoisie = '';
  }
}