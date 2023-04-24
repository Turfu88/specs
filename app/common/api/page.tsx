import { NewPageForm } from "../../pages/Page/PageCreate";
import { EditPageForm } from "../../pages/Page/PageEdit";
import request from "./request";

export async function createPage(values: NewPageForm) {
    return await request('/api/page/create', "POST", values, true).then((res) => {
        if (res.status === 200) {
            return res.json;
        }
        return null;
    })
}

export async function getPageDetails(uid: string | undefined) {  
    if (uid === undefined) return null;  
    return await request(`/api/page/${uid}`, "GET", null, true).then((res) => {        
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    });
}

export async function editPage(id: number, values: EditPageForm) {
    console.log(values);
    
    return await request(`/api/page/${id}/edit`, "PATCH", values, true).then((res) => {
        if (res.status === 200) {
            return res.json;
        }
        return null;
    })
}
