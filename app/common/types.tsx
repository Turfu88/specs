export interface Area {
    id: number,
    name: string,
    uid: string,
    isActive: boolean,
    projects: Project[]
}

export interface User {
    id: string,
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    company: string,
}

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
    validators: number,
    validations: ProjectValidation[],
    isCore: boolean,
    devAccess: string,
    statusChoices: string[],
    statusColors: string[],
    sectionChoices: string[],
    elements: Element[],
    connections: Connection[],
    features: Feature[],
    pages: Page[],
    specs: Spec[]
}

export interface ProjectValidation {
    id: number,
    type: string,
    user: string,
    pageId: string | null,
    featureId: string | null,
    specId: string | null,
    connectionId: string | null,
    created: Date
}

export interface Validation {
    id: number,
    type: string,
    user: User,
    project: Project,
    userId: number | null,
    page?: Page,
    feature?: Feature,
    spec?: Spec,
    connection?: Connection
    created: string
}

export interface Element {
    id: number,
    uid: string,
    name: string,
    comment: string,
    projectUid: string,
    projectName: string
    connections: {
        id: number,
        name: string
    }[],
    specs: {
        id: number,
        name: string
    }[],
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
    modelUrl: string,
    validations: Validation[],
    validators: number | null
}

export interface Connection {
    id: number,
    uid: string,
    name: string,
    status: string,
    code: string,
    description: string,
    isFromCore: boolean,
    url: string,
    elements: Element[]
}

export interface Feature {
    id: number,
    uid: string,
    name: string,
    description: string,
    section: string | null,
    status: string,
    specs: Spec[],
    connections: Connection[],
    hasPage: boolean
}

export interface Spec {
    id: number,
    uid: string,
    name: string,
    status: string | null,
    description: string,
    elements: Element[]
}

export interface Feedback {
    id: number,
    uid: string,
    content: string,
    status: string | null,
    toTreat: boolean,
    username: string,
    createdAt: Date,
    updatedAt: Date,
    userId: number
}

interface Date {
    date: string,
    timezone: string,
    timezone_type: number 
}

export type FeedbackType = 'connection' | 'feature' | 'spec' | 'page' | 'summary';
