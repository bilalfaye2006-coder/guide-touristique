import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GuideTouristique } from '../models/guide-touristique';

@Injectable({ providedIn: 'root' })
export class GuideTouristiqueService {
  private readonly http = inject(HttpClient);

  lister(): Observable<GuideTouristique[]> {
    return this.http.get<GuideTouristique[]>('/api/guides.json');
  }
}