import { CommandePasserPar } from "./CommandePasserPar";

export class Infoblox {
    infobloxId: number;
    client: string;
    dureeDeLicence: string;
    nomDuContact: string;
    adresseEmailContact: string;
    mailAdmin: string;
    commandePasserPar:CommandePasserPar;
    ccMail: string[];
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