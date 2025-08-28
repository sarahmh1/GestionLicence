import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommandePasserPar } from 'app/Model/CommandePasserPar';
import { Duree } from 'app/Model/Duree';
import { Proofpoint } from 'app/Model/Proofpoint';
import { ProofpointService } from 'app/Services/proofpoint.service';

@Component({
  selector: 'app-ajouter-proofpoint',
  templateUrl: './ajouter-proofpoint.component.html',
  styleUrls: ['./ajouter-proofpoint.component.scss']
})
export class AjouterProofpointComponent implements OnInit {
  proofpointForm!: FormGroup;
  commandePasserParOptions = [
       { label: 'GI_TN', value: CommandePasserPar.GI_TN },
       { label: 'GI_FR', value: CommandePasserPar.GI_FR },
       { label: 'GI_CI', value: CommandePasserPar.GI_CI }
     ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private proofpointService: ProofpointService
  ) {}

   ngOnInit(): void {
      this.proofpointForm= this.fb.group({
        client: ['', Validators.required],
        dureeDeLicence: [''],
        nomDuContact: [''],
        adresseEmailContact: [''],
        sousContrat: [false],
        mailAdmin: ['', [Validators.email]],
        commandePasserPar: ['', Validators.required],
        ccMail: this.fb.array([this.fb.control('', [Validators.email])]),
        numero: [''],
        remarque: [''],
        licences: this.fb.array([
          this.createLicenceGroup()
        ])
      });
    }
  
    get ccMail(): FormArray {
      return this.proofpointForm.get('ccMail') as FormArray;
    }
  
    get licences(): FormArray {
      return this.proofpointForm.get('licences') as FormArray;
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
      const ccMailFormArray = this.proofpointForm.get('ccMail') as FormArray;
      ccMailFormArray.clear();
      if (ccMails && ccMails.length > 0) {
        ccMails.forEach(email => ccMailFormArray.push(this.fb.control(email, Validators.email)));
      } else {
        ccMailFormArray.push(this.fb.control('', Validators.email));
      }
    }
  
    loadProofpoint(id: number) {
      this.proofpointService.getProofpointById(id).subscribe(proofpoint => {
        this.proofpointForm.patchValue({
          client: proofpoint.client,
          dureeDeLicence: proofpoint.dureeDeLicence,
          nomDuContact: proofpoint.nomDuContact,
          commandePasserPar: proofpoint.commandePasserPar,
           sousContrat: proofpoint.sousContrat,
          adresseEmailContact: proofpoint.adresseEmailContact,
          mailAdmin: proofpoint.mailAdmin,
          numero: proofpoint.numero,
          remarque: proofpoint.remarque
        });
  
        // Set licences (clear + patch)
        this.licences.clear();
        if (proofpoint.licences && proofpoint.licences.length > 0) {
          proofpoint.licences.forEach(lic => {
            this.licences.push(this.fb.group({
              nomDesLicences: [lic.nomDesLicences, Validators.required],
              quantite: [lic.quantite, Validators.required],
              dateEx: [this.formatDate(lic.dateEx), Validators.required]
            }));
          });
        }
  
        this.setCcMail(proofpoint.ccMail);
      });
    }
  
    formatDate(date: string | Date): string {
      const d = new Date(date);
      return d.toISOString().substring(0, 10); // 'yyyy-MM-dd'
    }
  
    addProofpoint() {
      if (this.proofpointForm.valid) {
        const newProofpoint: Proofpoint = {
          proofpointId: null!,
          client: this.proofpointForm.value.client,
          dureeDeLicence: this.proofpointForm.value.dureeDeLicence,
          nomDuContact: this.proofpointForm.value.nomDuContact,
          adresseEmailContact: this.proofpointForm.value.adresseEmailContact,
          mailAdmin: this.proofpointForm.value.mailAdmin || '',
          ccMail: this.ccMail.value,
           commandePasserPar: this.proofpointForm.value.commandePasserPar,
          sousContrat: this.proofpointForm.value.sousContrat,
          numero: this.proofpointForm.value.numero,
          approuve: false,
          remarque: this.proofpointForm.value.remarque || '',
          licences: this.licences.value
        };
  
        this.proofpointService.addProofpoint(newProofpoint).subscribe(
          response => {
            window.alert('proofpoint ajouté avec succès');
            this.router.navigate(['/Afficherproofpoint']);
          },
          error => {
            console.error('Erreur lors de l\'ajout du proofpoint', error);
            window.alert('Échec de l\'ajout');
          }
        );
      } else {
        window.alert('Le formulaire est invalide. Veuillez corriger les erreurs.');
      }
    }
     onCancel(): void {
     this.router.navigate(['/Afficherproof']);
   }
  }
  