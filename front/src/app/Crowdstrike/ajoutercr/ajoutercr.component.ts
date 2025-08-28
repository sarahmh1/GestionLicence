import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommandePasserPar } from 'app/Model/CommandePasserPar';
import { Crowdstrike } from 'app/Model/Crowdstrike';
import { CrowdstrikeService } from 'app/Services/crowdstrike.service';

@Component({
  selector: 'app-ajouter-crowdstrike',
  templateUrl: './ajoutercr.component.html',
  styleUrls: ['./ajoutercr.component.scss']
})
export class AjouterCrowdstrikeComponent implements OnInit {
  crowdstrikeForm!: FormGroup;
  commandePasserParOptions = [
    { label: 'GI_TN', value: CommandePasserPar.GI_TN },
    { label: 'GI_FR', value: CommandePasserPar.GI_FR },
    { label: 'GI_CI', value: CommandePasserPar.GI_CI }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private crowdstrikeService: CrowdstrikeService
  ) {}

  ngOnInit(): void {
    this.crowdstrikeForm = this.fb.group({
      client: ['', Validators.required],
      dureeDeLicence: [''],
      nomDuContact: [''],
      adresseEmailContact: [''],
      sousContrat: [false],
      commandePasserPar: ['', Validators.required],
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
    return this.crowdstrikeForm.get('ccMail') as FormArray;
  }

  get licences(): FormArray {
    return this.crowdstrikeForm.get('licences') as FormArray;
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
    const ccMailFormArray = this.crowdstrikeForm.get('ccMail') as FormArray;
    ccMailFormArray.clear();
    if (ccMails && ccMails.length > 0) {
      ccMails.forEach(email => ccMailFormArray.push(this.fb.control(email, Validators.email)));
    } else {
      ccMailFormArray.push(this.fb.control('', Validators.email));
    }
  }

  loadCrowdstrike(id: number) {
    this.crowdstrikeService.getCrowdstrikeById(id).subscribe(crowdstrike => {
      this.crowdstrikeForm.patchValue({
        client: crowdstrike.client,
        dureeLicence: crowdstrike.dureeLicence,
        nomDuContact: crowdstrike.nomDuContact,
        sousContrat: crowdstrike.sousContrat,
        commandePasserPar: crowdstrike.commandePasserPar,
        adresseEmailContact: crowdstrike.adresseEmailContact,
        mailAdmin: crowdstrike.mailAdmin,
        numero: crowdstrike.numero,
        remarque: crowdstrike.remarques
      });

      // Set licences (clear + patch)
      this.licences.clear();
      if (crowdstrike.licences && crowdstrike.licences.length > 0) {
        crowdstrike.licences.forEach(lic => {
          this.licences.push(this.fb.group({
            nomDesLicences: [lic.nomDesLicences, Validators.required],
            quantite: [lic.quantite, Validators.required],
            dateEx: [this.formatDate(lic.dateEx), Validators.required]
          }));
        });
      }

      this.setCcMail(crowdstrike.ccMail);
    });
  }

  formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toISOString().substring(0, 10); // 'yyyy-MM-dd'
  }

  addCrowdstrike() {
    if (this.crowdstrikeForm.valid) {
      const newCrowdstrike: Crowdstrike = {
        crowdstrikeid: null!,
        client: this.crowdstrikeForm.value.client,
        dureeLicence: this.crowdstrikeForm.value.dureeLicence,
        nomDuContact: this.crowdstrikeForm.value.nomDuContact,
        adresseEmailContact: this.crowdstrikeForm.value.adresseEmailContact,
        mailAdmin: this.crowdstrikeForm.value.mailAdmin || '',
        commandePasserPar: this.crowdstrikeForm.value.commandePasserPar,
        ccMail: this.ccMail.value,
        sousContrat: this.crowdstrikeForm.value.sousContrat,
        numero: this.crowdstrikeForm.value.numero,
        approuve: false,
        remarques: this.crowdstrikeForm.value.remarques || '',
        licences: this.licences.value
      };

      this.crowdstrikeService.addCrowdstrike(newCrowdstrike).subscribe(
        response => {
          window.alert('CrowdStrike ajouté avec succès');
          this.router.navigate(['/AjouterCrowdstrike']);
        },
        error => {
          console.error('Erreur lors de l\'ajout du CrowdStrike', error);
          window.alert('Échec de l\'ajout');
        }
      );
    } else {
      window.alert('Le formulaire est invalide. Veuillez corriger les erreurs.');
    }
  }

  onCancel(): void {
    this.router.navigate(['/AjouterCrowdstrike']);
  }
}