import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Wallix } from 'app/Model/Wallix';

@Injectable({
  providedIn: 'root'
})
export class WallixService {
  private baseUrl = 'http://localhost:8089/Wallix';

  constructor(private http: HttpClient) {}

  // Récupérer tous les Wallix
  getAllWallixs(): Observable<Wallix[]> {
    return this.http.get<Wallix[]>(`${this.baseUrl}/allWallix`);
  }

  // Ajouter un nouveau Wallix
  addWallix(wallix: Wallix): Observable<Object> {
    return this.http.post(`${this.baseUrl}/addWallix`, wallix);
  }

  // Récupérer un Wallix par ID
  getWallixById(id: number): Observable<Wallix> {
    return this.http.get<Wallix>(`${this.baseUrl}/get/${id}`);
  }

  // Supprimer un Wallix par ID
  deleteWallix(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  updateWallix(wallix: Wallix): Observable<Wallix> {
  return this.http.put<Wallix>(`${this.baseUrl}/updateWallix`, wallix);
}


  // Activer ou désactiver un Wallix
  activate(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/approuve/${id}`, {});
  }

  // Mettre à jour le type de licence d'un Wallix
  updateWallixType(wallixId: number, type: string): Observable<void> {
    const url = `${this.baseUrl}/update-type/${wallixId}`;
    return this.http.put<void>(url, { type });
  }

  // Mettre à jour les remarques pour un Wallix
  updateWallixRemarks(wallixId: number, remarque: string): Observable<void> {
    const url = `${this.baseUrl}/update-remarks/${wallixId}`;
    return this.http.put<void>(url, { remarque });
  }
}
