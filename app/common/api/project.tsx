import { EditProjectForm } from "../../pages/Project/ProjectEdit";
import { ProjectSectionForm } from "../../pages/Project/ProjectEditSection";
import { ProjectStatusForm } from "../../pages/Project/ProjectEditStatus";
import { DefaultCoreForm, DefaultElement, DefaultPage } from "../../pages/ProjectCore/defaultValues";
import request from "./request";

interface createCoreType {
    elements: DefaultElement[],
    pages: DefaultPage[],
    form: DefaultCoreForm,
    account: Number
}

export async function createCore(values: createCoreType) {    
    return await request('/api/project/create-core', "POST", values, true).then((res) => {
        if (res.status === 200) {
            return res.json;
        }
        return null;
    });
}

export async function getAccountProjects() {    
    return await request(`/api/projects/get-all`, "GET", null, true).then((res) => {        
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    });
}

export async function getProjectDetails(uid: string | undefined | null) {      
    if (undefined === uid || null === uid) return null;  
    return await request(`/api/project/${uid}`, "GET", null, true).then((res) => {        
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    });
}
 
export async function updateProjectStatus(values: ProjectStatusForm) {  
    return await request('/api/project/update-status', "POST", values, true).then((res) => {
        if (res.status === 200) {
            return res.json;
        }
        return null;
    });
}

export async function updateProjectSection(values: ProjectSectionForm) {  
    return await request('/api/project/update-section', "POST", values, true).then((res) => {
        if (res.status === 200) {
            return res.json;
        }
        return null;
    });
}

export async function updateProject(values: EditProjectForm) {
    return await request('/api/project/update', "POST", values, true).then((res) => {
        if (res.status === 200) {
            return res.json;
        }
        return null;
    });
}
