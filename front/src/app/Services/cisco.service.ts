import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cisco } from 'app/Model/Cisco';

@Injectable({
  providedIn: 'root'
})
export class CiscoService {
  private baseUrl = 'http://localhost:8089/Cisco';

  constructor(private http: HttpClient) {}

  
  getAllCiscos(): Observable<Cisco[]> {
    return this.http.get<Cisco[]>(`${this.baseUrl}/allCisco`);
  }

  
  addCisco(cisco: Cisco): Observable<Object> {
    return this.http.post(`${this.baseUrl}/addCisco`, cisco);
  }

  
  getCiscoById(id: number): Observable<Cisco> {
    return this.http.get<Cisco>(`${this.baseUrl}/get/${id}`);
  }

  
  deleteCisco(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  
  updateCisco(cisco: Cisco): Observable<Cisco> {
    return this.http.put<Cisco>(`${this.baseUrl}/updateCisco`, cisco);
  }

  
  activate(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/approuve/${id}`, {});
  }

  
  updateCiscoType(ciscoId: number, type: string): Observable<void> {
    const url = `${this.baseUrl}/update-type/${ciscoId}`;
    return this.http.put<void>(url, { type });
  }

 
  updateCiscoRemarks(ciscoId: number, remarque: string): Observable<void> {
    const url = `${this.baseUrl}/update-remarks/${ciscoId}`;
    return this.http.put<void>(url, { remarque });
  }
}
