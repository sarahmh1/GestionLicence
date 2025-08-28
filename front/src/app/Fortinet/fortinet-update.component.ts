import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FortinetService } from 'app/Services/fortinet.service';
import { Fortinet } from 'app/Model/Fortinet';
import { CommandePasserPar } from 'app/Model/CommandePasserPar';

@Component({
  selector: 'app-update-fortinet',
  templateUrl: './fortinet-update.component.html',
  styleUrls: ['./fortinet-update.component.scss']
})
export class UpdateFortinetComponent implements OnInit {
  updateForm!: FormGroup;
  fortinetId!: number;
  fortinet!: Fortinet;
  
  commandePasserParOptions = [
    { label: 'GI_TN', value: CommandePasserPar.GI_TN },
    { label: 'GI_FR', value: CommandePasserPar.GI_FR },
    { label: 'GI_CI', value: CommandePasserPar.GI_CI }
  ];

  constructor(
    private fb: FormBuilder,
    private fortinetService: FortinetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    
    // Récupérer l'ID depuis l'URL
    this.fortinetId = Number(this.route.snapshot.paramMap.get('id'));
    
    if (this.fortinetId) {
      this.loadFortinet(this.fortinetId);
    }
  }

  initializeForm(): void {
    this.updateForm = this.fb.group({
      client: ['', Validators.required],
      nomDuBoitier: ['', Validators.required],
      numeroSerie: ['', Validators.required],
      commandePasserPar: ['', Validators.required],
      dureeDeLicence: [''],
      nomDuContact: [''],
      adresseEmailContact: ['', [Validators.email]],
      sousContrat: [false],
      mailAdmin: ['', [Validators.email]],
      ccMail: this.fb.array([this.fb.control('', [Validators.email])]),
      numero: [''],
      remarque: [''],
      licences: this.fb.array([this.createLicenceGroup()])
    });
  }

  get ccMail(): FormArray {
    return this.updateForm.get('ccMail') as FormArray;
  }

  get licences(): FormArray {
    return this.updateForm.get('licences') as FormArray;
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

  addCcMail(): void {
    this.ccMail.push(this.fb.control('', [Validators.email]));
  }

  removeCcMail(index: number): void {
    this.ccMail.removeAt(index);
  }

  setCcMail(ccMails: string[]): void {
    const ccMailFormArray = this.updateForm.get('ccMail') as FormArray;
    ccMailFormArray.clear();
    if (ccMails && ccMails.length > 0) {
      ccMails.forEach(email => ccMailFormArray.push(this.fb.control(email, Validators.email)));
    } else {
      ccMailFormArray.push(this.fb.control('', Validators.email));
    }
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

  loadFortinet(id: number): void {
    this.fortinetService.getFortinetById(id).subscribe(
      (fortinet: Fortinet) => {
        console.log('Fortinet chargé:', fortinet);
        console.log('Valeur commandePasserPar from API:', fortinet.commandePasserPar);
        console.log('Type de commandePasserPar:', typeof fortinet.commandePasserPar);
        
        // Convertir la valeur en enum
        const commandePasserParValue = this.getCommandePasserParValue(fortinet.commandePasserPar);
        console.log('Valeur convertie commandePasserPar:', commandePasserParValue);
        
        this.updateForm.patchValue({
          client: fortinet.client,
          nomDuBoitier: fortinet.nomDuBoitier,
          numeroSerie: fortinet.numeroSerie,
          commandePasserPar: commandePasserParValue,
          dureeDeLicence: fortinet.dureeDeLicence,
          nomDuContact: fortinet.nomDuContact,
          sousContrat: fortinet.sousContrat,
          adresseEmailContact: fortinet.adresseEmailContact,
          mailAdmin: fortinet.mailAdmin,
          numero: fortinet.numero,
          remarque: fortinet.remarque
        });

        // Vérifier la valeur après le patch
        setTimeout(() => {
          console.log('Valeur dans formulaire après patch:', this.updateForm.get('commandePasserPar')?.value);
        }, 100);

        // Charger les licences
        this.licences.clear();
        if (fortinet.licences && fortinet.licences.length > 0) {
          fortinet.licences.forEach(lic => {
            this.licences.push(this.fb.group({
              nomDesLicences: [lic.nomDesLicences, Validators.required],
              quantite: [lic.quantite, Validators.required],
              dateEx: [this.formatDate(lic.dateEx), Validators.required]
            }));
          });
        } else {
          this.addLicence();
        }

        // Charger les CC mails
        this.setCcMail(fortinet.ccMail || []);
      },
      error => {
        console.error('Erreur lors du chargement du Fortinet:', error);
      }
    );
  }

  formatDate(date: string | Date): string {
    if (!date) return '';
    
    // Si c'est déjà une string au format YYYY-MM-DD, la retourner telle quelle
    if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date;
    }
    
    const d = new Date(date);
    
    // Vérifier si la date est valide
    if (isNaN(d.getTime())) {
      console.warn('Date invalide:', date);
      return '';
    }
    
    return d.toISOString().substring(0, 10);
  }

  updateFortinet(): void {
    if (this.updateForm.valid) {
      const updatedFortinet: Fortinet = {
        fortinetId: this.fortinetId,
        client: this.updateForm.value.client,
        nomDuBoitier: this.updateForm.value.nomDuBoitier,
        numeroSerie: this.updateForm.value.numeroSerie,
        commandePasserPar: this.updateForm.value.commandePasserPar,
        dureeDeLicence: this.updateForm.value.dureeDeLicence,
        nomDuContact: this.updateForm.value.nomDuContact,
        adresseEmailContact: this.updateForm.value.adresseEmailContact,
        mailAdmin: this.updateForm.value.mailAdmin || '',
        ccMail: this.ccMail.value.filter((email: string) => email !== ''), // Filtrer les emails vides
        sousContrat: this.updateForm.value.sousContrat,
        numero: this.updateForm.value.numero,
        approuve: this.fortinet?.approuve || false,
        remarque: this.updateForm.value.remarque || '',
        licences: this.licences.value
      };

      console.log('Données à mettre à jour:', updatedFortinet);

      this.fortinetService.updateFortinet(updatedFortinet).subscribe(
        response => {
          console.log('Réponse mise à jour:', response);
          window.alert('Fortinet mis à jour avec succès');
          this.router.navigate(['/Afficherfortinet']);
        },
        error => {
          console.error('Erreur lors de la mise à jour:', error);
          if (error.error) {
            console.error('Détails de l\'erreur:', error.error);
          }
          window.alert('Échec de la mise à jour: ' + (error.error?.message || error.message));
        }
      );
    } else {
      console.log('Formulaire invalide', this.updateForm.errors);
      // Marquer tous les champs comme touchés pour afficher les erreurs
      this.markFormGroupTouched(this.updateForm);
      window.alert('Le formulaire est invalide. Veuillez corriger les erreurs.');
    }
  }

  // Méthode pour marquer tous les champs comme touchés
  private markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  onSubmit(): void {
    this.updateFortinet();
  }

  onCancel(): void {
    this.router.navigate(['/Afficherfortinet']);
  }
}