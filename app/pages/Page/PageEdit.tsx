import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useForm } from '@mantine/form';
import { Page } from '../../common/types';
import { StatusChooser } from '../../common/components/StatusChooser';
import { editPage } from '../../common/api/page';
import { useState } from 'react';

export interface EditPageForm {
    name: string,
    status: string,
    comment: string,
    category: string,
    isPrivate: boolean,
    isModelOk: boolean,
    modelUrl: string
}

interface PageEditProps {
    page: Page,
    handleCloseDialog: () => void,
    setInvalidateQuery: (value: boolean) => void
}

export function PageEdit(props: PageEditProps) {
    const { page, handleCloseDialog, setInvalidateQuery } = props;
    const [isModelOk, setIsModelOk] = useState<boolean>(page.isModelOk);
    const [isPrivate, setIsPrivate] = useState<boolean>(page.isPrivate);
    
    const formPage = useForm({
        initialValues: {
            name: page.name ? page.name : '',
            status: page.status ? page.status : '',
            comment: page.comment ? page.comment : '',
            category: page.category ? page.category : '',
            isPrivate: page.isPrivate,
            isModelOk: page.isModelOk,
            modelUrl: page.modelUrl ? page.modelUrl : ''
        } as EditPageForm,
        validate: {
            name: (value) => (value.length < 2 ? 'Le nom de la page est trop court' : null),
            comment: (value) => (value && value.length < 2 ? 'La description est incomplète' : null),
            modelUrl: (value) => (value && value.length < 2 ? 'Le lien fourni est incomplet' : null),
        },
    });

    function handleEditPage(values: any) {
        values = {...values, isModelOk, isPrivate}        
        editPage(page.id, values).then(() => {
            setInvalidateQuery(true);
            handleCloseDialog();
        });
    }

    function dataTest() {
        formPage.setFieldValue('name', 'Utilisateur info');
        formPage.setFieldValue('comment', "L'utilisateur peut voir et modifier les informations de son compte");
        formPage.setFieldValue('modelUrl', "https://specforge.johan-clement.fr/api/product");
        formPage.setFieldValue('isModelOk', true);
        formPage.setFieldValue('isPrivate', false);
    }

    return (
        <Box mb={8}>
            <Typography component="h1" variant="h4" textAlign="center">
                Modifier la page
            </Typography>
            <Button onClick={dataTest}>Data test</Button>
            <form onSubmit={formPage.onSubmit((values) => handleEditPage(values))}>
                <Box>
                    <StatusChooser
                        currentStatus={formPage.getInputProps('status').value}
                        handleChooseStatus={(value: string) => formPage.setFieldValue('status', value)}
                    />
                </Box>
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
                            value={isModelOk}
                            // {...formPage.getInputProps('isModelOk', { type: 'radio' })}
                            onChange={() => setIsModelOk(!isModelOk)}
                        >
                            <FormControlLabel value={true} className="mx-4" control={<Radio />} label="Oui" />
                            <FormControlLabel value={false} className="mx-4" control={<Radio />} label="Non" />
                        </RadioGroup>
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
                            value={isPrivate}
                            onChange={() => setIsPrivate(!isPrivate)}
                            // {...formPage.getInputProps('isPrivate', { type: 'radio' })}
                        >
                            <FormControlLabel value={true} className="mx-4" control={<Radio />} label="Privée" />
                            <FormControlLabel value={false} className="mx-4" control={<Radio />} label="Publique" />
                        </RadioGroup>
                    </FormControl>
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
