import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { colis } from '../../models/get-colis.model';
import { COLIS_PRIORITY } from '../../models/enums/colis-priority.enum';
import { COLIS_STATUS } from '../../models/enums/colis-status.enum';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.css',
})

export class Card {
  @Input() colis: colis = {
    id: '',
    description: '',
    poids: 0,
    vileDistination: '',
    receiver: {
      id: '',
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: ''
    },
    sender: {
      id: '',
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: ''
    },
    livreur: null,
    city: {
      id: '',
      nom: '',
      codePostal: 0
    },
    historiqueLivraisonList: [],
    colisProducts: [],
    status: COLIS_STATUS.CREATED,
    priority: COLIS_PRIORITY.URGENT
  };

  getStatusLabel(status: COLIS_STATUS): string {
    switch (status) {
      case COLIS_STATUS.CREATED: return 'Créé';
      case COLIS_STATUS.COLLECTED: return 'Collecté';
      case COLIS_STATUS.IN_STOCK: return 'En Entrepôt';
      case COLIS_STATUS.LIVRED: return 'Livré';
      default: return 'Inconnu';
    }
  }

  getStatusClass(status: COLIS_STATUS): string {
    switch (status) {
      case COLIS_STATUS.CREATED: return 'bg-blue-50 text-blue-600 ring-blue-100';
      case COLIS_STATUS.COLLECTED: return 'bg-amber-50 text-amber-600 ring-amber-100';
      case COLIS_STATUS.IN_STOCK: return 'bg-purple-50 text-purple-600 ring-purple-100';
      case COLIS_STATUS.LIVRED: return 'bg-emerald-50 text-emerald-600 ring-emerald-100';
      default: return 'bg-slate-50 text-slate-600 ring-slate-100';
    }
  }

  getProgress(status: COLIS_STATUS): number {
    switch (status) {
      case COLIS_STATUS.CREATED: return 10;
      case COLIS_STATUS.COLLECTED: return 40;
      case COLIS_STATUS.IN_STOCK: return 70;
      case COLIS_STATUS.LIVRED: return 100;
      default: return 0;
    }
  }

  getProgressClass(status: COLIS_STATUS): string {
    switch (status) {
      case COLIS_STATUS.CREATED: return 'bg-blue-500';
      case COLIS_STATUS.COLLECTED: return 'bg-amber-500';
      case COLIS_STATUS.IN_STOCK: return 'bg-purple-500';
      case COLIS_STATUS.LIVRED: return 'bg-emerald-500';
      default: return 'bg-slate-500';
    }
  }

  getPriorityClass(priority: COLIS_PRIORITY): string {
    switch (priority) {
      case COLIS_PRIORITY.URGENT: return 'text-rose-500';
      case COLIS_PRIORITY.NORMALE: return 'text-blue-500';
      case COLIS_PRIORITY.NON_URGENT: return 'text-slate-400';
      default: return 'text-slate-400';
    }
  }
}
