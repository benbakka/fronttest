import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Production } from '../beans/production'; // Importer la classe de production

@Injectable({
  providedIn: 'root'
})
export class GestionProductionService {
  private apiUrl: string = 'http://localhost:8088/api/v1/api/productions'; // URL de l'API de production

  constructor(private http: HttpClient) { }

  getProductions(): Observable<Production[]> {
    return this.http.get<Production[]>(this.apiUrl); // Obtenir la liste des productions depuis l'API
  }

  createProduction(production: Production): Observable<Production> {
    return this.http.post<Production>(`${this.apiUrl}/add`, production); // Ajouter une nouvelle production
  }

  updateProduction(production: Production): Observable<Production> {
    const url = `${this.apiUrl}/update/${production.id}`;
    return this.http.put<Production>(url, production); // Mettre à jour une production existante
  }

  deleteProduction(id: number): Observable<void> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete<void>(url); // Supprimer une production
  }

}
