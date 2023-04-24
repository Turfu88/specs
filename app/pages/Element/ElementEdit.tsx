import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useForm } from '@mantine/form';
import { Element } from '../../common/types';
import { editConnection } from '../../common/api/connexion';
import { StatusChooser } from '../../common/components/StatusChooser';
import { editElement } from '../../common/api/element';

export interface EditElementForm {
    name: string,
    comment: string,
}

interface ElementEditProps {
    element: Element,
    handleCloseDialog: () => void
}

export function ElementEdit(props: ElementEditProps) {
    const {element, handleCloseDialog} = props;

    const formElement = useForm({
        initialValues: {
            name: element.name ? element.name : '',
            comment: element.comment ? element.comment : '',
        } as EditElementForm,
        validate: {
            name: (value) => (value.length < 2 ? 'Le nom de la connexion est trop court' : null),
            comment: (value) => (value && value.length < 2 ? 'La description est incomplete' : null),
        },
    });

    function handleEditElement(values: EditElementForm) {
        console.log(values);
        editElement(element.id, values);
        handleCloseDialog();
    }

    function dataTest() {
        formElement.setFieldValue('name', 'product');
        formElement.setFieldValue('comment', "Récupération des produits");
    }

    return (
        <Box>
            <Typography component="h1" variant="h4" textAlign="center">
                Modifier un élément
            </Typography>
            <Button onClick={dataTest}>Data test</Button>
            <form onSubmit={formElement.onSubmit((values) => handleEditElement(values))}>
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
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        minRows={4}
                        {...formElement.getInputProps('comment')}
                        error={formElement.errors.comment ? true : false}
                        helperText={formElement.errors.comment}
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
