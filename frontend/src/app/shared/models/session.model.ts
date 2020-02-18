import { IUser } from './users.model';

export interface ISession {
    token: string;
    user: IUser;
}