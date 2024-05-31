// facture.ts
import { CommandeClient } from './commandeClient';

export class Facture {
    id: number = 0;
    numero: string = '';
    commande: CommandeClient;
    montantTotal: number = 0;
    date: Date = new Date();
    statut: string = '';

    constructor(
        id: number = 0,
        numero: string = '',
        commande: CommandeClient = new CommandeClient(),
        montantTotal: number = 0,
        date: Date = new Date(),
        statut: string = ''
    ) {
        this.id = id;
        this.numero = numero;
        this.commande = commande;
        this.montantTotal = montantTotal;
        this.date = date;
        this.statut = statut;
    }
}
