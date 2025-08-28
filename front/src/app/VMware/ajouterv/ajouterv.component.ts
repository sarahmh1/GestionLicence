import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommandePasserPar } from 'app/Model/CommandePasserPar';
import { VMware } from 'app/Model/VMware';
import { VMwareService } from 'app/Services/vmware.service';
@Component({
  selector: 'app-ajouterv',
  templateUrl: './ajouterv.component.html',
  styleUrls: ['./ajouterv.component.scss']
})
export class AjoutervComponent implements OnInit {
   vmwareForm!: FormGroup;
    commandePasserParOptions = [
        { label: 'GI_TN', value: CommandePasserPar.GI_TN },
        { label: 'GI_FR', value: CommandePasserPar.GI_FR },
        { label: 'GI_CI', value: CommandePasserPar.GI_CI }
      ];
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private vmwareService: VMwareService
    ) {}
  
     ngOnInit(): void {
        this.vmwareForm= this.fb.group({
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
        return this.vmwareForm.get('ccMail') as FormArray;
      }
    
      get licences(): FormArray {
        return this.vmwareForm.get('licences') as FormArray;
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
        const ccMailFormArray = this.vmwareForm.get('ccMail') as FormArray;
        ccMailFormArray.clear();
        if (ccMails && ccMails.length > 0) {
          ccMails.forEach(email => ccMailFormArray.push(this.fb.control(email, Validators.email)));
        } else {
          ccMailFormArray.push(this.fb.control('', Validators.email));
        }
      }
    
      loadVMware(id: number) {
        this.vmwareService.getVMwareById(id).subscribe(vmware => {
          this.vmwareForm.patchValue({
            client: vmware.client,
            dureeDeLicence: vmware.dureeDeLicence,
            nomDuContact: vmware.nomDuContact,
             sousContrat: vmware.sousContrat,
             commandePasserPar: vmware.commandePasserPar,
            adresseEmailContact: vmware.adresseEmailContact,
            mailAdmin: vmware.mailAdmin,
            numero: vmware.numero,
            remarque: vmware.remarque
          });
    
          // Set licences (clear + patch)
          this.licences.clear();
          if (vmware.licences && vmware.licences.length > 0) {
            vmware.licences.forEach(lic => {
              this.licences.push(this.fb.group({
                nomDesLicences: [lic.nomDesLicences, Validators.required],
                quantite: [lic.quantite, Validators.required],
                dateEx: [this.formatDate(lic.dateEx), Validators.required]
              }));
            });
          }
    
          this.setCcMail(vmware.ccMail);
        });
      }
    
      formatDate(date: string | Date): string {
        const d = new Date(date);
        return d.toISOString().substring(0, 10); // 'yyyy-MM-dd'
      }
    
      addVMware() {
        if (this.vmwareForm.valid) {
          const newVMware: VMware = {
            vmwareId: null!,
            client: this.vmwareForm.value.client,
            dureeDeLicence: this.vmwareForm.value.dureeDeLicence,
            nomDuContact: this.vmwareForm.value.nomDuContact,
            adresseEmailContact: this.vmwareForm.value.adresseEmailContact,
            mailAdmin: this.vmwareForm.value.mailAdmin || '',
            ccMail: this.ccMail.value,
            commandePasserPar: this.vmwareForm.value.commandePasserPar,
            sousContrat: this.vmwareForm.value.sousContrat,
            numero: this.vmwareForm.value.numero,
            approuve: false,
            remarque: this.vmwareForm.value.remarque || '',
            licences: this.licences.value
          };
    
          this.vmwareService.addVMware(newVMware).subscribe(
            response => {
              window.alert('vmware ajouté avec succès');
              this.router.navigate(['/Affichervmw']);
            },
            error => {
              console.error('Erreur lors de l\'ajout du vmware', error);
              window.alert('Échec de l\'ajout');
            }
          );
        } else {
          window.alert('Le formulaire est invalide. Veuillez corriger les erreurs.');
        }
      }
       onCancel(): void {
      this.router.navigate(['Affichervmw']);
    }
    }
    