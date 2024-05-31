import { Produit } from './produit';
import { CommandeClient } from './commandeClient';

export class CommandeItem {
    id: number = 0;
    numero: string = '';
    produit: Produit = new Produit();
    quantite: number = 0;
    commande: CommandeClient;

    constructor(
        id: number = 0,
        numero: string = '',
        produit: Produit = new Produit(),
        quantite: number = 0,
        commande: CommandeClient = new CommandeClient()
    ) {
        this.id = id;
        this.numero = numero;
        this.produit = produit;
        this.quantite = quantite;
        this.commande = this.commande;
    }
}
