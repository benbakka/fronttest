import {Produit} from "./produit";

export class Client {

    id?: number; // Le "?" indique que l'ID est facultatif car il sera généré automatiquement côté serveur
    nom: string = '';
    prenom: string = '';
    tel: string = '';
    email: string = '';
    adresse:string='';
    ref:string='';

    constructor() {
        // Laisser le constructeur vide si l'ID est facultatif et généré automatiquement
    }

}
