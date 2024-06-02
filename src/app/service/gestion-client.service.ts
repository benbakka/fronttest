import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../beans/client';

@Injectable({
  providedIn: 'root'
})
export class GestionClientService {
  
  private apiUrl: string = 'http://localhost:8088/api/v1/api/clients';

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/add`, client);
  }

  updateClient(client: Client): Observable<Client> {
    const url = `${this.apiUrl}/update/${client.id}`;
    return this.http.put<Client>(url, client);
  }
  

  deleteClient(id: number): Observable<void> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete<void>(url);
  }

}