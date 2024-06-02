import { Component } from '@angular/core';
import { CommandeItem } from '../beans/commandeItem';
import { CommandeItemService } from '../service/commande-item.service';
import { GestionCommandeClientService } from '../service/gestion-commandeClient.service';
import { CommandeClient } from '../beans/commandeClient';
import { GestionProduitService } from '../service/gestion-produits.service';
import { Produit } from '../beans/produit';

@Component({
  selector: 'app-commande-item',
  templateUrl: './commande-item.component.html',
  styleUrl: './commande-item.component.css'
})
export class CommandeItemComponent {
  commandes: CommandeClient[] = [];
  filteredCommandeItem: CommandeItem[] = [];
  newCommande: CommandeItem = new CommandeItem();
  selectedCommandeItem: CommandeItem | null = null;
  pagedCommandes: CommandeItem[] = [];
  currentPage: number = 1;
  pageSize: number = 5; // Number of records per page
  searchText: string = '';
  isReversed: boolean = false;
  nearbyPagesCount: number = 2;
  newCommandeItem: CommandeItem = new CommandeItem();
  commandeItems: CommandeItem[] = [];
  produits: Produit[] = [];

  constructor(private commandeItemSercice: CommandeItemService, private gestionCommandeService: GestionCommandeClientService, private gestionProduitService: GestionProduitService) { }


  ngOnInit(): void {
    this.getCommandes();
    this.getProduits();
    this.getCommandesClient();


  }

  getCommandesClient(): void {
    this.gestionCommandeService.getCommandes()
      .subscribe(commandes => {
        console.log('Commandes reçues:', commandes);
        this.commandes = commandes || [];
      }, error => {
        console.error('Erreur lors de la récupération des commandes:', error);
      });
  }
  

  getProduits(): void {
    this.gestionProduitService.getProduits().subscribe(produits => {
      this.produits = produits;
    }, error => {
      console.error('Error fetching produits:', error);  // Error handling
    });
  }


  getCommandes(): void {
    this.commandeItemSercice.getCommandes()
      .subscribe(commandeItems => {
        console.log(commandeItems)
        this.commandeItems = commandeItems;
        this.filteredCommandeItem = commandeItems;
        this.paginateCommandes();
        // console.log("testbjbj",commandeItems);
      });
  }

  paginateCommandes(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedCommandes = this.filteredCommandeItem.slice(startIndex, startIndex + this.pageSize);
  }


  updateCommande(): void {
    if (this.selectedCommandeItem) {
      this.commandeItemSercice.updateCommande(this.selectedCommandeItem)
        .subscribe(updatedCommandeItem => {
          const index = this.commandeItems.findIndex(c => c.id === updatedCommandeItem.id);
          if (index !== -1) {
            this.commandeItems[index] = updatedCommandeItem;
          }
          this.selectedCommandeItem = null;
          this.updatePagination();
        });
    }
  }

  UpdateItemCreateCommande(): void {
    console.log()
    this.commandeItemSercice.createCommande(this.newCommandeItem)
      .subscribe(createdCommandeItem => {
        this.commandeItems.push(createdCommandeItem);
       this.newCommandeItem = new CommandeItem();
        console.log("create",this.newCommandeItem );
        this.updatePagination();
      });
  }

  CreateCommande(): void {
    console.log()
    this.commandeItemSercice.createCommande(this.newCommandeItem)
      .subscribe(createdCommandeItem => {
        this.commandeItems.push(createdCommandeItem);
       this.newCommandeItem = new CommandeItem();
        console.log("create",this.newCommandeItem );
        this.updatePagination();
      });
  }


  deleteCommande(commandeItem: CommandeItem): void {
    // this.commandeItemSercice.deleteCommande(commandeItem.id)
    //   .subscribe(() => {
    //     this.commandeItems = this.commandeItems.filter(c => c.id !== commandeItem.id);
    //     // this.filterCommandes();
    //     this.updatePagination();
    //   });
  }

  onSelect(commande: CommandeItem): void {
    this.selectedCommandeItem = commande;
    // this.newCommande = { ...commande };
  }

  // filterCommandes(): void {
  //   this.filteredCommandeItem = this.commandeItems.filter(commande =>
  //     commande.numero.toLowerCase().includes(this.searchText.toLowerCase())
  //   );
  //   this.updatePagination();
  // }

  setPage(page: number): void {
    this.currentPage = page;
    this.paginateCommandes();
  }

  reverseCommandes(): void {
    this.isReversed = !this.isReversed;
    this.filteredCommandeItem = this.isReversed ? this.filteredCommandeItem.slice().reverse() : this.commandeItems.slice();
    this.updatePagination();

  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.filteredCommandeItem.length / this.pageSize)).fill(0).map((x, i) => i + 1);
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




}
