import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fortinet } from 'app/Model/Fortinet';

@Injectable({
  providedIn: 'root'
})
export class FortinetService {
  private baseUrl = 'http://localhost:8089/Fortinet'; // ✅ Bon chemin
  constructor(private http: HttpClient) {}

 
  getAllFortinets(): Observable<Fortinet[]> {
    return this.http.get<Fortinet[]>(`${this.baseUrl}/allFortinet`);
  }

  addFortinet(fortinet: Fortinet): Observable<Object> {
    return this.http.post(`${this.baseUrl}/addFortinet`, fortinet);
  }

  getFortinetById(id: number): Observable<Fortinet> {
    return this.http.get<Fortinet>(`${this.baseUrl}/get/${id}`);
  }

  deleteFortinet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  updateFortinet(fortinet: Fortinet): Observable<Fortinet> {
    return this.http.put<Fortinet>(`${this.baseUrl}/updateFortinet`, fortinet);
  }

  activate(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/approuve/${id}`, {});
  }
  updateFortinetStatusToTrue(fortinetId: number): Observable<void> {
    const url = `${this.baseUrl}/update-status/${fortinetId}`;
    return this.http.put<void>(url, {});
  }
}
