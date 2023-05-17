import { Connection, Spec } from "../../types"

export interface ElementSelect {
    id: number,
    uid: string,
    name: string,
    comment: string,
    choosed: boolean
}

export interface ConnectionSelect {
    id: number,
    uid: string,
    name: string,
    status: string,
    code: string,
    description: string,
    url: string,
    elements: Element[],
    choosed: boolean
}

export interface StatusSelect {
    label: string,
    color: string,
    choosed: boolean
}

export interface PageSelect {
    id: number,
    uid: string,
    name: string,
    status: string,
    comment: string,
    createdAt: string,
    updatedAt: string,
    finishedAt: string,
    category: string,
    isPrivate: boolean,
    isModelOk: boolean,
    modelUrl: string,
    choosed: boolean
}

export interface FeatureSelect {
    id: number,
    uid: string,
    name: string,
    description: string,
    section: string | null,
    status: string,
    specs: Spec[],
    connections: Connection[],
    hasPage: boolean,
    choosed: boolean
}