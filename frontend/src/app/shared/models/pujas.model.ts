/**
 * Interfaz para el modelo de pujas
 */
export interface IPujas {
    id?: number;
    usuarioId?: number;
    usuario?: string;
    mercadoPilotoId?: number;
    mercadoEscuderiaId?: number;
    pilotoId?: number;
    piloto?: string;
    escuderiaId?: number;
    escuderia?: string;
    puja?: number;
    pujas?: Array<IPujas>;
    maxPuja?: number;
    visible?: boolean;
    valorPuja?: number;



}