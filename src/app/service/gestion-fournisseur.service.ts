import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Fournisseur } from '../beans/fournisseur';

@Injectable({
    providedIn: 'root'
})
export class GestionFournisseurService {



    private apiUrl: string = 'http://localhost:8088/api/v1/api/fournisseurs';


    constructor(private http: HttpClient) {
    }

    getFournisseurs(): Observable<Fournisseur[]> {
        return this.http.get<Fournisseur[]>(this.apiUrl+'/');
    }

    createFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
        return this.http.post<Fournisseur>(`${this.apiUrl}/add`, fournisseur);
    }

    updateFournisseur(fournisseur: Fournisseur): Observable<Fournisseur> {
        const url = `${this.apiUrl}/update/${fournisseur.id}`;
        return this.http.put<Fournisseur>(url, fournisseur);
    }

    deleteFournisseur(id: number): Observable<void> {
        const url = `${this.apiUrl}/delete/${id}`;
        return this.http.delete<void>(url);
    }








}