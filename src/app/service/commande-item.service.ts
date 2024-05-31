import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandeItem } from '../beans/commandeItem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeItemService {                     
  private apiUrl: string = 'http://localhost:8088/api/v1/api/commandeItems';

  constructor(private http: HttpClient) { }


  getCommandes(): Observable<CommandeItem[]> {
    return this.http.get<CommandeItem[]>(this.apiUrl);
  }

  createCommande(commandeItem: CommandeItem): Observable<CommandeItem> {
    return this.http.post<CommandeItem>(`${this.apiUrl}/add`, commandeItem);
  }

  updateCommande(commandeItem: CommandeItem): Observable<CommandeItem> {
    const url = `${this.apiUrl}/update/${commandeItem.id}`;
    return this.http.put<CommandeItem>(url, commandeItem);
  }

  deleteCommande(id: number): Observable<void> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete<void>(url);
  }
}
