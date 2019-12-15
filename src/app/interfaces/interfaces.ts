export interface Game {
    id: string;
    name: string;
    url: string;
    votos: number;
}
export interface Lugar {
    id: string;
    nombre: string;
    lng: number;
    lat: number;
    color: string;
}
export interface Geolocation {
    lng: number;
    lat: number;
}