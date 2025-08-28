import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Crowdstrike } from 'app/Model/Crowdstrike';

@Injectable({
  providedIn: 'root'
})
export class CrowdstrikeService {
  private baseUrl = 'http://localhost:8089/Crowdstrike'; // Adaptez l'URL selon votre API

  constructor(private http: HttpClient) {}

  // Récupérer tous les Crowdstrikes
  getAllCrowdstrikes(): Observable<Crowdstrike[]> {
    return this.http.get<Crowdstrike[]>(`${this.baseUrl}/allCrowdstrike`);
  }

  // Ajouter un nouveau Crowdstrike
  addCrowdstrike(crowdstrike: Crowdstrike): Observable<Object> {
    return this.http.post(`${this.baseUrl}/addCrowdstrike`, crowdstrike);
  }

  // Récupérer un Crowdstrike par ID
  getCrowdstrikeById(id: number): Observable<Crowdstrike> {
    return this.http.get<Crowdstrike>(`${this.baseUrl}/get/${id}`);
  }

  // Supprimer un Crowdstrike par ID
  deleteCrowdstrike(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  // Mettre à jour un Crowdstrike existant
  updateCrowdstrike(crowdstrike: Crowdstrike): Observable<Crowdstrike> {
    return this.http.put<Crowdstrike>(`${this.baseUrl}/updateCrowdstrike`, crowdstrike);
  }

  // Activer ou désactiver un Crowdstrike
  activate(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/approuve/${id}`, {});
  }

  // Mettre à jour le type de Crowdstrike
  updateCrowdstrikeType(crowdstrikeId: number, type: string): Observable<void> {
    const url = `${this.baseUrl}/update-type/${crowdstrikeId}`;
    return this.http.put<void>(url, { type });
  }

  // Mettre à jour la remarque d'un Crowdstrike
  updateCrowdstrikeRemarks(crowdstrikeId: number, remarques: string): Observable<void> {
    const url = `${this.baseUrl}/update-remarks/${crowdstrikeId}`;
    return this.http.put<void>(url, { remarques });
  }
}