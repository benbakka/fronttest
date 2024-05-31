import { Component, OnInit } from '@angular/core';
import { Client } from '../beans/client';
import { Paiement } from '../beans/paiement';
import { GestionPaiementService } from '../service/gestion-paiement.service';
import { Facture } from '../beans/facture';
import { CommandeClient } from '../beans/commandeClient';
import { GestionCommandeClientService } from '../service/gestion-commandeClient.service';
import { GestionClientService } from '../service/gestion-client.service';
import { GestionFactureService } from '../service/gestion-facture.service';

@Component({
  selector: 'app-gestion-paiement',
  templateUrl: './gestion-paiement.component.html',
  styleUrls: ['./gestion-paiement.component.css']
})
export class GestionPaiementComponent implements OnInit {
  clients: Client[] = [];
  factures: Facture[] = [];
  commandes: CommandeClient[] = [];
  paiements: Paiement[] = [];
  filteredPaiements: Paiement[] = [];
  newPaiement: Paiement = new Paiement();
  selectedPaiement: Paiement | null = null;
  pagedPaiements: Paiement[] = [];
  currentPage: number = 1;
  pageSize: number = 5; // Number of records per page
  searchText: string = '';
  isReversed: boolean = false;
  nearbyPagesCount: number = 2;
  reste : number = 0;

  constructor(private gestionFactureService: GestionFactureService, private gestionCommandeService: GestionCommandeClientService, private gestionClientService: GestionClientService, private gestionPaiementService: GestionPaiementService) { }

  ngOnInit(): void {
    this.getPaiements();
    this.getCommandes();
    this.getClients();
    this.getFactures();
    this.calculateReste();
    
  }


  calculateReste(): void {
    if (this.newPaiement.facture && this.newPaiement.montantPaye !== undefined) {
           
            this.pagedPaiements.forEach(paiement => {
              this.reste = paiement.facture.montantTotal -= paiement.montantPaye;
              console.log(this.reste);
            });
                
    }
}

  getClients(): void {
    this.gestionClientService.getClients()
      .subscribe(clients => {
        this.clients = clients;
      });
  }

  getFactures(): void {
    this.gestionFactureService.getFactures()
      .subscribe(factures => {
        this.factures = factures;
      });
  }

  getCommandes(): void {
    this.gestionCommandeService.getCommandes()
      .subscribe(commandes => {
        this.commandes = commandes;
      });
  }

  getPaiements(): void {
    this.gestionPaiementService.getPaiements()
      .subscribe(paiements => {
        this.paiements = paiements;
        this.filteredPaiements = paiements;
        this.paginatePaiements();
      });
  }

  paginatePaiements(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedPaiements = this.filteredPaiements.slice(startIndex, startIndex + this.pageSize);
  }


  updatePaiement(): void {
    if (this.selectedPaiement) {
      // Update existing client
      this.gestionPaiementService.updatePaiement(this.selectedPaiement)
        .subscribe(updatedPaiement => {
          // Update the client in the clients array
          const index = this.paiements.findIndex(c => c.id === updatedPaiement.id);
          if (index !== -1) {
            this.paiements[index] = updatedPaiement;
          }
          this.selectedPaiement = null; // Reset selected client
          this.updatePagination();
        });
    }
  }

  CreatePaiement(): void {
    this.gestionPaiementService.createPaiement(this.newPaiement)
      .subscribe(createdPaiment => {
        this.paiements.push(createdPaiment);
        this.newPaiement = new Paiement();
        this.updatePagination();
      });
  }

  deletePaiement(paiement: Paiement): void {
    this.gestionPaiementService.deletePaiement(paiement.id)
      .subscribe(() => {
        this.paiements = this.paiements.filter(p => p.id !== paiement.id);
        this.updatePagination();
      });
  }

  onSelect(paiement: Paiement): void {
    this.selectedPaiement = paiement;
    this.newPaiement = { ...paiement };
  }

  filterPaiements(): void {
    this.filteredPaiements = this.paiements.filter(paiement =>
      paiement.numero.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.updatePagination();
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.paginatePaiements();
  }

  reversePaiements(): void {
    this.isReversed = !this.isReversed;
    this.filteredPaiements = this.isReversed ? this.filteredPaiements.slice().reverse() : this.paiements.slice();
    this.updatePagination();
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.filteredPaiements.length / this.pageSize)).fill(0).map((x, i) => i + 1);
  }

  get displayedPages(): number[] {
    const start = Math.max(1, this.currentPage - this.nearbyPagesCount);
    const end = Math.min(this.totalPages.length, start + this.nearbyPagesCount * 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  updatePagination(): void {
    this.paginatePaiements();
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

    switch (status) {
      case 'en_attente':
        backgroundColor = 'orange';
        break;
      case 'paye':
        backgroundColor = 'green';
        break;
      case 'annule':
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
