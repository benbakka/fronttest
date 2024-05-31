import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommandeClient } from '../beans/commandeClient';

@Injectable({
  providedIn: 'root'
})
export class GestionCommandeClientService {
  private apiUrl: string = 'http://localhost:8088/api/v1/api/commandesClient';

  constructor(private http: HttpClient) { }

  getCommandes(): Observable<CommandeClient[]> {
    return this.http.get<CommandeClient[]>(this.apiUrl);
  }

  createCommande(commande: CommandeClient): Observable<CommandeClient> {
    return this.http.post<CommandeClient>(`${this.apiUrl}/add`, commande);
  }

  updateCommande(commande: CommandeClient): Observable<CommandeClient> {
    const url = `${this.apiUrl}/update/${commande.id}`;
    return this.http.put<CommandeClient>(url, commande);
  }

  deleteCommande(id: number): Observable<void> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete<void>(url);
  }
}
