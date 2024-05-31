import {CommandeClient} from "./commandeClient";
import {Produit} from "./produit";

export class Production {

    id: number;
    produit: Produit;
    commande: CommandeClient;
    quantiteProduite: number;
    dateProduction: Date;

    constructor(
        id: number = 0,
        produit: Produit = new Produit(),
        commande: CommandeClient = new CommandeClient(),
        quantiteProduite: number = 0,
        dateProduction: Date = new Date()
    ) {
        this.id = id;
        this.produit = produit;
        this.commande = commande;
        this.quantiteProduite = quantiteProduite;
        this.dateProduction = dateProduction || new Date(); // Utilisation de la date actuelle si aucune date n'est fournie
    }
}

