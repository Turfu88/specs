import { NewPageForm } from "../../pages/Page/PageForm";
import request from "./request";

export async function createPage(values: NewPageForm) {
    return await request('/api/page/create', "POST", values, true).then((res) => {
        if (res.status === 200) {
            return res.json;
        }
        return null;
    })
}
