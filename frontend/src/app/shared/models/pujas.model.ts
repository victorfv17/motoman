
export interface IPujas {
    id?: number;
    usuario?: number;
    piloto?: number;
    escuderia?: number;
    puja?: number;
    pujas?: Array<IPujas>;
}