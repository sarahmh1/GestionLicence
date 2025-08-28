import { CommandePasserPar } from 'app/Model/CommandePasserPar';
export class Bitdefender {
    bitdefenderId: number;
    client: string;
    dureeDeLicence: string;
    nomDuContact: string;
    adresseEmailContact: string;
    mailAdmin: string;
    ccMail: string[];
    numero: string;
    approuve?: boolean;
    remarque: string;
    commandePasserPar:CommandePasserPar; 
    sousContrat: boolean;
     licences: {
      nomDesLicences: string;
      quantite: string;
      dateEx: Date;
}[];
}