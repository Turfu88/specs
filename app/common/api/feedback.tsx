import { EditFeedbackForm } from "../components/FeedbackEdit";
import { CreateFeedbackForm } from "../components/FeedbackSection";
import request from "./request";

export async function createFeedback(values: CreateFeedbackForm) {
    return await request('/api/feedback/create', "POST", values, true).then((res) => {
        if (res.status === 200) {
            return res.json;
        }
        return null;
    })
}

export async function editFeedback(id: number, values: EditFeedbackForm) {
    return await request(`/api/feedback/${id}/edit`, "PATCH", values, true).then((res) => {
        if (res.status === 200) {
            return res.json;
        }
        return null;
    })
}
