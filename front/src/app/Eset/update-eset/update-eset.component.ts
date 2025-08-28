import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EsetService } from 'app/Services/eset.service';
import { Eset } from 'app/Model/Eset';
import { TypeAchat } from 'app/Model/TypeAchat';
import { CommandePasserPar } from 'app/Model/CommandePasserPar';

@Component({
  selector: 'app-update-eset',
  templateUrl: './update-eset.component.html',
  styleUrls: ['./update-eset.component.scss']
})
export class UpdateEsetComponent implements OnInit {
  Validators = Validators;
  updateForm!: FormGroup;
  esetid!: number;
  eset!: Eset;
  commandePasserParOptions = [
    { label: 'GI_TN', value: CommandePasserPar.GI_TN },
    { label: 'GI_FR', value: CommandePasserPar.GI_FR },
    { label: 'GI_CI', value: CommandePasserPar.GI_CI }
  ];

  constructor(
    public fb: FormBuilder,
    private esetService: EsetService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadEsetData();
  }

  initializeForm(): void {
    this.updateForm = this.fb.group({
      client: ['', Validators.required],
      identifiant: ['', Validators.required],
      cle_de_Licence: ['', Validators.required],
      nom_produit: ['', Validators.required],
      nombre: [1, [Validators.required, Validators.min(1)]],
      nmb_tlf: ['', [ Validators.pattern(/^\d+$/)]],
      nom_contact: [''],
      dureeDeLicence: [''],
      commandePasserPar: ['', Validators.required],
      mail: [''],
      mailAdmin: ['', Validators.email],
      dateEx: ['', Validators.required],
      typeAchat: ['', Validators.required],
      ccMail: this.fb.array([]),
      sousContrat: [false],
      remarque: ['']
    });
  }

  loadEsetData(): void {
    this.esetid = Number(this.route.snapshot.params['id']);
    this.esetService.getEsetById(this.esetid).subscribe(
      (data: Eset) => {
        this.eset = data;
        console.log('Eset reçu:', this.eset);
        this.populateForm(data);
      },
      (error) => {
        console.error('Erreur lors de la récupération d\'ESET:', error);
      }
    );
  }

  populateForm(data: Eset): void {
    // Préparer la date au format yyyy-MM-dd pour input date
    let dateExStr = '';
    if (data.dateEx) {
      const date = new Date(data.dateEx);
      dateExStr = date.toISOString().substring(0, 10);
    }

    // Remplir les champs principaux
    this.updateForm.patchValue({
      client: data.client ?? '',
      identifiant: data.identifiant ?? '',
      cle_de_Licence: data.cle_de_Licence ?? '',
      nom_produit: data.nom_produit ?? '',
      nombre: data.nombre ?? 1,
      nmb_tlf: data.nmb_tlf ? data.nmb_tlf.toString() : '',
      nom_contact: data.nom_contact ?? '',
      dureeDeLicence: data.dureeDeLicence ?? '',
      commandePasserPar: this.getCommandePasserParValue(data.commandePasserPar),
      mail: data.mail ?? '',
      mailAdmin: data.mailAdmin ?? '',
      dateEx: dateExStr,
      typeAchat: data.typeAchat ?? 'RENOUVELLEMENT',
      sousContrat: data.sousContrat ?? false,
      remarque: data.remarque ?? ''
    });

    // Remplir les emails CC
    this.populateCcMail(data.ccMail);
  }

  populateCcMail(ccMail: string[] | undefined): void {
    this.ccMail.clear();
    if (ccMail && ccMail.length > 0) {
      ccMail.forEach(email => {
        this.ccMail.push(this.fb.control(email, Validators.email));
      });
    } else {
      this.ccMail.push(this.fb.control('', Validators.email));
    }
  }

  private getCommandePasserParValue(value: any): CommandePasserPar {
    if (!value) return CommandePasserPar.GI_TN;
    
    const stringValue = String(value).toUpperCase().trim();
    
    switch (stringValue) {
      case 'GI_TN': return CommandePasserPar.GI_TN;
      case 'GI_FR': return CommandePasserPar.GI_FR;
      case 'GI_CI': return CommandePasserPar.GI_CI;
      default: return CommandePasserPar.GI_TN;
    }
  }

  updateEset(): void {
    if (this.updateForm.valid) {
      const formValue = this.updateForm.value;
      
      const updatedEset: Eset = {
        esetid: this.esetid,
        client: formValue.client,
        identifiant: formValue.identifiant,
        cle_de_Licence: formValue.cle_de_Licence,
        nom_produit: formValue.nom_produit,
        dureeDeLicence: formValue.dureeDeLicence,
        sousContrat: formValue.sousContrat,
        remarque: formValue.remarque,
        commandePasserPar: formValue.commandePasserPar,
        nombre: Number(formValue.nombre),
        nmb_tlf: Number(formValue.nmb_tlf),
        nom_contact: formValue.nom_contact,
        mailAdmin: formValue.mailAdmin,
        mail: formValue.mail,
        dateEx: formValue.dateEx,
        typeAchat: formValue.typeAchat,
        ccMail: formValue.ccMail.filter((email: string) => email.trim() !== ''),
        approuve: this.eset.approuve // Conserver le statut d'approbation
      };

      console.log('Données envoyées au serveur:', updatedEset);

      this.esetService.updateEset(updatedEset).subscribe(
        () => {
          console.log('Eset mis à jour avec succès');
          this.router.navigate(['/affichage']);
        },
        (error) => {
          console.error('Erreur mise à jour ESET:', error);
          alert('Erreur lors de la mise à jour: ' + (error.error?.message || error.message));
        }
      );
    } else {
      console.error('Formulaire invalide', this.updateForm);
      this.markFormGroupTouched(this.updateForm);
      alert('Veuillez corriger les erreurs dans le formulaire');
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }

  get ccMail() {
    return this.updateForm.get('ccMail') as FormArray;
  }

  addCcMail(): void {
    this.ccMail.push(this.fb.control('', Validators.email));
  }

  removeCcMail(index: number): void {
    if (this.ccMail.length > 1) {
      this.ccMail.removeAt(index);
    }
  }
}