import { IEscuderias } from './escuderias.model';

export interface IPilotos {
    id?: number;
    nombre?: string;
    pais?: string;
    numero?: number;
    edad?: number;
    id_escuderia?: number;
    nombre_escuderia?: string;
    escuderias?: IEscuderias;
    puntosTotales?: number;
    puntos?: number;
    valorMercado?: number;
    pujaMenorQueValorMercado?: boolean;
    saldoMenorQuePuja?: boolean;
}