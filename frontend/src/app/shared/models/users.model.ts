export interface IUser {

    id?: number;
    name?: string;
    email?: string;
    password?: string;
    c_password?: string;
    message?: string;
    token?: string;
    liga_id?: number;
    saldo?: number;
    saldoRestante?: number;
    //extra
    usuario?: IUser;

}