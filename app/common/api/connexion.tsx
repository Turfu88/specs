import { NewConnectionForm } from "../../pages/Connection/ConnectionCreate";
import { EditConnectionForm } from "../../pages/Connection/ConnectionEdit";
import request from "./request";

export async function getConnectionDetails(uid: string | undefined) {  
    if (uid === undefined) return null;  
    return await request(`/api/connection/${uid}`, "GET", null, true).then((res) => {        
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    });
}

export async function createConnection(values: NewConnectionForm) {
    return await request('/api/connection/create', "POST", values, true).then((res) => {
        if (res.status === 200) {
            return res.json;
        }
        return null;
    })
}

export async function editConnection(id: number, values: EditConnectionForm) {
    return await request(`/api/connection/${id}/edit`, "PATCH", values, true).then((res) => {
        if (res.status === 200) {
            return res.json;
        }
        return null;
    })
}
