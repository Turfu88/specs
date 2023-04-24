
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
    sectionChoices: string[],
    elements: Element[],
    connections: Connection[],
    features: Feature[],
    pages: Page[]
}

export interface Element {
    id: number,
    uid: string,
    name: string,
    comment: string,
    projectUid: string,
    projectName: string
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
