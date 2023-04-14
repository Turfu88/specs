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
    })
}

export async function getAccountProjects() {    
    return await request(`/api/projects/get-all`, "GET", null, true).then((res) => {        
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    });
}

export async function getProjectDetails(uid: string | undefined) {  
    if (uid === undefined) return null;  
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
    })
}

// @TODO: typer les params d'entrée
// @TODO: modifier les fonctions pour les adapter à l'entité Project
export async function getOnePublicRecipe(id: number) {
    return await request(`/api/recipe/${id}`, "GET", null).then((res) => {
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    });
}

export async function getOneRecipe(id: number) {
    return await request(`/api/recipe/${id}`, "GET", null, true).then((res) => {
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    });
}



export async function getUserRecipes(page: number) {
    const url = `/api/recipes/user?page=${page ? page : '1'}`;
    return await request(url, "GET", null, true).then((res) => {
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    })
}

export async function getOtherUsersRecipes(page: number, lastRecipes: boolean) {
    let url;
    if (lastRecipes) {
        url = '/api/recipes/other-users?lastRecipes=true';
    } else {
        url = `/api/recipes/other-users?page=${page ? page : '1'}`;
    }
    return await request(url, "GET", null, true).then((res) => {
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    })
}

export async function createRecipe(params: any) {
    return await request('/api/recipe/create', "POST", params, true).then((res) => {
        if (res.status === 200) {
            return res.json.idRecipe;
        }
        return null;
    })
}

export async function createRecipeFromExternal(params: any) {
    return await request('/api/recipe/import', "POST", params, true).then((res) => {
        if (res.status === 200) {
            return res.json.idRecipe;
        }
        return null;
    })
}

export async function addRecipeToCookbook(params: any) {
    return await request('/api/recipe/add-to-cookbook', "POST", params, true).then((res) => {
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    })
}

export async function removeImageFromRecipe(id: number) {
    return await request(`/api/recipe/${id}/remove-image`, "POST", null, true).then((res) => {
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    })
}

export async function updateRecipe(id: number, params: any) {
    return await request(`/api/recipe/update/${id}`, "PATCH", params, true).then((res) => {
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    })
}

export async function deleteRecipe(id: number) {
    return await request(`/api/recipe/delete/${id}`, "POST", null, true).then((res) => {
        if (res.status === 200) {
            return res.json.content;
        }
        return null;
    })
}
