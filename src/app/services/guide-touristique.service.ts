import { Injectable } from '@angular/core';
import { GuideTouristique } from '../models/guide-touristique';

@Injectable({ providedIn: 'root' })
export class GuideTouristiqueService {
  private readonly guides: GuideTouristique[] = [
    { id: 1, prenom: 'Aminata', nom: 'Diop', region: 'Dakar',
      langues: ['Français', 'Wolof'], specialites: 'Patrimoine historique', actif: true },
    { id: 2, prenom: 'Mamadou', nom: 'Sagna', region: 'Ziguinchor',
      langues: ['Français', 'Diola'], specialites: 'Écotourisme', actif: true }
  ];

  getAll(): GuideTouristique[] {
    return [...this.guides];
  }
}