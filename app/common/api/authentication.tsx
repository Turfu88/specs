import request from "./request";
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";

// const defaultSession = {
//     is_authenticated: false,
//     is_admin: false,
//     is_user: false,
//     id: null
// }

// interface SessionAuthenticated {
//     is_authenticated: boolean,
//     is_admin: boolean,
//     is_user: boolean,
//     id: Number | null
// }

interface Token {
    exp: number,
    iat: number,
    roles: string[],
    username: string
}

// @TODO: typer les params d'entrée des fonctions
export async function login(params: any) {
    return await request('/api/login', "POST", params).then((res) => {
        if (res.status === 200) {
            Cookies.set('token', res.json.token)
            return true;
        }
        return false;
    });
}

export function isLogedIn(role: string) {
    let cookie = Cookies.get('token');
    if (cookie) {
        const token: Token | null = jwt_decode(cookie);
        if (token) {
            return token.roles[0].split(',').includes(role) ? true : false;
        }
    }

    return false;
}

export function signOut() {
    Cookies.remove('token')
    window.location.replace("/login");
}
