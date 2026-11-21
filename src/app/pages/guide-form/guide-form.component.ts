import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { GuideTouristiqueService } from '../../services/guide-touristique.service';

interface GuideFormulaire {
  prenom: string;
  nom: string;
  region: string;
  langues: string;
  specialites: string;
  actif: boolean;
}

@Component({
  selector: 'app-guide-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <h2>Ajouter un guide</h2>

    @if (confirmation) {
      <p class="succes" role="status">{{ confirmation }}</p>
    }

    <form #f="ngForm" (ngSubmit)="enregistrer(f)" novalidate>
      <label for="prenom">Prénom *</label>
      <input id="prenom" name="prenom" [(ngModel)]="modele.prenom"
        required minlength="2" #prenom="ngModel">
      @if (prenom.invalid && (prenom.touched || f.submitted)) {
        <p class="erreur">Le prénom est obligatoire (2 caractères minimum).</p>
      }

      <label for="nom">Nom *</label>
      <input id="nom" name="nom" [(ngModel)]="modele.nom"
        required minlength="2" #nom="ngModel">
      @if (nom.invalid && (nom.touched || f.submitted)) {
        <p class="erreur">Le nom est obligatoire (2 caractères minimum).</p>
      }

      <label for="region">Région *</label>
      <input id="region" name="region" [(ngModel)]="modele.region"
        required #region="ngModel">
      @if (region.invalid && (region.touched || f.submitted)) {
        <p class="erreur">La région est obligatoire.</p>
      }

      <label for="langues">Langues * (séparées par des virgules)</label>
      <input id="langues" name="langues" [(ngModel)]="modele.langues"
        required placeholder="Français, Wolof" #langues="ngModel">
      @if (langues.invalid && (langues.touched || f.submitted)) {
        <p class="erreur">Indiquez au moins une langue.</p>
      }

      <label for="specialites">Spécialités *</label>
      <input id="specialites" name="specialites" [(ngModel)]="modele.specialites"
        required minlength="3" #specialites="ngModel">
      @if (specialites.invalid && (specialites.touched || f.submitted)) {
        <p class="erreur">La spécialité est obligatoire (3 caractères minimum).</p>
      }

      <label class="case">
        <input type="checkbox" name="actif" [(ngModel)]="modele.actif">
        Guide disponible
      </label>

      <button type="submit">Ajouter le guide</button>
    </form>
  `,
  styles: [`
    form { display: flex; flex-direction: column; gap: 0.4rem; max-width: 500px; }
    label { font-weight: bold; margin-top: 0.6rem; }
    input { padding: 0.6rem; font-size: 1rem; }
    .case { display: flex; align-items: center; gap: 0.5rem; font-weight: normal; }
    button { margin-top: 1rem; padding: 0.7rem; background: #087f73; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 1rem; }
    .erreur { color: #b00020; margin: 0; font-size: 0.9rem; }
    .succes { background: #e3f6ef; color: #0a6b4f; padding: 0.8rem; border-radius: 6px; }
  `]
})
export class GuideFormComponent {
  private readonly guideService = inject(GuideTouristiqueService);

  modele: GuideFormulaire = this.formulaireVide();
  confirmation = '';

  enregistrer(form: NgForm): void {
    if (form.invalid) {
      this.confirmation = '';
      return;
    }

    const nouveau = this.guideService.ajouter({
      prenom: this.modele.prenom.trim(),
      nom: this.modele.nom.trim(),
      region: this.modele.region.trim(),
      langues: this.modele.langues.split(',').map(l => l.trim()).filter(l => l !== ''),
      specialites: this.modele.specialites.trim(),
      actif: this.modele.actif
    });

    this.confirmation = `Le guide ${nouveau.prenom} ${nouveau.nom} a été ajouté avec succès.`;
    this.modele = this.formulaireVide();
    form.resetForm(this.modele);
  }

  private formulaireVide(): GuideFormulaire {
    return { prenom: '', nom: '', region: '', langues: '', specialites: '', actif: true };
  }
}