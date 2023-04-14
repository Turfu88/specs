import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Layout } from "../../common/components/Layout";
import { useForm } from '@mantine/form';
import { createFeature } from "../../common/api/feature";

export interface NewFeatureForm {
    name: string,
    description: string,
    page: string | null,
    project: string
}

export function FeatureForm() {

    const formFeature = useForm({
        initialValues: {
            name: '',
            description: '',
            page: localStorage.getItem('page') || null,
            project: localStorage.getItem('project')
        } as NewFeatureForm,
        validate: {
            name: (value) => (value.length < 2 ? 'Nom de la fonctionnalité incorrect (trop court)' : null),
            description: (value) => (value.length < 2 ? 'Fonctionnalité peu détaillée' : null),
        },
    });

    function createAccount(values: NewFeatureForm) {
        console.log(values);      
        createFeature(values)
    }

    function dataTest() {
        formFeature.setFieldValue('name', 'Gestion d\'une wishlist');
        formFeature.setFieldValue('description', "Pas de description");
    }

    return (
        <Layout>
            <Box mt={4} mb={8}>
                <Typography component="h1" variant="h4" textAlign="center">
                    Nouvelle fonctionnalité
                </Typography>
                <Button onClick={dataTest}>Data test</Button>
                <form onSubmit={formFeature.onSubmit((values) => createAccount(values))}>
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
                    {/* <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <FormControl>
                            <FormLabel className="m-auto">
                                Page privée ou publique ?
                            </FormLabel>
                            <RadioGroup
                                row
                                name="isPrivate"
                                {...formFeature.getInputProps('isPrivate', { type: 'radio' })}
                            >
                                <FormControlLabel value={true} className="mx-4" control={<Radio />} label="Privée" />
                                <FormControlLabel value={false} className="mx-4" control={<Radio />} label="Publique" />
                            </RadioGroup>
                        </FormControl>
                    </Box> */}

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
