import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";

interface Token {
    exp: number,
    iat: number,
    roles: string[],
    username: string,
    userId: number,
    accountId: number
}

export function getAccountId(): number | null {
    let cookie = Cookies.get('token');
    if (cookie) {
        const token: Token | null = jwt_decode(cookie);
        if (token) {
            return token.accountId;
        }
    }

    return null;
}

export function getUserId(): number | null {
    let cookie = Cookies.get('token');
    if (cookie) {
        const token: Token | null = jwt_decode(cookie);
        if (token) {
            return token.userId;
        }
    }

    return null;
}
