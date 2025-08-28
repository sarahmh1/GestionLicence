import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VMware } from 'app/Model/VMware';

@Injectable({
  providedIn: 'root'
})
export class VMwareService {
  private baseUrl = 'http://localhost:8089/VMware';

  constructor(private http: HttpClient) {}

  // Récupérer tous les VMware
  getAllVMwares(): Observable<VMware[]> {
    return this.http.get<VMware[]>(`${this.baseUrl}/allVMware`);
  }

  // Ajouter un nouveau VMware
  addVMware(vmware: VMware): Observable<Object> {
    return this.http.post(`${this.baseUrl}/addVMware`, vmware);
  }

  // Récupérer un VMware par ID
  getVMwareById(id: number): Observable<VMware> {
    return this.http.get<VMware>(`${this.baseUrl}/get/${id}`);
  }

  // Supprimer un VMware par ID
  deleteVMware(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  // Mettre à jour un VMware existant
  updateVMware(vmware: VMware): Observable<VMware> {
    return this.http.put<VMware>(`${this.baseUrl}/updateVMware`, vmware);
  }

  // Activer ou désactiver un VMware
  activate(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/approuve/${id}`, {});
  }

  // Mettre à jour le type de licence d'un VMware
  updateVMwareType(vmwareId: number, type: string): Observable<void> {
    const url = `${this.baseUrl}/update-type/${vmwareId}`;
    return this.http.put<void>(url, { type });
  }

  // Mettre à jour les remarques pour un VMware
  updateVMwareRemarks(vmwareId: number, remarque: string): Observable<void> {
    const url = `${this.baseUrl}/update-remarks/${vmwareId}`;
    return this.http.put<void>(url, { remarque });
  }
}
