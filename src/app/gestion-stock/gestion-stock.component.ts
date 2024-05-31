import { Component, OnInit } from '@angular/core';
import { Produit } from '../beans/produit';
import { Stock } from '../beans/stock';
import { GestionStockService } from '../service/gestion-stock.service';
import { GestionProduitService } from '../service/gestion-produits.service';

@Component({
  selector: 'app-gestion-stock',
  templateUrl: './gestion-stock.component.html',
  styleUrls: ['./gestion-stock.component.css']
})
export class GestionStockComponent implements OnInit {
  produits: Produit[] = [];
  stocks: Stock[] = [];
  filteredStocks: Stock[] = [];
  newStock: Stock = new Stock();
  selectedStock: Stock | null = null;
  pagedStocks: Stock[] = [];
  currentPage: number = 1;
  pageSize: number = 5; // Number of records per page
  searchText: string = '';
  isReversed: boolean = false;
  nearbyPagesCount: number = 2;

  constructor(private gestionStockService: GestionStockService, private gestionProduitService: GestionProduitService) { }

  ngOnInit(): void {
    this.getStocks();
    this.getProduits();
  }

  getProduits(): void {
    this.gestionProduitService.getProduits()
      .subscribe(produits => {
        this.produits = produits;
      });
  }

  getStocks(): void {
    this.gestionStockService.getStocks()
      .subscribe(stocks => {
        this.stocks = stocks;
        this.filteredStocks = stocks;
        this.paginateStocks();
      });
  }

  paginateStocks(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedStocks = this.filteredStocks.slice(startIndex, startIndex + this.pageSize);
  }

  submitStockForm(): void {
    if (this.selectedStock) {
      this.gestionStockService.updateStock(this.newStock)
        .subscribe(updatedStock => {
          const index = this.stocks.findIndex(s => s.id === updatedStock.id);
          if (index !== -1) {
            this.stocks[index] = updatedStock;
          }
          this.selectedStock = null;
          this.newStock = new Stock();
          this.updatePagination();
        });
    } else {
      this.gestionStockService.createStock(this.newStock)
        .subscribe(createdStock => {
          this.stocks.push(createdStock);
          this.newStock = new Stock();
          this.updatePagination();
        });
    }
  }
  updateProduit(): void {
    if (this.selectedStock) {
      // Update existing client
      this.gestionStockService.updateStock(this.selectedStock)
        .subscribe(updatedStock => {
          // Update the client in the clients array
          const index = this.stocks.findIndex(c => c.id === updatedStock.id);
          if (index !== -1) {
            this.stocks[index] = updatedStock;
          }
          this.selectedStock = null; // Reset selected client
          this.updatePagination();
        });
    }
  }

  CreateProduit(): void {
    this.gestionStockService.createStock(this.newStock)
    .subscribe(createdStock => {
        this.stocks.push(createdStock);
        this.newStock = new Stock();
        this.updatePagination();
      });
  }


  deleteStock(stock: Stock): void {
    this.gestionStockService.deleteStock(stock.id)
      .subscribe(() => {
        this.stocks = this.stocks.filter(s => s.id !== stock.id);
        this.filterStocks(); // Update the filtered stocks list
        this.updatePagination(); // Update pagination after deletion
      });
  }

  onSelect(stock: Stock): void {
    this.selectedStock = stock;
    this.newStock = { ...stock };
  }

  filterStocks(): void {
    this.filteredStocks = this.stocks.filter(stock =>
      stock.produit.nom.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.updatePagination();
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.paginateStocks();
  }

  reverseStocks(): void {
    this.isReversed = !this.isReversed;
    this.filteredStocks = this.isReversed ? this.filteredStocks.slice().reverse() : this.stocks.slice();
    this.updatePagination();
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.filteredStocks.length / this.pageSize)).fill(0).map((x, i) => i + 1);
  }

  get displayedPages(): number[] {
    const start = Math.max(1, this.currentPage - this.nearbyPagesCount);
    const end = Math.min(this.totalPages.length, start + this.nearbyPagesCount * 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  updatePagination(): void {
    this.paginateStocks();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages.length) {
      this.setPage(this.currentPage + 1);
    }
  }
}
