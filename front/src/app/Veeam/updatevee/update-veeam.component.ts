import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandePasserPar } from 'app/Model/CommandePasserPar';
import { Veeam } from 'app/Model/Veeam';
import { VeeamService } from 'app/Services/veeam.service';

@Component({
  selector: 'app-update-veeam',
  templateUrl: './update-veeam.component.html',
  styleUrls: ['./update-veeam.component.scss']
})
export class UpdateVeeamComponent implements OnInit {
  updateForm!: FormGroup;
   VeeamId!: number;
   veeam!: Veeam;
   public Validators = Validators;
  commandePasserParOptions = [
         { label: 'GI_TN', value: CommandePasserPar.GI_TN },
         { label: 'GI_FR', value: CommandePasserPar.GI_FR },
         { label: 'GI_CI', value: CommandePasserPar.GI_CI }
       ];
   constructor(
     public fb: FormBuilder,
     private veeamService: VeeamService,
     private route: ActivatedRoute,
     private router: Router
   ) {}
 
   ngOnInit(): void {
     this.updateForm = this.fb.group({
       client: ['', Validators.required],
       dureeDeLicence: [''],
       nomDuContact: [''],
       commandePasserPar: ['', Validators.required],
       adresseEmailContact: ['', [Validators.required, Validators.email]],
       mailAdmin: ['', Validators.email],
       ccMail: this.fb.array([]),
       numero: [''],
       remarque: [''],
       sousContrat: [false],
       licences: this.fb.array([])  // 👈 Ajout des licences dynamiques ici
     });
 
     this.VeeamId = Number(this.route.snapshot.paramMap.get('id'));
     this.loadVeeam(this.VeeamId);
   }
 
   get ccMail(): FormArray {
     return this.updateForm.get('ccMail') as FormArray;
   }
 
   get licences(): FormArray {
     return this.updateForm.get('licences') as FormArray;
   }
 // Fonction pour convertir la valeur en enum CommandePasserPar
  private getCommandePasserParValue(value: any): CommandePasserPar {
    if (!value) return CommandePasserPar.GI_TN; // Valeur par défaut
    
    const stringValue = String(value).toUpperCase().trim();
    
    switch (stringValue) {
      case 'GI_TN':
        return CommandePasserPar.GI_TN;
      case 'GI_FR':
        return CommandePasserPar.GI_FR;
      case 'GI_CI':
        return CommandePasserPar.GI_CI;
      default:
        console.warn('Valeur CommandePasserPar non reconnue:', value);
        return CommandePasserPar.GI_TN; // Valeur par défaut
    }
  }
   createLicenceGroup(): FormGroup {
     return this.fb.group({
       nomDesLicences: ['', Validators.required],
       quantite: ['', Validators.required],
       dateEx: ['', Validators.required]
     });
   }
 
   addLicence(): void {
     this.licences.push(this.createLicenceGroup());
   }
 
   removeLicence(index: number): void {
     this.licences.removeAt(index);
   }
 
   loadVeeam(id: number): void {
     this.veeamService.getVeeamById(id).subscribe(
       (data: Veeam) => {
         this.veeam = data;
 
         this.updateForm.patchValue({
           client: data.client ?? '',
           dureeDeLicence: data.dureeDeLicence ?? '',
           nomDuContact: data.nomDuContact ?? '',
           adresseEmailContact: data.adresseEmailContact ?? '',
           mailAdmin: data.mailAdmin ?? '',
           numero: data.numero ?? '',
           commandePasserPar: this.getCommandePasserParValue(data.commandePasserPar),
           remarque: data.remarque ?? '',
           sousContrat: data.sousContrat ?? false
         });
 
         // Remplir les licences
         this.licences.clear();
         if (data.licences && data.licences.length > 0) {
           data.licences.forEach(lic => {
             this.licences.push(this.fb.group({
               nomDesLicences: [lic.nomDesLicences, Validators.required],
               quantite: [lic.quantite, Validators.required],
               dateEx: [this.formatDate(lic.dateEx), Validators.required]
             }));
           });
         } else {
           this.addLicence();
         }
 
         // CC mails
         this.ccMail.clear();
         if (data.ccMail && data.ccMail.length > 0) {
           data.ccMail.forEach(email => {
             this.ccMail.push(this.fb.control(email, Validators.email));
           });
         } else {
           this.ccMail.push(this.fb.control('', Validators.email));
         }
       },
       error => {
         console.error('Erreur récupération Veeam:', error);
       }
     );
   }
 
   formatDate(date: string | Date): string {
     const d = new Date(date);
     return d.toISOString().substring(0, 10); // yyyy-MM-dd
   }
 
   updateVeeam(): void {
     if (this.updateForm.valid) {
       const updatedVeeam: Veeam = {
         VeeamId: this.VeeamId,
         ...this.updateForm.value
       };
 
       this.veeamService.updateVeeam(updatedVeeam).subscribe(
         () => {
           console.log('Veeam mis à jour avec succès');
           this.router.navigate(['/Afficherveeam']);
         },
         error => {
           console.error('Erreur mise à jour Veeam:', error);
         }
       );
     } else {
       console.error('Formulaire invalide', this.updateForm);
     }
   }
 
   onSubmit(): void {
     this.updateVeeam();
   }
 
   onCancel(): void {
     this.router.navigate(['/Afficherveeam']);
   }
 }
 