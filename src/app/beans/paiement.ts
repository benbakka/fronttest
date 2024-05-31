// paiement.ts
import { Facture } from './facture';

export class Paiement {
    id: number = 0;
    numero: string = '';
    facture: Facture = new Facture();
    montantPaye: number = 0;
    date: Date = new Date();
    type: string = '';

    constructor(
        id: number = 0,
        numero: string = '',
        facture: Facture = new Facture(),
        montantPaye: number = 0,
        date: Date = new Date(),
        type: string = ''
    ) {
        this.id = id;
        this.numero = numero;
        this.facture = facture;
        this.montantPaye = montantPaye;
        this.date = date;
        this.type = type;
    }
}
