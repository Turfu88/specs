import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import { Layout } from "../../common/components/Layout";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { createSpec } from "../../common/api/spec";
import { Element, Project } from "../../common/types";
import { useQuery } from "react-query";
import { getProjectDetails } from "../../common/api/project";
import { useState } from "react";
import { StatusChooser } from "../../common/components/StatusChooser";
import { log } from "console";

export interface NewSpecForm {
    name: string,
    description: string,
    status: string,
    featureId: string,
    elements: number[],
    project: string
}

export function SpecCreate() {
    const navigate = useNavigate();
    const { isLoading, data } = useQuery('getProjectDetails', () => getProjectDetails(localStorage.getItem('project')));
    const project: Project = data || null;
    const [selectedElements, setSelectedElements] = useState<number[]>([]);

    const formFeature = useForm({
        initialValues: {
            name: '',
            description: '',
            status: '',
            featureId: localStorage.getItem('feature') || null,
            elements: [],
            project: localStorage.getItem('project')
        } as NewSpecForm,
        validate: {
            name: (value) => (value.length < 2 ? 'Nom de la spec incorrect (trop court)' : null),
            description: (value) => (value && value.length < 2 ? 'Spec peu détaillée' : null),
        },
    });

    function handlecCreateSpec(values: NewSpecForm) {
        console.log(values);
        // Ajouter les éléments associés
        createSpec({ ...values, elements: selectedElements });
    }

    function toggleElement(id: number) {
        if (selectedElements.includes(id)) {
            setSelectedElements(selectedElements.filter((element) => element !== id));
        } else {
            setSelectedElements([...selectedElements, id]);
        }
    }

    function dataTest() {
        formFeature.setFieldValue('name', 'Ajout d\'un bouton pour créer une nouvelle wishlist');
        formFeature.setFieldValue('description', "Pas de détail ajouté");
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
                    Nouvelle Spec
                </Typography>
                <Button onClick={dataTest}>Data test</Button>
                <form onSubmit={formFeature.onSubmit((values) => handlecCreateSpec(values))}>
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

                    <Box className="d-flex justify-content-center mw-75 m-auto my-4">
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
                            {project?.elements.map((element: Element, index: number) => (
                                <Box key={index}>
                                    <FormGroup>
                                        <FormControlLabel control={
                                            <Checkbox
                                                checked={selectedElements.includes(element.id)}
                                                onChange={() => toggleElement(element.id)}
                                                name={element.name}
                                            />
                                        } label={element.name} />
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
                            Créer
                        </Button>
                    </Box>
                </form>
            </Box>
        </Layout>
    );
}
