import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Veeam } from 'app/Model/Veeam';

@Injectable({
  providedIn: 'root'
})
export class VeeamService {
  private baseUrl = 'http://localhost:8089/Veeam';

  constructor(private http: HttpClient) {}

  // Récupérer tous les Veeams
  getAllVeeams(): Observable<Veeam[]> {
    return this.http.get<Veeam[]>(`${this.baseUrl}/allVeeam`);
  }

  // Ajouter un nouveau Veeam
  addVeeam(veeam: Veeam): Observable<Object> {
    return this.http.post(`${this.baseUrl}/addVeeam`, veeam);
  }

  // Récupérer un Veeam par ID
  getVeeamById(id: number): Observable<Veeam> {
    return this.http.get<Veeam>(`${this.baseUrl}/get/${id}`);
  }

  // Supprimer un Veeam par ID
  deleteVeeam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  // Mettre à jour un Veeam existant
  updateVeeam(veeam: Veeam): Observable<Veeam> {
    return this.http.put<Veeam>(`${this.baseUrl}/updateVeeam`, veeam);
  }

  // Activer ou désactiver un Veeam
  activate(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/approuve/${id}`, {});
  }

  // Mettre à jour le type de licence d'un Veeam
  updateVeeamType(veeamId: number, type: string): Observable<void> {
    const url = `${this.baseUrl}/update-type/${veeamId}`;
    return this.http.put<void>(url, { type });
  }

  // Mettre à jour les remarques pour un Veeam
  updateVeeamRemarks(veeamId: number, remarque: string): Observable<void> {
    const url = `${this.baseUrl}/update-remarks/${veeamId}`;
    return this.http.put<void>(url, { remarque });
  }
}
