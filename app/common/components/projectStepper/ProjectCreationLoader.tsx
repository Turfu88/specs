import { Typography } from "@mui/material";

interface ProjectCreationLoaderProps {
    creationStatus: boolean
}

export function ProjectCreationLoader(props: ProjectCreationLoaderProps) {
    const { creationStatus } = props;

    if (!creationStatus) {
        return (
            <Typography component='p' variant="h5" textAlign="center" mt={20}>
                Création du projet
            </Typography>
        );
    }

    return (
        <>
            <Typography component='p' variant="h5" textAlign="center" mb={2}>
                Projet créé !
            </Typography>
        </>
    );
}
