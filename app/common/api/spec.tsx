import { NewSpecForm } from "../../pages/Spec/SpecCreate";
import { EditSpecForm } from "../../pages/Spec/SpecEdit";
import request from "./request";

export async function createSpec(values: NewSpecForm) {
    return await request('/api/spec/create', "POST", values, true).then((res) => {
        if (res.status === 200) {
            return res.json;
        }
        return null;
    })
}

export async function getSpecDetails(uid: string | undefined) {  
    if (uid === undefined) return null;  
    return await request(`/api/spec/${uid}`, "GET", null, true).then((res) => {        
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    });
}

export async function editSpec(id: number, values: EditSpecForm) {
    return await request(`/api/spec/${id}/edit`, "PATCH", values, true).then((res) => {
        if (res.status === 200) {
            return res.json;
        }
        return null;
    })
}
