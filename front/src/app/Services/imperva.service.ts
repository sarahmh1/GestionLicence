import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Imperva } from 'app/Model/Imperva';

@Injectable({
  providedIn: 'root'
})
export class ImpervaService {
  private baseUrl = 'http://localhost:8089/Imperva';

  constructor(private http: HttpClient) {}

  getAllImpervas(): Observable<Imperva[]> {
    return this.http.get<Imperva[]>(`${this.baseUrl}/allImperva`);
  }

 
  addImperva(imperva: Imperva): Observable<Object> {
    return this.http.post(`${this.baseUrl}/addImperva`, imperva);
  }

 
  getImpervaById(id: number): Observable<Imperva> {
    return this.http.get<Imperva>(`${this.baseUrl}/get/${id}`);
  }

  
  deleteImperva(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

 
  updateImperva(imperva: Imperva): Observable<Imperva> {
    return this.http.put<Imperva>(`${this.baseUrl}/updateImperva`, imperva);
  }

  
  activate(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/approuve/${id}`, {});
  }

 
  updateImpervaType(impervaId: number, type: string): Observable<void> {
    const url = `${this.baseUrl}/update-type/${impervaId}`;
    return this.http.put<void>(url, { type });
  }

  
  updateImpervaRemarks(impervaId: number, remarque: string): Observable<void> {
    const url = `${this.baseUrl}/update-remarks/${impervaId}`;
    return this.http.put<void>(url, { remarque });
  }
}
