export interface IUser {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    message?: string;
    token?: string;
    liga_id?: number;
    saldo?: number;

    //extra
    usuario?: IUser;

}