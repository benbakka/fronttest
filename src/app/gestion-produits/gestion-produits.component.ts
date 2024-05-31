import { Component, OnInit } from '@angular/core';
import { Produit } from '../beans/produit';
import { GestionProduitService } from '../service/gestion-produits.service';

@Component({
  selector: 'app-gestion-produits',
  templateUrl: './gestion-produits.component.html',
  styleUrl: './gestion-produits.component.css'
})
export class GestionProduitsComponent implements OnInit {
  produits: Produit[] = [];
  filteredProduits: Produit[] = [];
  newProduit: Produit = new Produit(); // Initialize with a new instance
  selectedProduit: Produit | null = null; // Allow selectedProduit to be null
  searchText: string = '';
  isReversed: boolean = false;
  pagedProduits: Produit[] = [];
  currentPage: number = 1;
  pageSize: number = 5; // Number of records per page
  nearbyPagesCount: number = 2;

  constructor(private gestionProduitService: GestionProduitService) { }

  ngOnInit(): void {
    this.getProduits();
  }

  getProduits(): void {
    this.gestionProduitService.getProduits()
      .subscribe(produits => {
        this.produits = produits;
        this.filteredProduits = produits; // Initialize filteredProduits
        this.paginateProduits();
      });
  }

  get displayedPages(): number[] {
    const start = Math.max(1, this.currentPage - this.nearbyPagesCount);
    const end = Math.min(this.totalPages.length, start + this.nearbyPagesCount * 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  paginateProduits(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedProduits = this.filteredProduits.slice(startIndex, startIndex + this.pageSize);
  }

  // Method to navigate to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  // Method to navigate to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages.length) {
      this.setPage(this.currentPage + 1);
    }
  }

  // Method to check if a produit matches the current filter
  matchesFilter(produit: Produit): boolean {
    return produit.nom.toLowerCase().includes(this.searchText.toLowerCase());
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.filteredProduits.length / this.pageSize)).fill(0).map((x, i) => i + 1);
  }

  deleteProduit(produit: Produit): void {
    if (produit.id !== undefined) {
      this.gestionProduitService.deleteProduit(produit.id)
        .subscribe(() => {
          this.produits = this.produits.filter(p => p.id !== produit.id);
          this.filteredProduits = [...this.produits]; // Update filteredProduits
          this.selectedProduit = null; // Reset selectedProduit after deletion
          this.updatePagination();
        });
    }
  }

  // Method to filter produits based on search text
  filterProduits(): void {
    this.filteredProduits = this.produits.filter(produit =>
      produit.reference.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.updatePagination();
  }

  updateProduit(): void {
    if (this.selectedProduit) {
      // Update existing client
      this.gestionProduitService.updateProduit(this.selectedProduit)
        .subscribe(updatedProduit => {
          // Update the client in the clients array
          const index = this.produits.findIndex(c => c.id === updatedProduit.id);
          if (index !== -1) {
            this.produits[index] = updatedProduit;
          }
          this.selectedProduit = null; // Reset selected client
          this.updatePagination();
        });
    }
  }

  CreateProduit(): void {
    this.gestionProduitService.createProduit(this.newProduit)
    .subscribe(createdProduit => {
        this.produits.push(createdProduit);
        this.newProduit = new Produit();
        this.updatePagination();
      });
  }

  onSelect(produit: Produit): void {
    this.selectedProduit = produit;
    // Copy selected produit data to the form fields for editing
    this.newProduit = { ...produit };
  }

  reverseProduits(): void {
    this.isReversed = !this.isReversed;
    this.filteredProduits = this.isReversed ? this.filteredProduits.slice().reverse() : this.produits.slice(); // Reverse filteredProduits instead of produits
    this.updatePagination();
  }

  updatePagination(): void {
    this.paginateProduits();
  }

}

