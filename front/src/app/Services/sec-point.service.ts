import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SecPoint } from 'app/Model/SecPoint';

@Injectable({
  providedIn: 'root'
})
export class SecPointService {
  private baseUrl = 'http://localhost:8089/SecPoint';

  constructor(private http: HttpClient) {}

  // Récupérer tous les SecPoint
  getAllSecPoints(): Observable<SecPoint[]> {
    return this.http.get<SecPoint[]>(`${this.baseUrl}/allSecPoint`);
  }

  // Ajouter un nouveau SecPoint
  addSecPoint(secPoint: SecPoint): Observable<Object> {
    return this.http.post(`${this.baseUrl}/addSecPoint`, secPoint);
  }

  // Récupérer un SecPoint par ID
  getSecPointById(id: number): Observable<SecPoint> {
    return this.http.get<SecPoint>(`${this.baseUrl}/get/${id}`);
  }

  // Supprimer un SecPoint par ID
  deleteSecPoint(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  // Mettre à jour un SecPoint existant
  updateSecPoint(secPoint: SecPoint): Observable<SecPoint> {
    return this.http.put<SecPoint>(`${this.baseUrl}/updateSecPoint`, secPoint);
  }

  // Activer ou désactiver un SecPoint
  activate(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/approuve/${id}`, {});
  }

  // Mettre à jour une remarque pour un SecPoint
  updateSecPointRemarque(secPointId: number, remarque: string): Observable<void> {
    const url = `${this.baseUrl}/update-remarque/${secPointId}`;
    return this.http.put<void>(url, { remarque });
  }
}
