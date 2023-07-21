import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, TextField, Typography } from "@mui/material";
import { useForm } from "@mantine/form";
import { createSpec, editSpec } from "../../common/api/spec";
import { Element, Project, Spec } from "../../common/types";
import { useQuery } from "react-query";
import { getProjectDetails } from "../../common/api/project";
import { useState } from "react";
import { StatusChooser } from "../../common/components/StatusChooser";

export interface EditSpecForm {
    name: string,
    description: string,
    status: string,
    elements: number[],
}

interface SpecEditProps {
    spec: Spec,
    handleCloseDialog: () => void,
    setInvalidateQuery: (value: boolean) => void
}

export function SpecEdit(props: SpecEditProps) {
    const { spec, handleCloseDialog, setInvalidateQuery } = props;
    const { isLoading, data } = useQuery('getProjectDetails', () => getProjectDetails(localStorage.getItem('project')));
    const project: Project = data || null;
    const [selectedElements, setSelectedElements] = useState<number[]>(spec.elements.map((element) => element.id));

    const formSpec = useForm({
        initialValues: {
            name: spec.name ? spec.name : '',
            description: spec.description ? spec.description : '',
            status: spec.status ? spec.status : '',
            elements: [],
        } as EditSpecForm,
        validate: {
            name: (value) => (value.length < 2 ? 'Nom de la spec incorrect (trop court)' : null),
            description: (value) => (value && value.length < 2 ? 'Spec peu détaillée' : null),
        },
    });

    function handlecEditSpec(values: EditSpecForm) {
        // Ajouter les éléments associés
        editSpec(spec.id, { ...values, elements: selectedElements }).then(() => {
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
        <Box mt={4} mb={8}>
            <Typography component="h1" variant="h4" textAlign="center">
                Modifier une Spec
            </Typography>
            <form onSubmit={formSpec.onSubmit((values) => handlecEditSpec(values))}>
                <Box>
                    <StatusChooser
                        currentStatus={formSpec.getInputProps('status').value}
                        handleChooseStatus={(value: string) => formSpec.setFieldValue('status', value)}
                    />
                </Box>
                <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                    <TextField
                        id="name"
                        label="Nom de la fonctionnalité"
                        variant="outlined"
                        fullWidth
                        {...formSpec.getInputProps('name')}
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
                        {...formSpec.getInputProps('description')}
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
