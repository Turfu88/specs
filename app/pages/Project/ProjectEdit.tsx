import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useForm } from '@mantine/form';
import { Project } from "../../common/types";
import { updateProject } from "../../common/api/project";
import { StatusChooser } from "../../common/components/StatusChooser";

export interface EditProjectForm {
    name: string,
    comment: string,
    version: string,
    previousVersion: string,
    status: string,
    validators: string,
    projectId: string
}

interface ProjectEditProps {
    handleCloseDialog: () => void
    project: Project,
    setInvalidateQuery: (value: boolean) => void
}

export function ProjectEdit(props: ProjectEditProps) {
    const { project, handleCloseDialog, setInvalidateQuery } = props;

    const formPage = useForm({
        initialValues: {
            name: project.name,
            version: project.version ? project.version : '',
            previousVersion: project.previousVersion ? project.previousVersion : '',
            status: project.status ? project.status : '',
            validators: project.validators ? project.validators : '',
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
        updateProject(values).then(() => {
            setInvalidateQuery(true);
            handleCloseDialog();
        });
    }

    function handleChangeValidators(e: SelectChangeEvent) {
        formPage.setFieldValue('validators', e.target.value);
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
                    <FormControl fullWidth>
                        <InputLabel>Validateurs</InputLabel>
                        <Select
                            labelId="validator-label"
                            id="validators"
                            label="Validateurs"
                            {...formPage.getInputProps('validators')}
                            onChange={handleChangeValidators}
                        >
                            <MenuItem value={1}>Un</MenuItem>
                            <MenuItem value={2}>Deux</MenuItem>
                            <MenuItem value={3}>Trois</MenuItem>
                        </Select>
                    </FormControl>
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
