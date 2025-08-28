import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Palo } from 'app/Model/Palo';

@Injectable({
  providedIn: 'root'
})
export class PaloService {
  private baseUrl = 'http://localhost:8089/Palo';

  constructor(private http: HttpClient) {}

  // Récupérer tous les Palo
  getAllPalos(): Observable<Palo[]> {
    return this.http.get<Palo[]>(`${this.baseUrl}/allPalo`);
  }

  // Ajouter un nouveau Palo
  addPalo(palo: Palo): Observable<Object> {
    return this.http.post(`${this.baseUrl}/addPalo`, palo);
  }

  // Récupérer un Palo par ID
  getPaloById(id: number): Observable<Palo> {
    return this.http.get<Palo>(`${this.baseUrl}/get/${id}`);
  }

  // Supprimer un Palo par ID
  deletePalo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  // Mettre à jour un Palo existant
  updatePalo(palo: Palo): Observable<Palo> {
    return this.http.put<Palo>(`${this.baseUrl}/updatePalo`, palo);
  }

  // Activer ou désactiver un Palo
  activate(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/approuve/${id}`, {});
  }

  // Mettre à jour le statut sous contrat d'un Palo
  updatePaloSousContratStatus(paloId: number, sousContrat: boolean): Observable<void> {
    const url = `${this.baseUrl}/update-sous-contrat/${paloId}`;
    return this.http.put<void>(url, { sousContrat });
  }
}
