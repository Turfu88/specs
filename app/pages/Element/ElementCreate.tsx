import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Layout } from '../../common/components/Layout';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { createElement } from '../../common/api/element';

export interface NewElementForm {
    name: string,
    comment: string,
    project: string
}

export function ElementCreate() {
    const navigate = useNavigate();

    const formElement = useForm({
        initialValues: {
            name: '',
            comment: '',
            project: localStorage.getItem('project')
        } as NewElementForm,
        validate: {
            name: (value) => (value.length < 2 ? 'Le nom de l\'élément est trop court' : null),
        },
    });

    function handleCreateElement(values: NewElementForm) {
        createElement(values);
        navigate(-1);
    }

    function dataTest() {
        formElement.setFieldValue('name', 'Organisation');
        formElement.setFieldValue('comment', "Pas de commentaire");
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
                    Ajouter un nouvel élément
                </Typography>
                <Button onClick={dataTest}>Data test</Button>
                <form onSubmit={formElement.onSubmit((values) => handleCreateElement(values))}>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="name"
                            label="Nom de l'élément"
                            name="name"
                            variant="outlined"
                            fullWidth
                            {...formElement.getInputProps('name')}
                            error={formElement.errors.name ? true : false}
                            helperText={formElement.errors.name}
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
                            {...formElement.getInputProps('comment')}
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
