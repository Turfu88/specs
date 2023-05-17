export const steps = ['Informations', 'Choix des espaces', 'Choix des éléments', 'Choix des pages', 'Choix des status', 'Informations du projet'];

export interface DefaultArea {
    id: number,
    name: string,
    uid: string,
    isActive: boolean,
    choosed: boolean
}

export interface MotherProject {
    id: number,
    uid?: string,
    name: string,
    choosed: boolean
}

export interface DefaultElement {
    name: string,
    choosed: boolean
}

export interface DefaultStatus {
    name: string,
    color: string,
    choosed: boolean
}

export interface DefaultPage {
    name: string,
    category: string,
    private: boolean,
    choosed: boolean
}

export interface DefaultProjectForm {
    name: string,
    version: string,
    comment: string
}

export const defaultElements = [
    {
        name: 'Utilisateur',
        choosed: true
    },
    {
        name: 'Produit',
        choosed: true
    },
    {
        name: 'Panier',
        choosed: true
    },
];


export const defaultStatus = [
    {
        name: 'Dev en cours',
        color: 'pink',
        choosed: true
    },
    {
        name: 'En attente',
        color: 'white',
        choosed: true
    },
    {
        name: 'Terminé',
        color: 'aqua',
        choosed: true
    },
];

export const defaultPages = [
    {
        name: "Connection / login",
        category: "Sécurité",
        private: false,
        choosed: true
    },
    {
        name: "Page Accueil connecté",
        category: "Accueil",
        private: true,
        choosed: true
    },
    {
        name: "Profil utilisateur",
        category: "Paramètres",
        private: true,
        choosed: true
    },
];

export const defaultCoreForm = {
    name: "Coeur",
    version: "1.0",
    comment: ""
}
export const defaultProjectForm = {
    name: '',
    version: '',
    comment: ''
}