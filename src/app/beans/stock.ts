import { Produit } from './produit';

export class Stock {
  id: number;
  produit: Produit;
  quantite: number;
  dateAjout: Date;

  constructor() {
    this.id = 0;
    this.produit = new Produit();
    this.quantite = 0;
    this.dateAjout = new Date();
  }
}
