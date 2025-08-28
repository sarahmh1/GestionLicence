import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Fortinet } from 'app/Model/Fortinet';
import { FortinetService } from 'app/Services/fortinet.service';
import { CommandePasserPar } from 'app/Model/CommandePasserPar';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.scss']
})
export class AjouterComponent implements OnInit {
  fortinetForm!: FormGroup;
  commandePasserParOptions = [
  { label: 'GI_TN', value: CommandePasserPar.GI_TN },
  { label: 'GI_FR', value: CommandePasserPar.GI_FR },
  { label: 'GI_CI', value: CommandePasserPar.GI_CI }
];


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fortinetService: FortinetService
  ) {}

  ngOnInit(): void {
    this.fortinetForm = this.fb.group({
      client: ['', Validators.required],
      nomDuBoitier: ['', Validators.required],
      numeroSerie: ['', Validators.required],
      commandePasserPar: ['', Validators.required], 
      dureeDeLicence: [''],
      nomDuContact: [''],
      adresseEmailContact: [''],
      sousContrat: [false],
      mailAdmin: ['', [Validators.email]],
      ccMail: this.fb.array([this.fb.control('', [Validators.email])]),
      numero: [''],
      remarque: [''],
      licences: this.fb.array([
        this.createLicenceGroup()
      ])
    });
  }

  get ccMail(): FormArray {
    return this.fortinetForm.get('ccMail') as FormArray;
  }

  get licences(): FormArray {
    return this.fortinetForm.get('licences') as FormArray;
  }

  createLicenceGroup(): FormGroup {
    return this.fb.group({
      nomDesLicences: ['', Validators.required],
      quantite: ['', Validators.required],
      dateEx: ['', Validators.required]
    });
  }

  addLicence() {
    this.licences.push(this.createLicenceGroup());
  }

  removeLicence(index: number) {
    this.licences.removeAt(index);
  }

  addCcMail() {
    this.ccMail.push(this.fb.control('', [Validators.email]));
  }

  removeCcMail(index: number) {
    this.ccMail.removeAt(index);
  }

  setCcMail(ccMails: string[]) {
    const ccMailFormArray = this.fortinetForm.get('ccMail') as FormArray;
    ccMailFormArray.clear();
    if (ccMails && ccMails.length > 0) {
      ccMails.forEach(email => ccMailFormArray.push(this.fb.control(email, Validators.email)));
    } else {
      ccMailFormArray.push(this.fb.control('', Validators.email));
    }
  }

  loadFortinet(id: number) {
    this.fortinetService.getFortinetById(id).subscribe(fortinet => {
      this.fortinetForm.patchValue({
        client: fortinet.client,
        nomDuBoitier: fortinet.nomDuBoitier,
        numeroSerie: fortinet.numeroSerie,
        commandePasserPar: fortinet.commandePasserPar,
        dureeDeLicence: fortinet.dureeDeLicence,
        nomDuContact: fortinet.nomDuContact,
         sousContrat: fortinet.sousContrat,
        adresseEmailContact: fortinet.adresseEmailContact,
        mailAdmin: fortinet.mailAdmin,
        numero: fortinet.numero,
        remarque: fortinet.remarque
      });

      // Set licences (clear + patch)
      this.licences.clear();
      if (fortinet.licences && fortinet.licences.length > 0) {
        fortinet.licences.forEach(lic => {
          this.licences.push(this.fb.group({
            nomDesLicences: [lic.nomDesLicences, Validators.required],
            quantite: [lic.quantite, Validators.required],
            dateEx: [this.formatDate(lic.dateEx), Validators.required]
          }));
        });
      }

      this.setCcMail(fortinet.ccMail);
    });
  }

  formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().substring(0, 10); // 'yyyy-MM-dd'
  }

addFortinet() {
  console.log('Tentative d\'ajout - Formulaire valide:', this.fortinetForm.valid);
  console.log('Valeurs du formulaire:', this.fortinetForm.value);

  if (this.fortinetForm.valid) {
    const newFortinet: Fortinet = {
      fortinetId: null!,
      client: this.fortinetForm.value.client,
      nomDuBoitier: this.fortinetForm.value.nomDuBoitier,
      numeroSerie: this.fortinetForm.value.numeroSerie,
      commandePasserPar: this.fortinetForm.value.commandePasserPar,
      dureeDeLicence: this.fortinetForm.value.dureeDeLicence,
      nomDuContact: this.fortinetForm.value.nomDuContact,
      adresseEmailContact: this.fortinetForm.value.adresseEmailContact,
      mailAdmin: this.fortinetForm.value.mailAdmin || '',
      ccMail: this.ccMail.value.filter((email: string) => email !== ''), // Filtrer les emails vides
      sousContrat: this.fortinetForm.value.sousContrat,
      numero: this.fortinetForm.value.numero,
      approuve: false,
      remarque: this.fortinetForm.value.remarque || '',
      licences: this.licences.value
    };

    console.log('Données à envoyer:', newFortinet);

    this.fortinetService.addFortinet(newFortinet).subscribe(
      response => {
        console.log('Réponse serveur:', response);
        window.alert('Fortinet ajouté avec succès');
        this.router.navigate(['/Afficherfortinet']);
      },
      error => {
        console.error('Erreur complète:', error);
        console.error('Status:', error.status);
        console.error('Message:', error.message);
        console.error('Error body:', error.error);
        window.alert('Échec de l\'ajout: ' + (error.error?.message || error.message));
      }
    );
  } else {
    console.log('Formulaire invalide', this.fortinetForm.errors);
    window.alert('Le formulaire est invalide. Veuillez corriger les erreurs.');
  }
}
onCancel(): void {
    this.router.navigate(['/Afficherfortinet']);
  }
}
