import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useForm } from '@mantine/form';
import { Project } from "../../common/types";
import { updateProject } from "../../common/api/project";
import { useState } from "react";
import { StatusChooser } from "../../common/components/StatusChooser";

export interface EditProjectForm {
    name: string,
    comment: string,
    version: string,
    previousVersion: string,
    status: string,
    projectId: string
}

interface ProjectEditProps {
    handleCloseDialog: () => void
    project: Project
}

export function ProjectEdit(props: ProjectEditProps) {
    const { project, handleCloseDialog } = props;
    const [selectedElements, setSelectedElements] = useState<number[]>([]);

    const formPage = useForm({
        initialValues: {
            name: project.name,
            version: project.version ? project.version : '',
            previousVersion: project.previousVersion ? project.previousVersion : '',
            status: project.status ? project.status : '',
            comment: project.comment ? project.comment : '',
            projectId: project.id ? project.id : ''
            // devAccess: project.devAccess,
        } as EditProjectForm,
        validate: {
            name: (value) => (value.length < 2 ? 'Nom de page incorrect (trop court)' : null),
            comment: (value) => (value && value.length < 2 ? 'Commentaire incorrect (trop court)' : null),
        },
    });

    function handleUpdateProject(values: EditProjectForm) {
        console.log(values);
        updateProject(values);
        handleCloseDialog();
    }


    return (
        <Box mt={4} mb={8}>
            <Typography component="h1" variant="h4" textAlign="center">
                Modifier les informations du projet
            </Typography>
            <form onSubmit={formPage.onSubmit((values) => handleUpdateProject(values))}>
                <Box>
                    <StatusChooser
                        currentStatus={formPage.getInputProps('status').value}
                        handleChooseStatus={(value: string) => formPage.setFieldValue('status', value)}
                    />
                </Box>
                <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                    <TextField
                        id="name"
                        label="Nom du projet"
                        variant="outlined"
                        fullWidth
                        {...formPage.getInputProps('name')}
                    />
                </Box>
                <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                    <TextField
                        id="version"
                        label="Version"
                        variant="outlined"
                        fullWidth
                        {...formPage.getInputProps('version')}
                    />
                </Box>
                <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                    <TextField
                        id="previousVersion"
                        label="Version précédente"
                        variant="outlined"
                        fullWidth
                        {...formPage.getInputProps('previousVersion')}
                    />
                </Box>
                <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                    <TextField
                        id="comment"
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={4}
                        {...formPage.getInputProps('comment')}
                    />
                </Box>
                <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                    <Button
                        type="submit"
                        variant="contained"
                        size='large'
                    >
                        Modifier
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
