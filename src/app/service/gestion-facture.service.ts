import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facture } from '../beans/facture';

@Injectable({
  providedIn: 'root'
})
export class GestionFactureService {
  private apiUrl: string = 'http://localhost:8088/api/v1/api/factures';

  constructor(private http: HttpClient) { }

  getFactures(): Observable<Facture[]> {
    return this.http.get<Facture[]>(this.apiUrl);
  }

  createFacture(facture: Facture): Observable<Facture> {
    return this.http.post<Facture>(`${this.apiUrl}/add`, facture);
  }

  updateFacture(facture: Facture): Observable<Facture> {
    const url = `${this.apiUrl}/update/${facture.id}`;
    return this.http.put<Facture>(url, facture);
  }

  deleteFacture(id: number): Observable<void> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete<void>(url);
  }
}
