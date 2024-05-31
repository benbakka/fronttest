import { Component, OnInit } from '@angular/core';
import { Facture } from '../beans/facture';
import { GestionFactureService } from '../service/gestion-facture.service';
import { CommandeClient } from '../beans/commandeClient';
import { GestionCommandeClientService } from '../service/gestion-commandeClient.service';

@Component({
  selector: 'app-gestion-facture',
  templateUrl: './gestion-facture.component.html',
  styleUrls: ['./gestion-facture.component.css']
})
export class GestionFactureComponent implements OnInit {
  factures: Facture[] = [];
  commandes: CommandeClient[] = [];
  filteredFactures: Facture[] = [];
  newFacture: Facture = new Facture();
  selectedFacture: Facture | null = null;
  pagedFactures: Facture[] = [];
  currentPage: number = 1;
  pageSize: number = 5; // Nombre d'enregistrements par page
  searchText: string = '';
  isReversed: boolean = false;
  nearbyPagesCount: number = 2;

  constructor(private gestionFactureService: GestionFactureService, private gestionCommandeService: GestionCommandeClientService) { }

  ngOnInit(): void {
    this.getCommandes();
    this.getFactures();
  }

  getCommandes(): void {
    this.gestionCommandeService.getCommandes()
      .subscribe(commandes => {
        this.commandes = commandes;
      });
  }

  getFactures(): void {
    this.gestionFactureService.getFactures()
      .subscribe(factures => {
        this.factures = factures;
        this.filteredFactures = factures;
        this.paginateFactures();
      });
  }

  paginateFactures(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedFactures = this.filteredFactures.slice(startIndex, startIndex + this.pageSize);
  }

  updateFacture(): void {
    if (this.selectedFacture) {
      // Update existing client
      this.gestionFactureService.updateFacture(this.selectedFacture)
        .subscribe(updatedFacture => {
          // Update the client in the clients array
          const index = this.factures.findIndex(c => c.id === updatedFacture.id);
          if (index !== -1) {
            this.factures[index] = updatedFacture;
          }
          this.selectedFacture = null; // Reset selected client
          // this.newClient = new Client(); // Clear form fields
          this.updatePagination();
        });
    }
  }


  CreateFacture(): void {
    this.gestionFactureService.createFacture(this.newFacture)
      .subscribe(createdFacture => {
        this.factures.push(createdFacture);
        this.newFacture = new Facture();
        this.updatePagination();
      });
  }

  deleteFacture(facture: Facture): void {
    this.gestionFactureService.deleteFacture(facture.id)
      .subscribe(() => {
        this.factures = this.factures.filter(f => f.id !== facture.id);
        this.filterFactures(); // Update the filtered factures list
        this.updatePagination(); // Update pagination after deletion
      });
  }



  onSelect(facture: Facture): void {
    this.selectedFacture = facture;
  }

  filterFactures(): void {
    this.filteredFactures = this.factures.filter(facture =>
      facture.numero.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.updatePagination();
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.paginateFactures();
  }

  reverseFactures(): void {
    this.isReversed = !this.isReversed;
    this.filteredFactures = this.isReversed ? this.filteredFactures.slice().reverse() : this.factures.slice();
    this.updatePagination();
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.filteredFactures.length / this.pageSize)).fill(0).map((x, i) => i + 1);
  }

  get displayedPages(): number[] {
    const start = Math.max(1, this.currentPage - this.nearbyPagesCount);
    const end = Math.min(this.totalPages.length, start + this.nearbyPagesCount * 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  updatePagination(): void {
    this.paginateFactures();
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

  getStatusStyle(status: string): any {
    let backgroundColor: string;

    switch(status) {
        case 'envoyee':
            backgroundColor = 'orange';
            break;
        case 'payee':
            backgroundColor = 'green';
            break;
        case 'annulee':
            backgroundColor = 'red';
            break;
        default:
            backgroundColor = 'transparent';
    }

    return {
        'background-color': backgroundColor,
        'padding': '5px 10px',
        'color': 'white',
        'border-radius': '5px',
        'display': 'inline-block'
    };
}
}
