import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../beans/produit';

@Injectable({
  providedIn: 'root'
})
export class GestionProduitService {
  private apiUrl: string = 'http://localhost:8088/api/v1/api/produits'; // Assuming the API endpoint for produits

  constructor(private http: HttpClient) { }

  getProduits(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }

  createProduit(produit: Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.apiUrl}/add`, produit);
  }

  updateProduit(produit: Produit): Observable<Produit> {
    const url = `${this.apiUrl}/update/${produit.id}`;
    return this.http.put<Produit>(url, produit);
  }

  deleteProduit(id: number): Observable<void> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete<void>(url);
  }

}
