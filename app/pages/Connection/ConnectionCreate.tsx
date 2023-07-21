import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Layout } from '../../common/components/Layout';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { createConnection } from '../../common/api/connexion';

export interface NewConnectionForm {
    name: string,
    code: string,
    status: string,
    description: string,
    url: string,
    project: string
}

export function ConnectionCreate() {
    const navigate = useNavigate();

    const formConnection = useForm({
        initialValues: {
            name: '',
            code: '',
            status: '',
            description: '',
            url: '',
            project: localStorage.getItem('project')
        } as NewConnectionForm,
        validate: {
            name: (value) => (value.length < 2 ? 'Le nom de la connexion est trop court' : null),
            description: (value) => (value && value.length < 2 ? 'La description est incomplete' : null),
            url: (value) => (value && value.length < 2 ? 'Le lien fourni est incomplet' : null),
        },
    });

    function handleCreateConnection(values: NewConnectionForm) {
        createConnection(values);
        navigate(-1);
    }

    function dataTest() {
        formConnection.setFieldValue('name', 'product');
        formConnection.setFieldValue('description', "Récupération des produits");
        formConnection.setFieldValue('code', "100-PROD");
        formConnection.setFieldValue('url', "https://specforge.johan-clement.fr/api/product");
    }

    return (
        <Layout>
            <Box>
                <Box mt={2}>
                    <Button variant="outlined" onClick={() => navigate(-1)}>
                        Retour
                    </Button>
                </Box>
                <Typography component="h1" variant="h4" textAlign="center">
                    Ajouter une nouvelle connexion
                </Typography>
                <Button onClick={dataTest}>Data test</Button>
                <form onSubmit={formConnection.onSubmit((values) => handleCreateConnection(values))}>
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
