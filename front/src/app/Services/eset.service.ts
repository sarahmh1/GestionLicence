import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Eset } from 'app/Model/Eset';

@Injectable({
  providedIn: 'root'
})
export class EsetService {
  private baseUrl = 'http://localhost:8089/Eset'; // ✅ Bon chemin


  constructor(private http: HttpClient) { }
  getAllEsets() :Observable<Eset[]>{
    return this.http.get<Eset[]>(`${this.baseUrl}/allEset`);
}
addEset(eset: Eset): Observable<Object> {
  // Ajoutez des logs pour déboguer
  console.log('Envoi des données à l\'API:', eset);
  return this.http.post(`${this.baseUrl}/addESET`, eset);
}

getEsetById(id: number): Observable<Eset> {
  return this.http.get<Eset>(`${this.baseUrl}/get/${id}`);
}


deleteEset(id: number): Observable<void> {
  return this.http.delete<void>(`http://localhost:8089/Eset/Delete-ESET/${id}`);;
}


// Dans eset.service.ts
updateEset(eset: Eset): Observable<Eset> {
  return this.http.put<Eset>(`${this.baseUrl}/updateEset`, eset);  // Note le ESET en majuscules
}




updateEsetStatusToTrue(claimId: number): Observable<void> {
  const url = `${this.baseUrl}/update-status/${claimId}`;
  return this.http.put<void>(url, {});
}
activate(id: number): Observable<void> {
  return this.http.put<void>(`${this.baseUrl}/approuve/${id}`, {});
}

}