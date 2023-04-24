import { Box, Button, TextField, Typography } from "@mui/material";
import { Project } from "../../common/types";
import { useForm } from "@mantine/form";
import { updateProjectStatus } from "../../common/api/project";

interface ProjectEditStatusProps {
    handleCloseDialog: () => void
    project: Project
}

export interface ProjectStatusForm {
    statusChoices: string[],
    statusColors: string[],
    projectId: string | null
}

export function ProjectEditStatus(props: ProjectEditStatusProps) {
    const { handleCloseDialog, project } = props;

    // Creation / update recette
    const formStatusChoices = useForm({
        initialValues: {
            statusChoices: project.statusChoices ? project.statusChoices : [''],
            statusColors: project.statusColors ? project.statusColors : [''],
            projectId: localStorage.getItem('project')
        },
    });

    function confirmStatusChoices(values: ProjectStatusForm) {
        updateProjectStatus(values).then(res => {
            if (200 === res.code)  {
                handleCloseDialog();
            }
        });  // @TODO: Ajouter des notifs
    }

    function addLine() {
        formStatusChoices.setFieldValue('statusChoices', [...formStatusChoices.getInputProps('statusChoices').value, ''])
        formStatusChoices.setFieldValue('statusColors', [...formStatusChoices.getInputProps('statusColors').value, ''])
    }

    // console.log(formStatusChoices.getInputProps('statusChoices').value);
    // console.log(formStatusChoices.getInputProps('statusColors').value);
    // ['Dev en cours', 'En attente', 'Terminé']
    // ['#e1bee7', '', '#dcedc8']

    return (
        <>
            <Typography variant="h4" component="h2" textAlign="center">
                Gestion des status
            </Typography>
            <Typography variant="subtitle1" component="p" textAlign="center">
                Si vous modifiez les status, mettre à jour les status de tous les éléments (car ils conservent l'ancien status)
            </Typography>
            {project.statusChoices.length === 0 &&
                <Box>
                    <Typography component="p" variant="subtitle1" textAlign="center" mt={2}>
                        Aucun status enregistré
                    </Typography>
                </Box>
            }
            <Box mt={4}>
                <form onSubmit={formStatusChoices.onSubmit((values) => confirmStatusChoices(values))}>
                    <Box>
                        {formStatusChoices.getInputProps('statusChoices').value.map((status: string, index: number) => (
                            <div key={index}>
                                {index === 0 &&
                                    <Box className="row">
                                        <Typography component="p" variant="subtitle1" className="col col-4" textAlign="center">
                                            Status
                                        </Typography>
                                        <Typography component="p" variant="subtitle1" className="col col-4" textAlign="center">
                                            Couleur
                                        </Typography>
                                        <Typography component="p" variant="subtitle1" className="col col-4" textAlign="center">
                                            Résultat
                                        </Typography>
                                    </Box>
                                }
                                <Box className="row">
                                    <Box className="col col-4 p-2">
                                        <TextField
                                            fullWidth
                                            {...formStatusChoices.getInputProps(`statusChoices.${index}`)}
                                        />
                                    </Box>
                                    <Box className="col col-4 p-2">
                                        <TextField
                                            fullWidth
                                            className="col col-4"
                                            {...formStatusChoices.getInputProps(`statusColors.${index}`)}
                                        />
                                    </Box>
                                    <Box className="col col-4 p-2" display="flex" alignItems="center">
                                        <Box
                                            className="text-center border rounded" width="100%" height="100%"
                                            style={{ backgroundColor: `${formStatusChoices.getInputProps(`statusColors.${index}`).value}` }}
                                        >
                                            <Typography alignItems="center" variant="body1" pt="14px">
                                                {formStatusChoices.getInputProps(`statusChoices.${index}`).value}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                {/* {index !== 0 ?
                                    <Button variant="outlined" onClick={() => removeLine(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M18 6l-12 12"></path>
                                            <path d="M6 6l12 12"></path>
                                        </svg>
                                    </Button>
                                    :
                                    <Box width={50}></Box>
                                } */}
                            </div>
                        ))}
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Button variant="outlined" onClick={addLine}>
                                Ajouter
                            </Button>
                        </Box>
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
