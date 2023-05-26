import { Box, Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Layout } from "../../common/components/Layout";
import { useForm } from '@mantine/form';
import { createPage } from "../../common/api/page";
import { StatusChooser } from "../../common/components/StatusChooser";
import { useNavigate } from "react-router-dom";
import { PageSearch } from "./PageSearch";
import { Page } from "../../common/types";

export interface NewPageForm {
    name: string,
    modelUrl: string,
    status: string,
    comment: string,
    category: string,
    isModelOk: boolean | null,
    isPrivate: boolean | null,
    project: string
}

export function PageCreate() {
    const navigate = useNavigate();

    const formPage = useForm({
        initialValues: {
            name: '',
            status: '',
            comment: '',
            category: '',
            modelUrl: '',
            isModelOk: null,
            isPrivate: null,
            project: localStorage.getItem('project')
        } as NewPageForm,
        validate: {
            name: (value) => (value.length < 2 ? 'Nom de page incorrect (trop court)' : null),
            modelUrl: (value) => (value.length < 2 ? 'Model incorrect (trop court), doit correspondre à une URL' : null),
            category: (value) => (value.length < 2 ? 'Categorie incorrecte (trop court)' : null),
            isModelOk: (value) => (null === value ? 'Indiquer si le modèle a été validé' : null),
            isPrivate: (value) => (null === value ? 'Indiquer si la page est publique ou privée' : null),
        },
    });

    function createAccount(values: NewPageForm) {
        createPage(values)
    }

    function handleImportData(values: Page) {
        formPage.setFieldValue('name', values.name ? values.name : '');
        formPage.setFieldValue('modelUrl', values.modelUrl ? values.modelUrl : '');
        formPage.setFieldValue('comment', values.comment ? values.comment : '');
        formPage.setFieldValue('category', values.category ? values.category : '');
        if (null !== values.isPrivate) formPage.setFieldValue('isPrivate', values.isPrivate);
    }

    function dataTest() {
        formPage.setFieldValue('name', 'Panier récapitulatif');
        formPage.setFieldValue('modelUrl', 'https://www.google.fr');
        formPage.setFieldValue('comment', "Pas de commentaire");
        formPage.setFieldValue('category', "Panier");
        formPage.setFieldValue('isModelOk', true);
        formPage.setFieldValue('isPrivate', true);
    }

    return (
        <Layout>
            <Box mt={4} mb={8}>
                <Box mt={2}>
                    <Button variant="outlined" onClick={() => navigate(-1)}>
                        Retour
                    </Button>
                </Box>
                <Typography component="h1" variant="h3" textAlign="center">
                    Nouvelle page
                </Typography>
                <Button onClick={dataTest}>Data test</Button>
                <form onSubmit={formPage.onSubmit((values) => createAccount(values))}>
                    <Box>
                        <StatusChooser
                            currentStatus={formPage.getInputProps('status').value}
                            handleChooseStatus={(value: string) => formPage.setFieldValue('status', value)}
                        />
                    </Box>
                    <PageSearch importData={handleImportData} />
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="name"
                            label="Nom de la page"
                            variant="outlined"
                            fullWidth
                            {...formPage.getInputProps('name')}
                            error={formPage.errors.name ? true : false}
                            helperText={formPage.errors.name}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="name"
                            label="Categorie"
                            variant="outlined"
                            fullWidth
                            {...formPage.getInputProps('category')}
                            error={formPage.errors.category ? true : false}
                            helperText={formPage.errors.category}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="comment"
                            label="Commentaire"
                            variant="outlined"
                            fullWidth
                            multiline
                            minRows={4}
                            {...formPage.getInputProps('comment')}
                            error={formPage.errors.comment ? true : false}
                            helperText={formPage.errors.comment}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="modelUrl"
                            label="Modèle/Maquette de la page (lien url)"
                            variant="outlined"
                            fullWidth
                            {...formPage.getInputProps('modelUrl')}
                            error={formPage.errors.modelUrl ? true : false}
                            helperText={formPage.errors.modelUrl}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <FormControl>
                            <FormLabel className="m-auto">
                                Modèle/Maquette validé ?
                            </FormLabel>
                            <RadioGroup
                                row
                                name="isModelOk"
                                {...formPage.getInputProps('isModelOk', { type: 'radio' })}
                            >
                                <FormControlLabel value={true} className="mx-4" control={<Radio />} label="Oui" />
                                <FormControlLabel value={false} className="mx-4" control={<Radio />} label="Non" />
                            </RadioGroup>
                            <FormHelperText>{formPage.errors.isModelOk}</FormHelperText>
                        </FormControl>
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <FormControl>
                            <FormLabel className="m-auto">
                                Page privée ou publique ?
                            </FormLabel>
                            <RadioGroup
                                row
                                name="isPrivate"
                                {...formPage.getInputProps('isPrivate', { type: 'radio' })}
                            >
                                <FormControlLabel value={true} className="mx-4" control={<Radio />} label="Privée" />
                                <FormControlLabel value={false} className="mx-4" control={<Radio />} label="Publique" />
                            </RadioGroup>
                            <FormHelperText>{formPage.errors.isPrivate}</FormHelperText>
                        </FormControl>
                    </Box>

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
