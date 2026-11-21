import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { GuideTouristique } from '../models/guide-touristique';

@Injectable({ providedIn: 'root' })
export class GuideTouristiqueService {
  private readonly http = inject(HttpClient);
  private readonly listeGuides = signal<GuideTouristique[]>([]);
  private dejaCharge = false;

  readonly guides = this.listeGuides.asReadonly();

  estCharge(): boolean {
    return this.dejaCharge;
  }

  charger(): Observable<GuideTouristique[]> {
    return this.http.get<GuideTouristique[]>('/api/guides.json').pipe(
      tap(data => {
        this.listeGuides.update(ajoutes => [...data, ...ajoutes]);
        this.dejaCharge = true;
      })
    );
  }

  ajouter(guide: Omit<GuideTouristique, 'id'>): GuideTouristique {
    const nouveau: GuideTouristique = { ...guide, id: Date.now() };
    this.listeGuides.update(liste => [...liste, nouveau]);
    return nouveau;
  }
}