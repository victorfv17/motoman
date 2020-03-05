export interface IUser {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    message?: string;
    token?: string;
    liga_id?: number;

    //extra
    usuario?: IUser;

}