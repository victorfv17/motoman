/**
 * Interfaz para el modelo de mercado
 */
export interface IMercado {
    id?: number;
    piloto?: string;
    escuderia?: string;
    valorMercado?: number;
    valorPuja?: number;
    fecha?: Date;
}