import { Box, Button, TextField, Typography } from "@mui/material";
import { Project } from "../../common/types";
import { useForm } from "@mantine/form";
import { updateProjectSection } from "../../common/api/project";

interface ProjectEditSectionProps {
    handleCloseDialog: () => void
    project: Project
}

export interface ProjectSectionForm {
    sectionChoices: string[],
    projectId: string | null
}

export function ProjectEditSection(props: ProjectEditSectionProps) {
    const { handleCloseDialog, project } = props;

    // Creation / update recette
    const formSectionChoices = useForm({
        initialValues: {
            sectionChoices: project.sectionChoices ? project.sectionChoices : [''],
            projectId: localStorage.getItem('project')
        },
    });

    function confirmSectionChoices(values: ProjectSectionForm) {
        updateProjectSection(values).then(res => {
            if (200 === res.code)  {
                handleCloseDialog();
            }
        });  // @TODO: Ajouter des notifs
    }

    function addLine() {
        formSectionChoices.setFieldValue('sectionChoices', [...formSectionChoices.getInputProps('sectionChoices').value, ''])
    }

    return (
        <>
            <Typography variant="h4" component="h2" textAlign="center">
                Gestion des sections
            </Typography>
            <Typography variant="subtitle1" component="p" textAlign="center">
                Si vous modifiez les sections, mettre à jour les sections présentent dans les fonctionnalités du projet (car ils conserveront les anciennes valeurs)
            </Typography>
            {!project.sectionChoices &&
                <Box>
                    <Typography component="p" variant="subtitle1" textAlign="center" mt={2}>
                        Aucunne section enregistrés
                    </Typography>
                </Box>
            }
            <Box mt={4} maxWidth="400px" className="m-auto">
                <form onSubmit={formSectionChoices.onSubmit((values) => confirmSectionChoices(values))}>
                    {formSectionChoices.getInputProps('sectionChoices').value.map((section: string, index: number) => (
                        <div key={index}>
                            {index === 0 &&
                                <Box display="flex" justifyContent="center" mt={2}>
                                    <Typography component="p" variant="subtitle1" textAlign="center">
                                        Lister ici toutes les sections possibles sur le projet
                                    </Typography>
                                </Box>
                            }
                            <Box display="flex" justifyContent="center" p={2}>
                                <TextField
                                    fullWidth
                                    {...formSectionChoices.getInputProps(`sectionChoices.${index}`)}
                                />
                            </Box>
                        </div>
                    ))}
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button variant="outlined" onClick={addLine}>
                            Ajouter
                        </Button>
                    </Box>
                    
                    <Box display="flex" justifyContent="center" mt={4}>
                        <Button
                            type='submit'
                            variant="contained"
                        >
                            Valider les changements
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    );
}
