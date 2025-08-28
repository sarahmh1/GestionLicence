import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandePasserPar } from 'app/Model/CommandePasserPar';
import { Splunk } from 'app/Model/Splunk';
import { SplunkService } from 'app/Services/splunk.service';

@Component({
  selector: 'app-update-splunk',
  templateUrl: './update-splunk.component.html',
  styleUrls: ['./update-splunk.component.scss']
})
export class UpdateSplunkComponent implements OnInit {
   updateForm!: FormGroup;
      splunkid!: number;
      splunk!: Splunk;
      public Validators = Validators;
     commandePasserParOptions = [
            { label: 'GI_TN', value: CommandePasserPar.GI_TN },
            { label: 'GI_FR', value: CommandePasserPar.GI_FR },
            { label: 'GI_CI', value: CommandePasserPar.GI_CI }
          ];
      constructor(
        public fb: FormBuilder,
        private splunkService: SplunkService,
        private route: ActivatedRoute,
        private router: Router
      ) {}
    
      ngOnInit(): void {
        this.updateForm = this.fb.group({
          client: ['', Validators.required],
          dureeLicence: [''],
          nomDuContact: [''],
          adresseEmailContact: ['', [Validators.required, Validators.email]],
          mailAdmin: ['', Validators.email],
          ccMail: this.fb.array([]),
          commandePasserPar: ['', Validators.required],
          numero: [''],
          remarques: [''],
          sousContrat: [false],
          licences: this.fb.array([])  // 👈 Ajout des licences dynamiques ici
        });
    
        this.splunkid = Number(this.route.snapshot.paramMap.get('id'));
        this.loadSplunk(this.splunkid);
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
    
      loadSplunk(id: number): void {
        this.splunkService.getSplunkById(id).subscribe(
          (data: Splunk) => {
            this.splunk = data;
    
            this.updateForm.patchValue({
              client: data.client ?? '',
              dureeLicence: data.dureeLicence ?? '',
              nomDuContact: data.nomDuContact ?? '',
              commandePasserPar: this.getCommandePasserParValue(data.commandePasserPar),
              adresseEmailContact: data.adresseEmailContact ?? '',
              mailAdmin: data.mailAdmin ?? '',
              numero: data.numero ?? '',
              remarques: data.remarques ?? '',
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
            console.error('Erreur récupération Splunk:', error);
          }
        );
      }
    
      formatDate(date: string | Date): string {
        const d = new Date(date);
        return d.toISOString().substring(0, 10); // yyyy-MM-dd
      }
    
      updateSplunk(): void {
        if (this.updateForm.valid) {
          const updatedSplunk: Splunk = {
            splunkid: this.splunkid,
            ...this.updateForm.value
          };
    
          this.splunkService.updateSplunk(updatedSplunk).subscribe(
            () => {
              console.log('Splunk mis à jour avec succès');
              this.router.navigate(['/Affichersplunk']);
            },
            error => {
              console.error('Erreur mise à jour Splunk:', error);
            }
          );
        } else {
          console.error('Formulaire invalide', this.updateForm);
        }
      }
    
      onSubmit(): void {
        this.updateSplunk();
      }
    
      onCancel(): void {
        this.router.navigate(['/Affichersplunk']);
      }
    }
    