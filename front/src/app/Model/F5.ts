import { CommandePasserPar } from "./CommandePasserPar";
export class F5 {
    f5Id: number;
    client: string;
    dureeDeLicence: string;
    nomDuContact: string;
    adresseEmailContact: string;
    mailAdmin: string;
    ccMail: string[];
    numero: string;
    commandePasserPar:CommandePasserPar; 
    approuve?: boolean;
    remarque: string;
    sousContrat: boolean;
     licences: {
      nomDesLicences: string;
      quantite: string;
      dateEx: Date;
}[];
}