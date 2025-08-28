import { TypeAchat } from './../Model/TypeAchat';
import { EsetService } from './../Services/eset.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Eset } from 'app/Model/Eset';
import { NomProduit } from 'app/Model/NomProduit';
import { CommandePasserPar } from 'app/Model/CommandePasserPar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productForm!: FormGroup;
  typeAchatOptions = [
    { value: TypeAchat.RENOUVELLEMENT, display: 'Renouvellemnt' },
    { value: TypeAchat.UPGRADE, display: 'Upgrade' },
    { value: TypeAchat.NOUVEL_LICENCE, display: 'Nouvel Licence' },
    { value: TypeAchat.BUSINESS_TRIAL, display: 'Business Trial' },
    { value: TypeAchat.AUGMENTATION, display: 'Augmentation' },
    { value: TypeAchat.DOWNGRADE, display: 'Down Grade' },
    { value: TypeAchat.LICENCE_GRATUIT, display: 'Licence Gratuit' }
  ];
  
  // CORRECTION: Utilisez les mêmes noms que dans l'enum backend
  nomProduitOptions = [
  { value: NomProduit.eset_protect_entry, display: 'ESET PROTECT Entry' },
  { value: NomProduit.eset_protect_entry_on_prem, display: 'ESET PROTECT Entry On-Prem' },
  { value: NomProduit.eset_protect_advanced, display: 'ESET PROTECT Advanced' },
  { value: NomProduit.eset_protect_advanced_on_prem, display: 'ESET PROTECT Advanced On-Prem' },
  { value: NomProduit.eset_protect_essential, display: 'ESET PROTECT Essential' },
  { value: NomProduit.eset_protect_essential_on_prem, display: 'ESET PROTECT Essential On-Prem' },
  { value: NomProduit.eset_protect_essential_plus_on_prem, display: 'ESET PROTECT Essential Plus On-Prem' }, // CORRIGÉ
  { value: NomProduit.eset_protect_enterprise_on_prem, display: 'ESET PROTECT Enterprise On-Prem' },
  { value: NomProduit.eset_home_security_essential, display: 'Eset Home Security Essential' },
  { value: NomProduit.eset_protect_enterprise, display: 'Eset Protect Enterprise' },
  { value: NomProduit.eset_endpoint_encryption, display: 'Eset Endpoint Encryption' },
  { value: NomProduit.eset_endpoint_encryption_pro, display: 'Eset Endpoint Encryption Pro' },
  { value: NomProduit.eset_mail_security, display: 'Eset Mail Security' },
  { value: NomProduit.eset_smart_security_premium, display: 'Eset Smart Security Premium' },
  { value: NomProduit.eset_secure_authentication, display: 'Eset Secure Authentication' }, // CORRIGÉ
  { value: NomProduit.eset_internet_security, display: 'Eset Internet Security' },
  { value: NomProduit.eset_server_security, display: 'Eset Server Security' },
  { value: NomProduit.eset_protect_mail_plus, display: 'Eset Protect Mail Plus' },
  { value: NomProduit.eset_protect_complete, display: 'Eset Protect Complete' }
];
  commandePasserParOptions = [
    { label: 'GI_TN', value: CommandePasserPar.GI_TN },
    { label: 'GI_FR', value: CommandePasserPar.GI_FR },
    { label: 'GI_CI', value: CommandePasserPar.GI_CI }
  ];

  constructor(private fb: FormBuilder, 
              private router: Router,
              private esetService: EsetService) { }

  ngOnInit(): void {
    
    this.productForm = this.fb.group({
      client: ['', Validators.required],
      identifiant: ['', Validators.required],
      cle_de_Licence: ['', Validators.required],
      nom_produit: ['', Validators.required],
      remarque: [''],
      sousContrat: [false],
      nombre: [0, Validators.required],
      nmb_tlf: [0],
      commandePasserPar: ['', Validators.required],
      dureeDeLicence: [''],
      nom_contact: [''],
      mail: ['', [Validators.email]],
      mailAdmin: ['', [Validators.email]],
      dateEx: [null],
      typeAchat: ['', Validators.required],
      ccMail: this.fb.array([
        this.fb.control('', [Validators.email])
      ]),
      concernedPersonsEmails: this.fb.array([])
    });
  }

  get concernedPersonsEmails(): FormArray {
    return this.productForm.get('concernedPersonsEmails') as FormArray;
  }
  
  // Method to add a new email field
  addEmail() {
    this.concernedPersonsEmails.push(this.fb.control('', [Validators.required, Validators.email]));
  }
  
  // Method to remove an email field
  removeEmail(index: number) {
    this.concernedPersonsEmails.removeAt(index);
  }

  addProduct() {
    if (this.productForm.valid) {
      console.log('Valeurs du formulaire:', this.productForm.value);

      const newProduct: Eset = {
        esetid: null!,
        client: this.productForm.value.client,
        identifiant: this.productForm.value.identifiant,
        sousContrat: this.productForm.value.sousContrat || false,
        remarque: this.productForm.value.remarque || '',
        cle_de_Licence: this.productForm.value.cle_de_Licence,
        nom_produit: this.productForm.value.nom_produit,
        nombre: this.productForm.value.nombre || 0,
        nmb_tlf: this.productForm.value.nmb_tlf || 0,
        nom_contact: this.productForm.value.nom_contact || '',
        commandePasserPar: this.productForm.value.commandePasserPar,
        mailAdmin: this.productForm.value.mailAdmin || '',
        mail: this.productForm.value.mail || '',
        dateEx: this.productForm.value.dateEx,
        dureeDeLicence: this.productForm.value.dureeDeLicence || '',
        typeAchat: this.productForm.value.typeAchat,
        ccMail: this.ccMail.value || [],
        approuve: false // Valeur par défaut
      };

      console.log('JSON envoyé:', JSON.stringify(newProduct));
      console.log('Données envoyées au service:', newProduct);
      console.log('Nom produit envoyé:', newProduct.nom_produit);

      this.esetService.addEset(newProduct).subscribe(
        response => {
          console.log('Produit ajouté avec succès ', response);
          window.alert('Eset ajouté avec succès');
          this.router.navigate(['/affichage']);
        },
        error => {
          console.error('Erreur lors du l\'ajout du produit', error);
          window.alert('Échec de l\'ajout du produit: ' + (error.error?.message || error.message || 'Unknown error'));
        }
      );
    } else {
      // Afficher les erreurs de validation
      this.markFormGroupTouched(this.productForm);
      window.alert('Le formulaire est invalide. Veuillez corriger les erreurs.');
    }
  }

  // Méthode pour marquer tous les champs comme touched
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

  get ccMail(): FormArray {
    return this.productForm.get('ccMail') as FormArray;
  }

  addCcMail(): void {
    this.ccMail.push(this.fb.control('', [Validators.email]));
  }

  removeCcMail(index: number): void {
    this.ccMail.removeAt(index);
  }

  onCancel(): void {
    this.router.navigate(['/affichage']);
  }
}