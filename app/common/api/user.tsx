import request from "./request";
import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";

interface Token {
    exp: number,
    iat: number,
    roles: string[],
    username: string,
    userId: number,
    userEmail: string,
    accountId: number
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

export function getUserEmail(): string | null {
    let cookie = Cookies.get('token');
    if (cookie) {
        const token: Token | null = jwt_decode(cookie);
        if (token) {
            return token.userEmail;
        }
    }

    return null;
}

export async function getUserAreas() {    
    return await request(`/api/user/areas`, "GET", null, true).then((res) => {        
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    });
}

export async function getUserPages() {    
    return await request(`/api/user/pages`, "GET", null, true).then((res) => {        
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    });
}

export async function getUserFeatures() {    
    return await request(`/api/user/features`, "GET", null, true).then((res) => {        
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    });
}

export async function getUserSpecs() {    
    return await request(`/api/user/specs`, "GET", null, true).then((res) => {        
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    });
}

// @TODO: Typer toutes ces fonctions
export function testExistingUser(params: any) {
    request('/api/user/find', "POST", params).then((res) => {
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    })
}

export function createAdmin(params: any) {
    request('/api/area/create', "POST", params).then((res) => {
        if (res.status === 201) {
            return true;
        }
        return false;
    })
}

export function createUser(params: any) {
    request('/api/user/create', "POST", params).then((res) => {
        if (res.status === 201) {
            return true;
        }
        return false;
    })
}

export function updateUserPassword(params: any) {
    request('/api/user/password-update', "POST", params, true).then((res) => {
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    })
}

export function updateUser(params: any) {
    request('/api/user/update', "PATCH", params, true).then((res) => {
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    })
}
