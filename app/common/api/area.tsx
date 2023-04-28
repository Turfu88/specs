import { EditAreaForm } from "../../pages/Area/AreaEdit";
import request from "./request";

export async function getAreaDetails(uid: string | undefined) {  
    if (uid === undefined) return null;  
    return await request(`/api/area/${uid}`, "GET", null, true).then((res) => {        
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    });
}

export async function editArea(id: number, values: EditAreaForm) {
    return await request(`/api/area/${id}/edit`, "PATCH", values, true).then((res) => {
        if (res.status === 200) {
            return res.json;
        }
        return null;
    })
}