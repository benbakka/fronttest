import { CommandeItem } from "./commandeItem";

export class Produit {
    id?: number;
    reference: string = '';
    nom: string = '';
    description: string = '';
    prix: number = 0;
    type:string='';

    constructor() {
        // Laisser le constructeur vide si l'ID est facultatif et généré automatiquement
    }

}
  