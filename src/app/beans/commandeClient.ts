// commandeClient.ts
import { Client } from './client';
import { CommandeItem } from './commandeItem';

export class CommandeClient {
    id: number = 0;
    numero: string = '';
    date: Date = new Date();
    statut: string = '';
    client: Client = new Client();
    commandeItems = new Array<CommandeItem>;

    constructor(
        id: number = 0,
        numero: string = '',
        dateCommande: Date = new Date(),
        statut: string = '',
        client: Client = new Client(),
        commandeItems = new Array<CommandeItem>
    ) {
        this.id = id;
        this.numero = numero;
        this.date = dateCommande;
        this.statut = statut;
        this.client = client;

         this.commandeItems = commandeItems;
    }
}
