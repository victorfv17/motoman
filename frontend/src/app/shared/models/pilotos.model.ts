import { IEscuderias } from './escuderias.model';

export interface IPilotos {
    id?: number;
    nombre?: string;
    pais?: string;
    numero?: number;
    id_escuderia?: number;
    nombre_escuderia?: string;
    escuderias?: IEscuderias;
    puntos?: string;
    valorMercado: number;

}