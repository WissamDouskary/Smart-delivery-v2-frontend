import { inject, Injectable } from "@angular/core";
import { ApiService } from "../../core/services/api.service";
import { colis } from "./models/get-colis.model";
import { Observable } from "rxjs";
import { Colis } from "./pages/colis/colis";

@Injectable({providedIn: "root"})
export class ColisApi {
    private apiService = inject(ApiService);

    getAllColis(){
        return this.apiService.get<colis[]>("colis");
    }

    getColisById(id: string | null){
        return this.apiService.get<colis>(`colis/${id}`); 
    }
}