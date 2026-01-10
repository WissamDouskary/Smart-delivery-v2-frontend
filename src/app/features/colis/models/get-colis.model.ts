import { COLIS_PRIORITY } from './enums/colis-priority.enum';
import { COLIS_STATUS } from './enums/colis-status.enum';

export interface colis {
  id: string;
  description: string;
  poids: number;
  vileDistination: string;
  receiver: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
  };
  sender: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
  };
  livreur: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
  } | null;
  city: {
    id: string;
    nom: string;
    codePostal: number;
  };
  historiqueLivraisonList: {
    id: string;
    status: string;
    changementDate: string;
    comment: string;
  }[];
  colisProducts: {
    id: string;
    nom: string;
    category: string;
    poids: number;
    price: number;
    quantity: number;
  }[];
  status: COLIS_STATUS;
  priority: COLIS_PRIORITY;
}
