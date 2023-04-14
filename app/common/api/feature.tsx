import { NewFeatureForm } from "../../pages/Feature/FeatureForm";
import request from "./request";

export async function createFeature(values: NewFeatureForm) {
    return await request('/api/feature/create', "POST", values, true).then((res) => {
        if (res.status === 200) {
            return res.json;
        }
        return null;
    })
}