import { Component, OnInit } from '@angular/core';
import { PaloService } from 'app/Services/palo.service';
import { Palo } from 'app/Model/Palo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-afficher-palo',
  templateUrl: './afficher-palo.component.html',
  styleUrls: ['./afficher-palo.component.scss']
})
export class AfficherPaloComponent implements OnInit {
  searchTerm: string = '';
    palos: Palo[] = [];
    filteredPalos: Palo[] = [];
    unapprovedPalos: Palo[] = [];
  
    currentPage = 0;
    pageSize = 10;
    totalPages: number = 0;
    pagedPalos: Palo[] = [];
  
    constructor(private paloService: PaloService, private router: Router) {}
  
    ngOnInit(): void {
      this.getAllPalos();
    }
  
    onSearch() {
      this.filteredPalos = this.filterPalos();
      this.calculatePagination();
      this.changePage(0);
    }
  
    getAllPalos(): void {
      this.paloService.getAllPalos().subscribe(
        (data: Palo[]) => {
          this.palos = data;
          this.filteredPalos = data;
          this.calculatePagination();
          this.changePage(0);
        },
        (error) => {
          console.error('Erreur récupération Fortinets', error);
        }
      );
    }
  
    filterPalos(): Palo[] {
      const term = this.searchTerm.toLowerCase();
      return this.palos.filter((palo) => {
        const inLicences = palo.licences?.some(lic =>
          lic.nomDesLicences?.toLowerCase().includes(term) ||
          lic.quantite?.toLowerCase().includes(term) ||
          (lic.dateEx && new Date(lic.dateEx).toLocaleDateString('fr-FR').includes(term))
        );
  
        const inMainFields =
          palo.client?.toLowerCase().includes(term) ||
          palo.nomDuBoitier?.toLowerCase().includes(term) ||
          palo.numeroSerieBoitier?.toLowerCase().includes(term) ||
          palo.nomDuContact?.toLowerCase().includes(term) ||
          palo.adresseEmailContact?.toLowerCase().includes(term) ||
          palo.numero?.toLowerCase().includes(term) ||
          palo.dureeDeLicence?.toLowerCase?.().includes(term);
  
        return inMainFields || inLicences;
      });
    }
  
    calculatePagination() {
      this.totalPages = Math.ceil(this.filteredPalos.length / this.pageSize);
    }
  
    changePage(pageIndex: number) {
      this.currentPage = pageIndex;
      const start = this.currentPage * this.pageSize;
      const end = start + this.pageSize;
      this.pagedPalos = this.filteredPalos.slice(start, end);
    }
  
    approvePalo(id: number): void {
      this.paloService.activate(id).subscribe(() => {
      // Retirer l'ESET approuvé de la liste des non approuvés
      this.unapprovedPalos = this.unapprovedPalos.filter(palo => palo.paloId !== id);
      this.filteredPalos = this.filteredPalos.filter(palo => palo.paloId !== id);
      this.calculatePagination();
      this.changePage(this.currentPage);
      console.log('Article approuvé et retiré de la liste');
    });
  }
  
    deletePalo(id: number | undefined | null): void {
      if (id != null && confirm('Confirmer la suppression ?')) {
        this.paloService.deletePalo(id).subscribe(
          () => {
            this.getAllPalos();
            alert('Palo supprimé avec succès');
          },
          error => {
            console.error('Erreur suppression Palo', error);
            alert('Échec suppression');
          }
        );
      }
    }
  
    updatePalo(palo: Palo): void {
      this.router.navigate(['/edit-palo', palo.paloId]);
    }
  
    goToAddPalo() {
      this.router.navigate(['/Ajouterpalo']);
    }
  
    get pageNumbers(): number[] {
      return Array.from({ length: this.totalPages }, (_, i) => i);
    }
    getCommandePasserParLabel(value: any): string {
  switch (value) {
    case 'GI_TN': return 'GI_TN';
    case 'GI_FR': return 'GI_FR';
    case 'GI_CI': return 'GI_CI';
    default: return value;
  }
}
  }
  