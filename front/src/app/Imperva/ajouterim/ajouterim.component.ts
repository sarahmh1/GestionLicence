import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommandePasserPar } from 'app/Model/CommandePasserPar';
import { Imperva} from 'app/Model/Imperva';
import { ImpervaService } from 'app/Services/imperva.service';
@Component({
  selector: 'app-ajouterim',
  templateUrl: './ajouterim.component.html',
  styleUrls: ['./ajouterim.component.scss']
})
export class AjouterimComponent implements OnInit {
   impervaForm!: FormGroup;
   commandePasserParOptions = [
        { label: 'GI_TN', value: CommandePasserPar.GI_TN },
        { label: 'GI_FR', value: CommandePasserPar.GI_FR },
        { label: 'GI_CI', value: CommandePasserPar.GI_CI }
      ];
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private impervaService: ImpervaService
    ) {}
  
     ngOnInit(): void {
        this.impervaForm= this.fb.group({
          client: ['', Validators.required],
          dureeDeLicence: [''],
          nomDuContact: [''],
          adresseEmailContact: [''],
          commandePasserPar: ['', Validators.required],
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
        return this.impervaForm.get('ccMail') as FormArray;
      }
    
      get licences(): FormArray {
        return this.impervaForm.get('licences') as FormArray;
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
        const ccMailFormArray = this.impervaForm.get('ccMail') as FormArray;
        ccMailFormArray.clear();
        if (ccMails && ccMails.length > 0) {
          ccMails.forEach(email => ccMailFormArray.push(this.fb.control(email, Validators.email)));
        } else {
          ccMailFormArray.push(this.fb.control('', Validators.email));
        }
      }
    
      loadImperva(id: number) {
        this.impervaService.getImpervaById(id).subscribe(imperva => {
          this.impervaForm.patchValue({
            client: imperva.client,
            dureeDeLicence: imperva.dureeDeLicence,
            nomDuContact: imperva.nomDuContact,
             sousContrat:imperva.sousContrat,
             commandePasserPar: imperva.commandePasserPar,
            adresseEmailContact: imperva.adresseEmailContact,
            mailAdmin: imperva.mailAdmin,
            numero: imperva.numero,
            remarque: imperva.remarque
          });
    
          // Set licences (clear + patch)
          this.licences.clear();
          if (imperva.licences && imperva.licences.length > 0) {
        imperva.licences.forEach(lic => {
              this.licences.push(this.fb.group({
                nomDesLicences: [lic.nomDesLicences, Validators.required],
                quantite: [lic.quantite, Validators.required],
                dateEx: [this.formatDate(lic.dateEx), Validators.required]
              }));
            });
          }
    
          this.setCcMail(imperva.ccMail);
        });
      }
    
      formatDate(date: string | Date): string {
        const d = new Date(date);
        return d.toISOString().substring(0, 10); // 'yyyy-MM-dd'
      }
    
      addImperva() {
        if (this.impervaForm.valid) {
          const newImperva: Imperva = {
            impervaId: null!,
            client: this.impervaForm.value.client,
            dureeDeLicence: this.impervaForm.value.dureeDeLicence,
            nomDuContact: this.impervaForm.value.nomDuContact,
            adresseEmailContact: this.impervaForm.value.adresseEmailContact,
            mailAdmin: this.impervaForm.value.mailAdmin || '',
            ccMail: this.ccMail.value,
            commandePasserPar: this.impervaForm.value.commandePasserPar,
            sousContrat: this.impervaForm.value.sousContrat,
            numero: this.impervaForm.value.numero,
            approuve: false,
            remarque: this.impervaForm.value.remarque || '',
            licences: this.licences.value
          };
    
          this.impervaService.addImperva(newImperva).subscribe(
            response => {
              window.alert('Imperva ajouté avec succès');
              this.router.navigate(['/Afficherim']);
            },
            error => {
              console.error('Erreur lors de l\'ajout du Imperva', error);
              window.alert('Échec de l\'ajout');
            }
          );
        } else {
          window.alert('Le formulaire est invalide. Veuillez corriger les erreurs.');
        }
      }
      onCancel(): void {
      this.router.navigate(['/Afficherim']);
    }
    }
    