import { newSenderModel } from '../../../core/models/new-sender.model';
import { COLIS_PRIORITY } from './enums/colis-priority.enum';
import { COLIS_STATUS } from './enums/colis-status.enum';

export interface createColisModel {
  description: string;
  vileDistination: string;
  receiver:
    | {
        id: string;
      }
    | {
        nom: string;
        prenom: string;
        email: string;
        telephone: string;
        adresse: string;
      };
  sender:
    | {
        id: string;
      }
    | newSenderModel
  products: [
    (
      | {
          id: string;
          quantity: number;
        }
      | {
          nom: string;
          category: string;
          poids: number;
          price: number;
          quantity: number;
        }
    ),
  ];
  city: {
    id: string;
  };
  priority: string;
}
