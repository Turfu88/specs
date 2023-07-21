import { NewFeatureForm } from "../../pages/Feature/FeatureCreate";
import { EditFeatureForm } from "../../pages/Feature/FeatureEdit";
import request from "./request";

export async function createFeature(values: NewFeatureForm) {
    return await request('/api/feature/create', "POST", values, true).then((res) => {
        if (res.status === 200) {
            return res.json;
        }
        return null;
    })
}

export async function getFeatureDetails(uid: string | undefined) {  
    if (uid === undefined) return null;  
    return await request(`/api/feature/${uid}`, "GET", null, true).then((res) => {        
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    });
}

export async function editFeature(id: number, values: EditFeatureForm) {
    return await request(`/api/feature/${id}/edit`, "PATCH", values, true).then((res) => {
        if (res.status === 200) {
            return res.json;
        }
        return null;
    })
}

export async function deleteFeature(featureId: number) {
    return await request(`/api/feature/${featureId}/delete`, "DELETE", true).then((res) => {        
        if (res.status === 200) {
            return res.json;
        }
        return null;
    });
}
