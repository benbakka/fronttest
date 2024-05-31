import { Component, OnInit } from '@angular/core';
import { Client } from '../beans/client';
import { CommandeClient } from '../beans/commandeClient';
import { GestionCommandeClientService } from '../service/gestion-commandeClient.service';
import { GestionClientService } from '../service/gestion-client.service';
import { CommandeItemService } from '../service/commande-item.service';
import { CommandeItem } from '../beans/commandeItem';
import { GestionProduitService } from '../service/gestion-produits.service';
import { Produit } from '../beans/produit';

@Component({
  selector: 'app-gestion-commande',
  templateUrl: './gestion-commandeClient.component.html',
  styleUrls: ['./gestion-commandeClient.component.css']
})
export class GestionCommandeClientComponent implements OnInit {
  clients: Client[] = [];
  commandes: CommandeClient[] = [];
  filteredCommandes: CommandeClient[] = [];
  newCommande: CommandeClient = new CommandeClient();
  selectedCommande: CommandeClient | null = null;
  pagedCommandes: CommandeClient[] = [];
  currentPage: number = 1;
  pageSize: number = 5; // Number of records per page
  searchText: string = '';
  isReversed: boolean = false;
  nearbyPagesCount: number = 2;
  newCommandeItem: CommandeItem = new CommandeItem();
  selectedCommandeItem: any;
  showFields: boolean = false;
  produits: Produit[] = [];
  commandeItems: Array<CommandeItem> = new Array<CommandeItem>();

  
  constructor(private gestionCommandeService: GestionCommandeClientService, private gestionClientService: GestionClientService,private commandeItemSercice: CommandeItemService,private gestionProduitService: GestionProduitService) { }

  ngOnInit(): void {
    this.getCommandes();
    this.getClients();
    this.getCommandes();
    this.getProduits();
  }

  getClients(): void {
    this.gestionClientService.getClients()
      .subscribe(clients => {
        this.clients = clients;
      });
  }

  getCommandes(): void {
    this.gestionCommandeService.getCommandes()
      .subscribe(commandes => {
        this.commandes = commandes;
        this.filteredCommandes = commandes;
        this.paginateCommandes();
      });
  }

  getProduits(): void {
    this.gestionProduitService.getProduits().subscribe(produits => {
      this.produits = produits;
    }, error => {
      console.error('Error fetching produits:', error);  // Error handling
    });
  }

  paginateCommandes(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedCommandes = this.filteredCommandes.slice(startIndex, startIndex + this.pageSize);
  }


  updateCommande(): void {
    if (this.selectedCommande) {
      this.gestionCommandeService.updateCommande(this.selectedCommande)
        .subscribe(updatedCommande => {
          const index = this.commandes.findIndex(c => c.id === updatedCommande.id);
          if (index !== -1) {
            this.commandes[index] = updatedCommande;
          }
          this.selectedCommande = null;
          this.updatePagination();
        });
    }
  }


  CreateCommande(): void {
    console.log('wanari',this.newCommandeItem)
    this.newCommande.commandeItems=this.commandeItems;
    this.newCommande.statut="en_attente";
    this.gestionCommandeService.createCommande(this.newCommande)
      .subscribe(createdCommande => {
        this.commandes.push(createdCommande);
        this.newCommande = new CommandeClient();
        this.updatePagination();
      });
  }

  AddCommandeIteam(commande:CommandeItem): void {
    this.newCommande.commandeItems.push(commande);
    this.commandeItems.push(commande);
  }

  deleteCommande(commande: CommandeClient): void {
    this.gestionCommandeService.deleteCommande(commande.id)
      .subscribe(() => {
        this.commandes = this.commandes.filter(c => c.id !== commande.id);
        this.filterCommandes();
        this.updatePagination();
      });
  }

  onSelect(commande: CommandeClient): void {
    this.selectedCommande = commande;
    this.newCommande = { ...commande };
  }

  filterCommandes(): void {
    this.filteredCommandes = this.commandes.filter(commande =>
      commande.numero.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.updatePagination();
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.paginateCommandes();
  }

  reverseCommandes(): void {
    this.isReversed = !this.isReversed;
    this.filteredCommandes = this.isReversed ? this.filteredCommandes.slice().reverse() : this.commandes.slice();
    this.updatePagination();

  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.filteredCommandes.length / this.pageSize)).fill(0).map((x, i) => i + 1);
  }

  get displayedPages(): number[] {
    const start = Math.max(1, this.currentPage - this.nearbyPagesCount);
    const end = Math.min(this.totalPages.length, start + this.nearbyPagesCount * 2);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  updatePagination(): void {
    this.paginateCommandes();

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
      case 'livree':
        backgroundColor = 'green';
        break;
      case 'annulee':
        backgroundColor = 'grey';
        break;
      case 'retournee':
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
  toggleFields() {
    this.showFields = !this.showFields;
  }
 
}
