import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { F5 } from 'app/Model/F5';
import { F5Service } from 'app/Services/f5.service';
import { CommandePasserPar } from "app/Model/CommandePasserPar";

@Component({
  selector: 'app-update-f5',
  templateUrl: './updatef.component.html',
  styleUrls: ['./updatef.component.scss']
})
export class UpdateF5Component implements OnInit {
   updateForm!: FormGroup;
    f5Id!: number;
    f5!: F5;
    public Validators = Validators;
    commandePasserParOptions = [
        { label: 'GI_TN', value: CommandePasserPar.GI_TN },
        { label: 'GI_FR', value: CommandePasserPar.GI_FR },
        { label: 'GI_CI', value: CommandePasserPar.GI_CI }
      ];
  
    constructor(
      public fb: FormBuilder,
      private f5Service: F5Service,
      private route: ActivatedRoute,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.updateForm = this.fb.group({
        client: ['', Validators.required],
        dureeDeLicence: [''],
        nomDuContact: [''],
        adresseEmailContact: ['', [Validators.required, Validators.email]],
        mailAdmin: ['', Validators.email],
        commandePasserPar: ['', Validators.required],
        ccMail: this.fb.array([]),
        numero: [''],
        remarque: [''],
        sousContrat: [false],
        licences: this.fb.array([])  // 👈 Ajout des licences dynamiques ici
      });
  
      this.f5Id = Number(this.route.snapshot.paramMap.get('id'));
      this.loadF5(this.f5Id);
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
  
    loadF5(id: number): void {
      this.f5Service.getF5ById(id).subscribe(
        (data: F5) => {
          this.f5 = data;
  
          this.updateForm.patchValue({
            client: data.client ?? '',
            dureeDeLicence: data.dureeDeLicence ?? '',
            nomDuContact: data.nomDuContact ?? '',
            adresseEmailContact: data.adresseEmailContact ?? '',
            mailAdmin: data.mailAdmin ?? '',
            commandePasserPar: this.getCommandePasserParValue(data.commandePasserPar),
            numero: data.numero ?? '',
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
          console.error('Erreur récupération F5:', error);
        }
      );
    }
  
    formatDate(date: string | Date): string {
      const d = new Date(date);
      return d.toISOString().substring(0, 10); // yyyy-MM-dd
    }
  
    updateF5(): void {
      if (this.updateForm.valid) {
        const updatedF5: F5 = {
          f5Id: this.f5Id,
          ...this.updateForm.value
        };
  
        this.f5Service.updateF5(updatedF5).subscribe(
          () => {
            console.log('F5 mis à jour avec succès');
            this.router.navigate(['/Afficherf']);
          },
          error => {
            console.error('Erreur mise à jour F5:', error);
          }
        );
      } else {
        console.error('Formulaire invalide', this.updateForm);
      }
    }
  
    onSubmit(): void {
      this.updateF5();
    }
  
    onCancel(): void {
      this.router.navigate(['/Afficherf']);
    }
  }
  