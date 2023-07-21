import { Box, Button, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { Layout } from "../../common/components/Layout";
import { useForm } from '@mantine/form';
import { createFeature } from "../../common/api/feature";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-query";
import { Feature, Project } from "../../common/types";
import { getProjectDetails } from "../../common/api/project";
import { StatusChooser } from "../../common/components/StatusChooser";
import { FeatureSearch } from "./FeatureSearch";

export interface NewFeatureForm {
    name: string,
    description: string,
    section: string,
    status: string,
    page: string | null,
    project: string
}

export function FeatureCreate() {
    const navigate = useNavigate();
    const { isLoading, data } = useQuery('getProjectDetails', () => getProjectDetails(localStorage.getItem('project')));
    const project: Project = data || null;

    const handleChange = (event: SelectChangeEvent) => {
        formFeature.setFieldValue('section', event.target.value);
    };

    const formFeature = useForm({
        initialValues: {
            name: '',
            description: '',
            section: '',
            status: '',
            page: localStorage.getItem('page') || null,
            project: localStorage.getItem('project')
        } as NewFeatureForm,
        validate: {
            name: (value) => (value.length < 2 ? 'Nom de la fonctionnalité incorrect (trop court)' : null),
            description: (value) => (value.length < 2 ? 'Fonctionnalité peu détaillée' : null),
        },
    });

    function handleCreateFeature(values: NewFeatureForm) {
        createFeature(values);
        navigate(-1);
    }

    function handleImportData(values: Feature) {
        formFeature.setFieldValue('name', values.name ? values.name : '');
        formFeature.setFieldValue('description', values.description ? values.description : '');
        // @TODO: vérifier si section appartient aux sections de ce projet, sinon afficher une notification
        // indiquant que la manip n'est pas possible
        formFeature.setFieldValue('section', values.section ? values.section : '');
    }

    function dataTest() {
        formFeature.setFieldValue('name', 'Gestion d\'une wishlist');
        formFeature.setFieldValue('description', "Pas de description");
    }

    return (
        <Layout>
            <Box mt={4} mb={8}>
                <Box mt={2}>
                    <Button variant="outlined" onClick={() => navigate(-1)}>
                        Retour
                    </Button>
                </Box>
                <Typography component="h1" variant="h4" textAlign="center">
                    Nouvelle fonctionnalité
                </Typography>
                <Button onClick={dataTest}>Data test</Button>
                <form onSubmit={formFeature.onSubmit((values) => handleCreateFeature(values))}>
                    <Box>
                        <StatusChooser
                            currentStatus={formFeature.getInputProps('status').value}
                            handleChooseStatus={(value: string) => formFeature.setFieldValue('status', value)}
                        />
                    </Box>
                    <FeatureSearch importData={handleImportData} />
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
                            id="description"
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
                                <InputLabel id="section-label">Section</InputLabel>
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
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <Button
                            type="submit"
                            variant="outlined"
                            size='large'
                        >
                            Créer
                        </Button>
                    </Box>
                </form>
            </Box>
        </Layout>
    );
}
