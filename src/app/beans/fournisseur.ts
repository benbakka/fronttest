export class Fournisseur {
    id?: number;// Le "?" indique que l'ID est facultatif car il sera généré automatiquement côté serveur
    ref: string;
    nom: string = '';
    prenom: string = '';
    tel: string = '';
    email: string = '';
    adresse: string = '';
    compteBancaire: string = '';

    constructor() {
        this.id = 0;
        this.ref = '';
        this.nom = '';
        this.prenom = '';
        this.tel = '';
        this.email = '';
        this.adresse = '';
        this.compteBancaire = '';


    }
}