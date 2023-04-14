
export interface Project {
    id: number,
    uid: string,
    name: string,
    version: string,
    previousVersion: string | null,
    createdAt: string,
    updatedAt: string,
    finishedAt: string,
    status: string,
    comment: string,
    isCore: boolean,
    devAccess: string,
    statusChoices: string[],
    statusColors: string[],
    section: string[],
    pages: Page[]
}

export interface Page {
    id: number,
    uid: string,
    name: string,
    status: string,
    comment: string,
    createdAt: string,
    updatedAt: string,
    finishedAt: string,
    isFromCore: boolean,
    category: string,
    isPrivate: boolean,
    isModelOk: boolean,
    modelUrl: string
}