import request from "./request";

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
    request('/api/account/create', "POST", params).then((res) => {
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
