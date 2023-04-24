import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { useForm } from '@mantine/form';
import { editFeature } from "../../common/api/feature";
import { useState } from "react";
import { useQuery } from "react-query";
import { Connection, Feature, Project } from "../../common/types";
import { getProjectDetails } from "../../common/api/project";
import { StatusChooser } from "../../common/components/StatusChooser";

export interface EditFeatureForm {
    name: string,
    description: string,
    section: string,
    status: string | null,
    connections: number[],
}

interface FeatureEditProps {
    feature: Feature,
    handleCloseDialog: () => void
}


export function FeatureEdit(props: FeatureEditProps) {
    const { feature, handleCloseDialog } = props;
    const { isLoading, data } = useQuery('getProjectDetails', () => getProjectDetails(localStorage.getItem('project')));
    const project: Project = data || null;
    const [selectedConnections, setSelectedConnections] = useState<number[]>(feature.connections.map((connection) => connection.id));

    const handleChange = (event: SelectChangeEvent) => {
        formFeature.setFieldValue('section', event.target.value);
    };

    const formFeature = useForm({
        initialValues: {
            name: feature.name ? feature.name : '',
            description: feature.description ? feature.description : '',
            status: feature.status ? feature.status : '',
            section: feature.section ? feature.section : '',
            connections: [],
        } as EditFeatureForm,
        validate: {
            name: (value) => (value.length < 2 ? 'Nom de la fonctionnalité incorrect (trop court)' : null),
            description: (value) => (value.length < 2 ? 'Fonctionnalité peu détaillée' : null),
        },
    });

    function handleCreateFeature(values: EditFeatureForm) {
        console.log(values);
        editFeature(feature.id, {...values, connections: selectedConnections});
        handleCloseDialog();
    }

    function toggleConnection(id: number) {
        if (selectedConnections.includes(id)) {
            setSelectedConnections(selectedConnections.filter((connection) => connection !== id));
        } else {
            setSelectedConnections([...selectedConnections, id]);
        }
    }

    return (
        <Box mt={4} mb={8}>

            <Typography component="h1" variant="h4" textAlign="center">
                Modifier une fonctionnalité
            </Typography>
            <form onSubmit={formFeature.onSubmit((values) => handleCreateFeature(values))}>
                <Box>
                    <StatusChooser
                        currentStatus={formFeature.getInputProps('status').value}
                        handleChooseStatus={(value: string) => formFeature.setFieldValue('status', value)}
                    />
                </Box>
                <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                    <TextField
                        id="name"
                        label="Nom de la fonctionnalité"
                        variant="outlined"
                        fullWidth
                        {...formFeature.getInputProps('name')}
                    />
                </Box>
                <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                    <TextField
                        id="name"
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={4}
                        {...formFeature.getInputProps('description')}
                    />
                </Box>
                {project &&
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <FormControl fullWidth>
                            <InputLabel id="section-label">Catégorie</InputLabel>
                            <Select
                                labelId="section-label"
                                id="section"
                                value={formFeature.getInputProps('section').value}
                                label="Catégorie"
                                onChange={handleChange}
                            >
                                {project.sectionChoices.map((section: string, index: number) => (
                                    <MenuItem key={index} value={section}>{section}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                }
                <Divider></Divider>
                {isLoading || project?.connections.length === 0 ?
                    <Typography component="p" variant="body1" textAlign="center">
                        Pas de connexion enregistré
                    </Typography>
                    :
                    <Box mt={2}>
                        <Typography component="h3" variant="h4" textAlign="center">
                            Lier des connections
                        </Typography>
                        {project.connections.map((connection: Connection, index: number) => (
                            <Box key={index}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={selectedConnections.includes(connection.id)}
                                                onChange={() => toggleConnection(connection.id)}
                                                name={connection.name}
                                            />
                                        }
                                        label={connection.name}
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
