import { Component, OnInit } from '@angular/core';
import { Production } from '../beans/production';
import { GestionProductionService } from '../service/gestion-production.service';
import { Produit } from '../beans/produit';
import { CommandeClient } from '../beans/commandeClient';
import { GestionProduitService } from '../service/gestion-produits.service';
import { GestionCommandeClientService } from '../service/gestion-commandeClient.service';

@Component({
  selector: 'app-gestion-production',
  templateUrl: './gestion-production.component.html',
  styleUrls: ['./gestion-production.component.css']
})
export class GestionProductionComponent implements OnInit {
  produits: Produit[] = [];
  commandes: CommandeClient[] = [];
  productions: Production[] = [];
  filteredProductions: Production[] = [];
  newProduction: Production = new Production(); // Initialize with a new instance
  selectedProduction: Production | null = null; // Allow selectedProduction to be null
  searchText: string = '';
  isReversed: boolean = false;
  pagedProductions: Production[] = [];
  currentPage: number = 1;
  pageSize: number = 5; // Number of records per page
  nearbyPagesCount: number = 2;

  constructor(private productionService: GestionProductionService, private gestionProduitService: GestionProduitService,
              private gestionCommandeService: GestionCommandeClientService) { }

  ngOnInit(): void {
    this.getProduits();
    this.getCommandes();
    this.getProductions();
  }

  getProduits(): void {
    this.gestionProduitService.getProduits()
      .subscribe(produits => {
        this.produits = produits;
      });
  }

  getCommandes(): void {
    this.gestionCommandeService.getCommandes()
      .subscribe(commandes => {
        this.commandes = commandes;
      });
  }

  getProductions(): void {
    this.productionService.getProductions()
      .subscribe(productions => {
        this.productions = productions;
        this.filteredProductions = productions; // Initialize filteredProductions
        this.paginateProductions();
      });
  }

  paginateProductions(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedProductions = this.filteredProductions.slice(startIndex, startIndex + this.pageSize);
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

  setPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  // Method to get the range of nearby pages to display
  get displayedPages(): number[] {
    const start = Math.max(1, this.currentPage - this.nearbyPagesCount);
    const end = Math.min(this.totalPages.length, start + this.nearbyPagesCount * 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
  

  get totalPages(): number[] {
    return Array(Math.ceil(this.filteredProductions.length / this.pageSize)).fill(0).map((x, i) => i + 1);
  }

  deleteProduction(production: Production): void {
    if (production.id) {
      this.productionService.deleteProduction(production.id)
        .subscribe(() => {
          this.productions = this.productions.filter(p => p.id !== production.id);
          this.filteredProductions = [...this.productions];
          this.selectedProduction = null;
          this.updatePagination();
        });
    }
  }

  filterProductions(): void {
    this.filteredProductions = this.productions.filter(production =>
      production.produit.nom.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.updatePagination();
  }

  updateProduction(): void {
    if (this.selectedProduction) {
      // Update existing client
      this.productionService.updateProduction(this.selectedProduction)
        .subscribe(updatedProduction => {
          // Update the client in the clients array
          const index = this.productions.findIndex(c => c.id === updatedProduction.id);
          if (index !== -1) {
            this.productions[index] = updatedProduction;
          }
          this.selectedProduction = null; // Reset selected client
          this.updatePagination();
        });
    }
  }

  CreateProduction(): void {
    this.productionService.createProduction(this.newProduction)
    .subscribe(createdProduction => {
      this.productions.push(createdProduction);
      this.newProduction = new Production();
      this.updatePagination();
      });
  }

  onSelect(production: Production): void {
    this.selectedProduction = production;
    this.newProduction = { ...production };
  }

  reverseProductions(): void {
    this.isReversed = !this.isReversed;
    this.filteredProductions = this.isReversed ? this.filteredProductions.slice().reverse() : this.productions.slice();
    this.updatePagination();
  }

  updatePagination(): void {
    this.paginateProductions();
  }
}
