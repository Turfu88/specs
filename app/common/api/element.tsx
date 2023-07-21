import { NewElementForm } from "../../pages/Element/ElementCreate";
import { EditElementForm } from "../../pages/Element/ElementEdit";
import request from "./request";

export async function getElementDetails(uid: string | undefined) {  
    if (uid === undefined) return null;  
    return await request(`/api/element/${uid}`, "GET", null, true).then((res) => {        
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    });
}

export async function createElement(values: NewElementForm) {
    return await request('/api/element/create', "POST", values, true).then((res) => {
        if (res.status === 200) {
            return res.json;
        }
        return null;
    })
}

export async function editElement(id: number, values: EditElementForm) {
    return await request(`/api/element/${id}/edit`, "PATCH", values, true).then((res) => {
        if (res.status === 200) {
            return res.json;
        }
        return null;
    })
}

export async function deleteElement(elementId: number) {
    return await request(`/api/element/${elementId}/delete`, "DELETE", true).then((res) => {        
        if (res.status === 200) {
            return res.json;
        }
        return null;
    });
}
