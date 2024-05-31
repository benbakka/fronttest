import { Component, OnInit } from '@angular/core';
import { Fournisseur } from '../beans/fournisseur';
import { GestionFournisseurService } from '../service/gestion-fournisseur.service';

@Component({
    selector: 'app-gestion-Fournisseur',
    templateUrl: './gestion-Fournisseur.component.html',
    styleUrl: './gestion-fournisseur.component.css'
})
export class GestionFournisseurComponent implements OnInit {
    fournisseurs: Fournisseur[] = [];
    filteredFournisseur: Fournisseur[] = [];
    newFournisseur: Fournisseur = new Fournisseur(); // Initialize with a new instance
    selectedFournisseur: Fournisseur | null = null; // Allow selectedClient to be null
    searchText: string = '';
    isReversed: boolean = false;
    pagedFournisseurs: Fournisseur[] = [];
    currentPage: number = 1;
    pageSize: number = 5; // Number of records per page


    constructor(private gestionFournisseurService: GestionFournisseurService) {
    }

    ngOnInit(): void {
        this.getFournisseurs();
        this.updatePagination();
    }

    getFournisseurs(): void {
        this.gestionFournisseurService.getFournisseurs()
            .subscribe(fournisseurs => {
                this.fournisseurs = fournisseurs;
                this.filteredFournisseur = fournisseurs; // Initialize filteredClients
                this.paginateFournisseur();
            });
    }

    paginateFournisseur(): void {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        this.pagedFournisseurs = this.filteredFournisseur.slice(startIndex, startIndex + this.pageSize);
    }

    nearbyPagesCount: number = 2;

    // Method to get the range of nearby pages to display
    get displayedPages(): number[] {
        const start = Math.max(1, this.currentPage - this.nearbyPagesCount);
        const end = Math.min(this.totalPages.length, start + this.nearbyPagesCount * 2);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
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

    // Method to check if a Fournisseur matches the current filter
    matchesFilter(Fournisseur: Fournisseur): boolean {
        return Fournisseur.nom.toLowerCase().includes(this.searchText.toLowerCase());
    }

    setPage(page: number): void {
        this.currentPage = page;
        this.updatePagination();
    }

    get totalPages(): number[] {
        return Array(Math.ceil(this.filteredFournisseur.length / this.pageSize)).fill(0).map((x, i) => i + 1);
    }


    deleteFournisseur(Fournisseur: Fournisseur): void {
        if (Fournisseur.id !== undefined) {
            this.gestionFournisseurService.deleteFournisseur(Fournisseur.id)
                .subscribe(() => {
                    this.fournisseurs = this.fournisseurs.filter(c => c.id !== Fournisseur.id);
                    this.filteredFournisseur = [...this.fournisseurs]; // Update filteredClients
                    this.selectedFournisseur = null; // Reset selectedClient after deletion
                    this.updatePagination();
                });
        }
    }

    // Method to filter fournisseurs based on search text
    filterFournisseurs(): void {
        this.filteredFournisseur = this.fournisseurs.filter(Fournisseur =>
            Fournisseur.nom.toLowerCase().includes(this.searchText.toLowerCase())
        );
        this.updatePagination();
    }

    updateFournisseur(): void {
        if (this.selectedFournisseur) {
            // Update existing client
            this.gestionFournisseurService.updateFournisseur(this.selectedFournisseur)
                .subscribe(updatedFournisseur => {
                    // Update the client in the clients array
                    const index = this.fournisseurs.findIndex(c => c.id === updatedFournisseur.id);
                    if (index !== -1) {
                        this.fournisseurs[index] = updatedFournisseur;
                    }
                    this.selectedFournisseur = null; // Reset selected client
                    // this.newClient = new Client(); // Clear form fields
                    this.updatePagination();
                });
        }
    }


    CreateFournisseur(): void {
        this.gestionFournisseurService.createFournisseur(this.newFournisseur)
            .subscribe(createdClient => {
                this.fournisseurs.push(createdClient);
                this.newFournisseur = new Fournisseur();
                this.updatePagination();
            });
    }

    onSelect(Fournisseur: Fournisseur): void {
        this.selectedFournisseur = Fournisseur;
        // Copy selected Fournisseur data to the form fields for editing
        // this.newFournisseur = {...Fournisseur};
    }

    reverseFournisseurs(): void {
        this.isReversed = !this.isReversed;
        this.filteredFournisseur = this.isReversed ? this.filteredFournisseur.slice().reverse() : this.fournisseurs.slice(); // Reverse filteredClients instead of fournisseurs
        this.updatePagination();
    }

    updatePagination(): void {
        this.paginateFournisseur();

    }

}
