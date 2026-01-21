import { colis } from "../../../../features/colis/models/get-colis.model";

export interface ColisState {
    colis: colis[];
    selectedColis: colis | null;
    error: any;
}