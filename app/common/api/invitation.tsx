import request from "./request";

interface InvitationForm {
    email: string,
    areaUid: string
}
export async function createInvitation(values: InvitationForm) {
    return await request('/api/invitation/create', "POST", values, true).then((res) => {
        if (res.status === 200) {
            return res.json;
        }
        return null;
    })
}

export async function getInvitationDetails(uid: string | undefined) {  
    if (uid === undefined) return null;  
    return await request(`/api/invitation/${uid}`, "GET", null, true).then((res) => {        
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    });
}