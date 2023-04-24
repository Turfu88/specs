import { Box, Checkbox, Divider, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useForm } from '@mantine/form';
import { Connection, Element, Project } from '../../common/types';
import { editConnection } from '../../common/api/connexion';
import { StatusChooser } from '../../common/components/StatusChooser';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getProjectDetails } from '../../common/api/project';
import { useState } from 'react';

export interface EditConnectionForm {
    name: string,
    code: string,
    status: string,
    description: string,
    url: string,
    elements: number[],
}

interface ConnectionEditProps {
    connection: Connection,
    handleCloseDialog: () => void,
    setInvalidateQuery: (value: boolean) => void
}

export function ConnectionEdit(props: ConnectionEditProps) {
    const { connection, handleCloseDialog, setInvalidateQuery } = props;
    const { isLoading, data } = useQuery('getProjectDetails', () => getProjectDetails(localStorage.getItem('project')));
    const project: Project = data || null;
    const [selectedElements, setSelectedElements] = useState<number[]>(connection.elements.map((element) => element.id));

    const formConnection = useForm({
        initialValues: {
            name: connection.name,
            code: connection.code,
            status: connection.status,
            description: connection.description,
            url: connection.url,
            elements: [],
        } as EditConnectionForm,
        validate: {
            name: (value) => (value.length < 2 ? 'Le nom de la connexion est trop court' : null),
            description: (value) => (value && value.length < 2 ? 'La description est incomplete' : null),
            url: (value) => (value && value.length < 2 ? 'Le lien fourni est incomplet' : null),
        },
    });

    function handleEditConnection(values: EditConnectionForm) {
        editConnection(connection.id, { ...values, elements: selectedElements }).then(() => {            
            setInvalidateQuery(true);
            handleCloseDialog();
        });
    }

    function toggleElement(id: number) {
        if (selectedElements.includes(id)) {
            setSelectedElements(selectedElements.filter((element) => element !== id));
        } else {
            setSelectedElements([...selectedElements, id]);
        }
    }

    return (
        <Box mb={8}>
            <Typography component="h1" variant="h4" textAlign="center">
                Modifier une connexion
            </Typography>
            <form onSubmit={formConnection.onSubmit((values) => handleEditConnection(values))}>
                <Box>
                    <StatusChooser
                        currentStatus={formConnection.getInputProps('status').value}
                        handleChooseStatus={(value: string) => formConnection.setFieldValue('status', value)}
                    />
                </Box>
                <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                    <TextField
                        id="name"
                        label="Nom de la connexion"
                        name="name"
                        variant="outlined"
                        fullWidth
                        {...formConnection.getInputProps('name')}
                        error={formConnection.errors.name ? true : false}
                        helperText={formConnection.errors.name}
                    />
                </Box>
                <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                    <TextField
                        id="code"
                        label="Code utilisé (optionnel)"
                        name="name"
                        variant="outlined"
                        fullWidth
                        {...formConnection.getInputProps('code')}
                        error={formConnection.errors.code ? true : false}
                        helperText={formConnection.errors.code}
                    />
                </Box>
                <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                    <TextField
                        id="description"
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={4}
                        {...formConnection.getInputProps('description')}
                        error={formConnection.errors.description ? true : false}
                        helperText={formConnection.errors.description}
                    />
                </Box>
                <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                    <TextField
                        id="url"
                        label="Url (optionnel)"
                        name="url"
                        variant="outlined"
                        fullWidth
                        {...formConnection.getInputProps('url')}
                        error={formConnection.errors.url ? true : false}
                        helperText={formConnection.errors.url}
                    />
                </Box>
                <Divider></Divider>
                {isLoading || project?.elements.length === 0 ?
                    <Typography component="p" variant="body1" textAlign="center">
                        Pas d'élément enregistré
                    </Typography>
                    :
                    <Box mt={2}>
                        <Typography component="h3" variant="h4" textAlign="center">
                            Lier des éléments
                        </Typography>
                        {project.elements.map((element: Element, index: number) => (
                            <Box key={index}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedElements.includes(element.id)}
                                                onChange={() => toggleElement(element.id)}
                                                name={element.name}
                                            />
                                        }
                                        label={element.name}
                                    />
                                </FormGroup>
                            </Box>
                        ))}
                    </Box>
                }
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
