import request from "./request";

export async function addPageValidation(values: any) {
    return await request('/api/validation/add', "POST", values, true).then((res) => {
        if (res.status === 200) {
            return res.json;
        }
        return null;
    })
}

export async function deletePageValidation(values: any) {
    return await request('/api/validation/remove', "POST", values, true).then((res) => {
        if (res.status === 200) {
            return res.json;
        }
        return null;
    })
}
