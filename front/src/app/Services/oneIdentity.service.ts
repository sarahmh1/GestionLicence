import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OneIdentity } from 'app/Model/OneIdentity';

@Injectable({
  providedIn: 'root'
})
export class OneIdentityService {
  private baseUrl = 'http://localhost:8089/OneIdentity';

  constructor(private http: HttpClient) {}

  // Récupérer tous les OneIdentity
  getAllOneIdentitys(): Observable<OneIdentity[]> {
    return this.http.get<OneIdentity[]>(`${this.baseUrl}/allOneIdentity`);
  }

  // Ajouter un nouveau OneIdentity
  addOneIdentity(oneIdentity: OneIdentity): Observable<Object> {
    return this.http.post(`${this.baseUrl}/addOneIdentity`,oneIdentity);
  }

  // Récupérer un OneIdentity par ID
  getOneIdentityById(id: number): Observable<OneIdentity> {
    return this.http.get<OneIdentity>(`${this.baseUrl}/get/${id}`);
  }

  // Supprimer un OneIdentity par ID
  deleteOneIdentity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  // Mettre à jour un OneIdentity existant
  updateOneIdentity(oneIdentity: OneIdentity): Observable<OneIdentity> {
    return this.http.put<OneIdentity>(`${this.baseUrl}/updateOneIdentity`,oneIdentity);
  }

  // Activer ou désactiver un OneIdentity
  activate(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/approuve/${id}`, {});
  }

  // Mettre à jour le type de licence d'un OneIdentity
  updateOneIdentityType(oneIdentityId: number, type: string): Observable<void> {
    const url = `${this.baseUrl}/update-type/${oneIdentityId}`;
    return this.http.put<void>(url, { type });
  }

  // Mettre à jour les remarques pour un OneIdentity
  updateOneIdentityRemarks(oneIdentityId: number, remarque: string): Observable<void> {
    const url = `${this.baseUrl}/update-remarks/${oneIdentityId}`;
    return this.http.put<void>(url, { remarque });
  }
}
