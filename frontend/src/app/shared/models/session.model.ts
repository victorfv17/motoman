import { IUser } from './users.model';
/**
 * Interfaz para los datos de sesion
 */
export interface ISession {
    token: string;
    user: IUser;
}