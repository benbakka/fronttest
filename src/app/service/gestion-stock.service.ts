import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../beans/stock';

@Injectable({
  providedIn: 'root'
})
export class GestionStockService {
  private apiUrl: string = 'http://localhost:8088/api/v1/api/stocks';

  constructor(private http: HttpClient) { }

  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.apiUrl);
  }

  createStock(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(`${this.apiUrl}/add`, stock);
  }

  updateStock(stock: Stock): Observable<Stock> {
    const url = `${this.apiUrl}/update/${stock.id}`;
    return this.http.put<Stock>(url, stock);
  }

  deleteStock(id: number): Observable<void> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete<void>(url);
  }
}
