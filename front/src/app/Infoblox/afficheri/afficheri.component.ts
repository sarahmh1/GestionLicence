import { Component, OnInit } from '@angular/core';
import { InfobloxService } from 'app/Services/infoblox.service';
import { Infoblox } from 'app/Model/Infoblox';
import { Router } from '@angular/router';
@Component({
  selector: 'app-afficheri',
  templateUrl: './afficheri.component.html',
  styleUrls: ['./afficheri.component.scss']
})
export class AfficheriComponent implements OnInit {

  searchTerm: string = '';
   infobloxs: Infoblox[] = [];
   filteredInfobloxs: Infoblox[] = [];
 
    currentPage = 0;
     pageSize = 10;
     totalPages: number = 0;
     pagedInfobloxs:Infoblox[] = [];
    unapprovedInfobloxs:Infoblox[] = [];
 
   constructor(private infobloxService: InfobloxService, private router: Router) {}
 
  ngOnInit(): void {
      this.getAllInfobloxs();
    }
  
    onSearch() {
      this.filteredInfobloxs = this.filterInfobloxs();
      this.calculatePagination();
      this.changePage(0);
    }
  
    getAllInfobloxs(): void {
      this.infobloxService.getAllInfobloxs().subscribe(
        (data: Infoblox[]) => {
          this.infobloxs = data;
          this.filteredInfobloxs = data;
          this.calculatePagination();
          this.changePage(0);
        },
        (error) => {
          console.error('Erreur récupération Infobloxs', error);
        }
      );
    }
  
    filterInfobloxs(): Infoblox[] {
      const term = this.searchTerm.toLowerCase();
      return this.infobloxs.filter((infoblox) => {
        const inLicences = infoblox.licences?.some(lic =>
          lic.nomDesLicences?.toLowerCase().includes(term) ||
          lic.quantite?.toLowerCase().includes(term) ||
          (lic.dateEx && new Date(lic.dateEx).toLocaleDateString('fr-FR').includes(term))
        );
  
        const inMainFields =
          infoblox.client?.toLowerCase().includes(term) ||
          infoblox.nomDuContact?.toLowerCase().includes(term) ||
          infoblox.adresseEmailContact?.toLowerCase().includes(term) ||
          infoblox.numero?.toLowerCase().includes(term) ||
          infoblox.dureeDeLicence?.toLowerCase?.().includes(term);
  
        return inMainFields || inLicences;
      });
    }
  
    calculatePagination() {
      this.totalPages = Math.ceil(this.filteredInfobloxs.length / this.pageSize);
    }
  
    changePage(pageIndex: number) {
      this.currentPage = pageIndex;
      const start = this.currentPage * this.pageSize;
      const end = start + this.pageSize;
      this.pagedInfobloxs = this.filteredInfobloxs.slice(start, end);
    }
  
    approveInfoblox(id: number): void {
      this.infobloxService.activate(id).subscribe(() => {
         this.unapprovedInfobloxs = this.unapprovedInfobloxs.filter(infoblox => infoblox.infobloxId !== id);
      this.filteredInfobloxs = this.filteredInfobloxs.filter(infoblox => infoblox.infobloxId !== id);
      this.calculatePagination();
      this.changePage(this.currentPage);
      console.log('Article approuvé et retiré de la liste');
    });
  }
  
    deleteInfoblox(id: number | undefined | null): void {
      if (id != null && confirm('Confirmer la suppression ?')) {
        this.infobloxService.deleteInfoblox(id).subscribe(
          () => {
            this.getAllInfobloxs();
            alert('Infoblox supprimé avec succès');
          },
          error => {
            console.error('Erreur suppression Infoblox', error);
            alert('Échec suppression');
          }
        );
      }
    }
  
    updateInfoblox(infoblox: Infoblox): void {
      this.router.navigate(['/edit-infoblox', infoblox.infobloxId]);
    }
  
    goToAddInfoblox() {
      this.router.navigate(['/Ajouteri']);
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
  