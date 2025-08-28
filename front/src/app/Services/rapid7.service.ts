import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rapid7 } from 'app/Model/Rapid7';

@Injectable({
  providedIn: 'root'
})
export class Rapid7Service {
  private baseUrl = 'http://localhost:8089/Rapid7';

  constructor(private http: HttpClient) {}

  // Récupérer tous les Rapid7
  getAllRapid7s(): Observable<Rapid7[]> {
    return this.http.get<Rapid7[]>(`${this.baseUrl}/allRapid7`);
  }

  // Ajouter un nouveau Rapid7
  addRapid7(rapid7: Rapid7): Observable<Object> {
    return this.http.post(`${this.baseUrl}/addRapid7`, rapid7);
  }

  // Récupérer un Rapid7 par ID
  getRapid7ById(id: number): Observable<Rapid7> {
    return this.http.get<Rapid7>(`${this.baseUrl}/get/${id}`);
  }

  // Supprimer un Rapid7 par ID
  deleteRapid7(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  // Mettre à jour un Rapid7 existant
  updateRapid7(rapid7: Rapid7): Observable<Rapid7> {
    return this.http.put<Rapid7>(`${this.baseUrl}/updateRapid7`, rapid7);
  }

  // Activer ou désactiver un Rapid7
  activate(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/approuve/${id}`, {});
  }

  // Mettre à jour la clé de licences d'un Rapid7
  updateRapid7CleLicences(rapid7Id: number, cleLicences: string): Observable<void> {
    const url = `${this.baseUrl}/update-cle-licences/${rapid7Id}`;
    return this.http.put<void>(url, { cleLicences });
  }
}
