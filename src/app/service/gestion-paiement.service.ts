import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paiement } from '../beans/paiement';

@Injectable({
  providedIn: 'root'
})
export class GestionPaiementService {
  private apiUrl: string = 'http://localhost:8088/api/v1/api/paiements';

  constructor(private http: HttpClient) { }

  getPaiements(): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(this.apiUrl);
  }

  createPaiement(paiement: Paiement): Observable<Paiement> {
    return this.http.post<Paiement>(`${this.apiUrl}/add`, paiement);
  }

  updatePaiement(paiement: Paiement): Observable<Paiement> {
    const url = `${this.apiUrl}/update/${paiement.id}`;
    return this.http.put<Paiement>(url, paiement);
  }

  deletePaiement(id: number): Observable<void> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete<void>(url);
  }
}
