import { Component, OnInit } from '@angular/core';
import { SecPointService } from 'app/Services/sec-point.service';
import { SecPoint } from 'app/Model/SecPoint';
import { Router } from '@angular/router';
@Component({
  selector: 'app-affichers',
  templateUrl: './affichers.component.html',
  styleUrls: ['./affichers.component.scss']
})
export class AffichersComponent implements OnInit {

  searchTerm: string = '';
   secPoints: SecPoint[] = [];
   filteredSecPoints: SecPoint[] = [];
  unapprovedSecPoints:SecPoint[] = [];
    currentPage = 0;
     pageSize = 10;
     totalPages: number = 0;
     pagedSecPoints:SecPoint[] = [];
 
   constructor(private secPointService: SecPointService, private router: Router) {}
 
  ngOnInit(): void {
      this.getAllSecPoints();
    }
  
    onSearch() {
      this.filteredSecPoints = this.filterSecPoints();
      this.calculatePagination();
      this.changePage(0);
    }
  
    getAllSecPoints(): void {
      this.secPointService.getAllSecPoints().subscribe(
        (data: SecPoint[]) => {
          this.secPoints = data;
          this.filteredSecPoints = data;
          this.calculatePagination();
          this.changePage(0);
        },
        (error) => {
          console.error('Erreur récupération SecPoints', error);
        }
      );
    }
  
    filterSecPoints(): SecPoint[] {
      const term = this.searchTerm.toLowerCase();
      return this.secPoints.filter((secPoint) => {
        const inLicences = secPoint.licences?.some(lic =>
          lic.nomDesLicences?.toLowerCase().includes(term) ||
          lic.quantite?.toLowerCase().includes(term) ||
          (lic.dateEx && new Date(lic.dateEx).toLocaleDateString('fr-FR').includes(term))
        );
  
        const inMainFields =
          secPoint.client?.toLowerCase().includes(term) ||
          secPoint.nomDuContact?.toLowerCase().includes(term) ||
          secPoint.adresseEmailContact?.toLowerCase().includes(term) ||
          secPoint.numero?.toLowerCase().includes(term) ||
          secPoint.dureeDeLicence?.toLowerCase?.().includes(term);
  
        return inMainFields || inLicences;
      });
    }
  
    calculatePagination() {
      this.totalPages = Math.ceil(this.filteredSecPoints.length / this.pageSize);
    }
  
    changePage(pageIndex: number) {
      this.currentPage = pageIndex;
      const start = this.currentPage * this.pageSize;
      const end = start + this.pageSize;
      this.pagedSecPoints = this.filteredSecPoints.slice(start, end);
    }
  
    approveSecPoint(id: number): void {
      this.secPointService.activate(id).subscribe(() => {
       this.unapprovedSecPoints = this.unapprovedSecPoints.filter(secPoint => secPoint.secPointId !== id);
      this.filteredSecPoints = this.filteredSecPoints.filter(secPoint => secPoint.secPointId !== id);
      this.calculatePagination();
      this.changePage(this.currentPage);
      console.log('Article approuvé et retiré de la liste');
    });
  }
  
    deleteSecPoint(id: number | undefined | null): void {
      if (id != null && confirm('Confirmer la suppression ?')) {
        this.secPointService.deleteSecPoint(id).subscribe(
          () => {
            this.getAllSecPoints();
            alert('SecPoint supprimé avec succès');
          },
          error => {
            console.error('Erreur suppression SecPoint', error);
            alert('Échec suppression');
          }
        );
      }
    }
  
    updateSecPoint(secPoint: SecPoint): void {
      this.router.navigate(['/edit-secPoint', secPoint.secPointId]);
    }
  
    goToAddSecPoint() {
      this.router.navigate(['/Ajouters']);
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
  