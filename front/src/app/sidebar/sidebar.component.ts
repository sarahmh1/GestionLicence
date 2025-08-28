import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Tableau de bord',  icon: 'pe-7s-graph', class: '' },
    { path: '/user', title: 'Utilisateur',  icon:'pe-7s-user', class: '' },
    { path: '/table', title: 'Produits',  icon:'pe-7s-note2', class: '' },
    { path: '/typography', title: 'Produits Expirés',  icon:'pe-7s-news-paper', class: '' },
    { path: '/profile', title: 'Profil',  icon:'pe-7s-news-paper', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
