import { Box, Typography } from "@mui/material";
import { DefaultArea, DefaultProjectForm } from "../../../pages/ProjectCore/defaultValues";
import { ConnectionSelect, ElementSelect, FeatureSelect, PageSelect } from "./types";

interface ProjectRecapProps {
    formProject: DefaultProjectForm,
    areas: DefaultArea[],
    featuresChoosed: FeatureSelect[],
    pagesChoosed: PageSelect[],
    elementsChoosed: ElementSelect[],
    connectionsChoosed: ConnectionSelect[],
    statusChoosed: { label: string, color: string, choosed: boolean }[],
    motherProjectChoosed: number | undefined,
    handleChangeFormProject: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export function ProjectRecap(props: ProjectRecapProps) {
    const { formProject, areas, featuresChoosed, pagesChoosed, elementsChoosed, connectionsChoosed, statusChoosed, motherProjectChoosed } = props;
    const selectedArea = areas.filter((area) => area.choosed);

    return (
        <>
            <Typography component="h1" variant="h5" textAlign="center">
                Résumé
            </Typography>
            <Box mt={2}>
                <Box mt={2}>
                    <Typography component="p" variant="body1">Nom: {formProject.name}</Typography>
                    <Typography component="p" variant="body1">Version: {formProject.version}</Typography>
                    <Typography component="p" variant="body1">Note: {formProject.comment}</Typography>
                </Box>
                <Box mt={2}>
                    <Typography component="p" variant="body1">Espaces sélectionnés:</Typography>
                    <ul>
                        {selectedArea.map((area, index) => (
                            <li key={index}>
                                <Typography component="p" variant="body1">{area.name}</Typography>
                            </li>
                        ))}
                    </ul>
                </Box>
                <Box mt={2}>
                    {0 === motherProjectChoosed &&
                        <Typography component="p" variant="body1">Pas de projet mère. On part sur du "from scratch".</Typography>
                    }
                </Box>
                <Box mt={2}>
                    <Typography component="p" variant="body1">Pages sélectionnées:</Typography>
                    <ul>
                        {pagesChoosed.map((page, index) => (
                            <li key={index}>
                                <Typography component="p" variant="body1">{page.name}</Typography>
                            </li>
                        ))}
                    </ul>
                </Box>
                <Box mt={2}>
                    <Typography component="p" variant="body1">Fonctionnalités sélectionnées:</Typography>
                    <ul>
                        {featuresChoosed.map((feature, index) => (
                            <li key={index}>
                                <Typography component="p" variant="body1">{feature.name}</Typography>
                            </li>
                        ))}
                    </ul>
                </Box>
                <Box mt={2}>
                    <Typography component="p" variant="body1">Eléments sélectionnées:</Typography>
                    <ul>
                        {elementsChoosed.map((element, index) => (
                            <li key={index}>
                                <Typography component="p" variant="body1">{element.name}</Typography>
                            </li>
                        ))}
                    </ul>
                </Box>
                <Box mt={2}>
                    <Typography component="p" variant="body1">Connections sélectionnées:</Typography>
                    <ul>
                        {connectionsChoosed.map((connection, index) => (
                            <li key={index}>
                                <Typography component="p" variant="body1">{connection.name}</Typography>
                            </li>
                        ))}
                    </ul>
                </Box>
                <Box mt={2}>
                    <Typography component="p" variant="body1">Status sélectionnés:</Typography>
                    <ul>
                        {statusChoosed.map((status, index) => (
                            <li key={index}>
                                <Typography component="p" variant="body1">{status.label}</Typography>
                            </li>
                        ))}
                    </ul>
                </Box>
            </Box>
        </>
    );
}
