import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CommandeFournisseur} from '../beans/commandeFournisseur';

@Injectable({
    providedIn: 'root'
})
export class GestionCommandeFournisseurService {
    private apiUrl: string = 'http://localhost:8088/api/v1/api/commandesFournisseur';

    constructor(private http: HttpClient) {
    }

    getCommandes(): Observable<CommandeFournisseur[]> {
        return this.http.get<CommandeFournisseur[]>(this.apiUrl);
    }

    createCommande(commande: CommandeFournisseur): Observable<CommandeFournisseur> {
        return this.http.post<CommandeFournisseur>(`${this.apiUrl}/add`, commande);
    }

    updateCommande(commande: CommandeFournisseur): Observable<CommandeFournisseur> {
        const url = `${this.apiUrl}/update/${commande.id}`;
        return this.http.put<CommandeFournisseur>(url, commande);
    }

    deleteCommande(id: number): Observable<void> {
        const url = `${this.apiUrl}/delete/${id}`;
        return this.http.delete<void>(url);
    }
}
