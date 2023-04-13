export const steps = ['Informations', 'Choix des éléments', 'Choix des pages', 'Informations du projet'];

export interface DefaultElement {
    name: string,
    choosed: boolean
}

export interface DefaultPage {
    name: string,
    category: string,
    private: boolean,
    choosed: boolean
}

export interface DefaultCoreForm {
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