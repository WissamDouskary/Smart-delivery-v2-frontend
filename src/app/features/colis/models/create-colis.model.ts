import { COLIS_PRIORITY } from "./enums/colis-priority.enum";
import { COLIS_STATUS } from "./enums/colis-status.enum";

export interface createColisModel {
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
  } | {
    id: string;
  };
  sender: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
  } | {
    id: string;
  };
  livreur: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
  } | null | {
    id: string;
  };
  city: {
    id: string;
    nom: string;
    codePostal: number;
  } | {
    id: string;
  };
  historiqueLivraisonList: {
    id: string;
    status: string;
    changementDate: string;
    comment: string;
  }[] | null;
  colisProducts: {
    id: string;
    nom: string;
    category: string;
    poids: number;
    price: number;
    quantity: number;
  }[] | {
    id: string;
  };
  status: COLIS_STATUS;
  priority: COLIS_PRIORITY;
}
