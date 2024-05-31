import {Fournisseur} from "./fournisseur";


export class Commandefournisseur {
    id: number;
    numero: string='';
    fournisseur: Fournisseur=new Fournisseur();
    date: Date=new Date();
    typeProduit: string='';
    quantite: number=0;
    statut: string='';


}
