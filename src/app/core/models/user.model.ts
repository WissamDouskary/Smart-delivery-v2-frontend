export type UserRole = 'Sender' | 'Livreur' | 'Receiver' | 'Manager' | 'Admin';

export interface User {
    id: string;
    nom: string;
    prenom: string;
    email?: string;
    telephone: string;
    adresse?: string;
    role: UserRole;
    vehicle?: string; // Specific to Livreur
    city?: any; // Specific to Livreur
}
