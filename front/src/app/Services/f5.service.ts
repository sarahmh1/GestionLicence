import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { F5 } from 'app/Model/F5';

@Injectable({
  providedIn: 'root'
})
export class F5Service {
  private baseUrl = 'http://localhost:8089/F5';

  constructor(private http: HttpClient) {}

  
  getAllF5s(): Observable<F5[]> {
    return this.http.get<F5[]>(`${this.baseUrl}/allF5`);
  }

  
  addF5(f5: F5): Observable<Object> {
    return this.http.post(`${this.baseUrl}/addF5`, f5);
  }

 
  getF5ById(id: number): Observable<F5> {
    return this.http.get<F5>(`${this.baseUrl}/get/${id}`);
  }

 
  deleteF5(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  
  updateF5(f5: F5): Observable<F5> {
    return this.http.put<F5>(`${this.baseUrl}/updateF5`, f5);
  }

  
  activate(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/approuve/${id}`, {});
  }

  
  updateF5Type(f5Id: number, type: string): Observable<void> {
    const url = `${this.baseUrl}/update-type/${f5Id}`;
    return this.http.put<void>(url, { type });
  }


  updateF5Remarks(f5Id: number, remarque: string): Observable<void> {
    const url = `${this.baseUrl}/update-remarks/${f5Id}`;
    return this.http.put<void>(url, { remarque });
  }
}
