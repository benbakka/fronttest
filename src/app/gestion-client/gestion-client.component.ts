import { Component, OnInit } from '@angular/core';
import { Client } from '../beans/client';
import { GestionClientService } from '../service/gestion-client.service';

@Component({
  selector: 'app-gestion-client',
  templateUrl: './gestion-client.component.html',
  styleUrl: './gestion-client.component.css'
})
export class GestionClientComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  newClient: Client = new Client(); // Initialize with a new instance
  selectedClient: Client | null = null; // Allow selectedClient to be null
  searchText: string = '';
  isReversed: boolean = false;
  pagedClients: Client[] = [];
  currentPage: number = 1;
  pageSize: number = 5; // Number of records per page


  constructor(private gestionClientService: GestionClientService ) { }

  ngOnInit(): void {
    this.getClients();
    this.updatePagination();
  }

  

  getClients(): void {
    this.gestionClientService.getClients()
      .subscribe(clients => {
        this.clients = clients;
        this.filteredClients = clients; // Initialize filteredClients
        this.paginateClients();
      });
  }

  paginateClients(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedClients = this.filteredClients.slice(startIndex, startIndex + this.pageSize);
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

  // Method to check if a client matches the current filter
  matchesFilter(client: Client): boolean {
    return client.nom.toLowerCase().includes(this.searchText.toLowerCase());
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  get totalPages(): number[] {
    return Array(Math.ceil(this.filteredClients.length / this.pageSize)).fill(0).map((x, i) => i + 1);
  }


  deleteClient(client: Client): void {
    if (client.id !== undefined) {
      this.gestionClientService.deleteClient(client.id)
        .subscribe(() => {
          this.clients = this.clients.filter(c => c.id !== client.id);
          this.filteredClients = [...this.clients]; // Update filteredClients
          this.selectedClient = null; // Reset selectedClient after deletion
          this.updatePagination();
        });
    }
  }

  // Method to filter clients based on search text
  filterClients(): void {
    this.filteredClients = this.clients.filter(client =>
      client.nom.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.updatePagination();
  }
  

updateClient(): void {
  if (this.selectedClient) {
        // Update existing client
        this.gestionClientService.updateClient(this.selectedClient)
          .subscribe(updatedClient => {
            // Update the client in the clients array
            const index = this.clients.findIndex(c => c.id === updatedClient.id);
            if (index !== -1) {
              this.clients[index] = updatedClient;
            }
            this.selectedClient = null; // Reset selected client
            // this.newClient = new Client(); // Clear form fields
            this.updatePagination();
          });
      }
}


  submitClientForm(): void {
    this.gestionClientService.createClient(this.newClient)
      .subscribe(createdClient => {
        this.clients.push(createdClient);
        this.newClient = new Client();
        this.updatePagination();

      });
  }

  onSelect(client: Client): void {
    this.selectedClient = client;
   
  }

  reverseClients(): void {
    this.isReversed = !this.isReversed;
    this.filteredClients = this.isReversed ? this.filteredClients.slice().reverse() : this.clients.slice(); // Reverse filteredClients instead of clients
    this.updatePagination();
  }

  updatePagination(): void {
    this.paginateClients();
    
  }
  
  
}
