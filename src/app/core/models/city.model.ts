export interface CityModel {
    id: string;
    nom: string;
    codePostal: number;
}

export interface CityResponse {
    message: string;
    data: CityModel[];
}
