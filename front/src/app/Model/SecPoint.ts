import { CommandePasserPar } from "./CommandePasserPar";

export class SecPoint {
    secPointId: number;
    client: string;
    dureeDeLicence: string;
    nomDuContact: string;
    adresseEmailContact: string;
    mailAdmin: string;
    ccMail: string[];
    commandePasserPar: CommandePasserPar;
    numero: string;
    approuve?: boolean;
    remarque: string;
    sousContrat: boolean;
     licences: {
      nomDesLicences: string;
      quantite: string;
      dateEx: Date;
}[];
  
}