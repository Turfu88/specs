import { Box, Card, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Layout } from '../../common/components/Layout';
import { useForm } from '@mantine/form';
import { createAdmin } from '../../common/api/user';

interface UserForm {
    username: string,
    email: string,
    firstname: string,
    lastname: string,
    company: string,
    password: string
    accountName: string
}

export function CreateAccount() {

    const formUser = useForm({
        initialValues: {
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            company: '',
            accountName: '',
            password: '',
            confirmPassword: ''
        },
        validate: {
            username: (value) => (value.length < 2 ? 'Nom utilisateur incorrect (trop court)' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email non valide'),
            firstname: (value) => (value.length < 2 ? 'Prénom incorrect (trop court)' : null),
            lastname: (value) => (value.length < 2 ? 'Nom incorrect (trop court)' : null),
            company: (value) => (value.length < 2 ? 'Nom de l\'entreprise incorrect (trop court)' : null),
            accountName: (value) => (value.length < 2 ? 'Nom du compte incorrect (trop court)' : null),
            password: (value) => (value.length < 6 ? 'Mot de passe trop court (minimum 6 caractères)' : null),
            confirmPassword: (value, values) => value !== values.password ? 'Les mots de passe ne sont pas identiques' : null,
        },
    });

    function createAccount(values: UserForm) {
        console.log(values);
        createAdmin(values)
    }

    function dataTest() {
        formUser.setFieldValue('username', 'johanclement');
        formUser.setFieldValue('email', 'johanclement88@hotmail.fr');
        formUser.setFieldValue('firstname', "Johan");
        formUser.setFieldValue('lastname', 'Clement');
        formUser.setFieldValue('company', 'PJ');
        formUser.setFieldValue('accountName', 'SuperProjet');
        formUser.setFieldValue('password', 'testyu');
        formUser.setFieldValue('confirmPassword', 'testyu');
    }

    return (
        <Layout>
            <Card className='my-4 p-4'>
                <Typography variant='h4' component='h1' className="title mt-4 text-center">
                    Créer un compte 
                </Typography>
                <Button onClick={dataTest}>Data test</Button>
                <form onSubmit={formUser.onSubmit((values) => createAccount(values))}>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="username"
                            label="Nom utilisateur"
                            variant="outlined"
                            fullWidth
                            {...formUser.getInputProps('username')}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="firstname"
                            label="Prénom"
                            variant="outlined"
                            fullWidth
                            {...formUser.getInputProps('firstname')}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="lastname"
                            label="Nom"
                            variant="outlined"
                            fullWidth
                            {...formUser.getInputProps('lastname')}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            {...formUser.getInputProps('email')}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="company"
                            label="Nom de la société"
                            variant="outlined"
                            fullWidth
                            {...formUser.getInputProps('company')}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="accountName"
                            label="Nom du compte"
                            variant="outlined"
                            fullWidth
                            {...formUser.getInputProps('accountName')}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="password"
                            type="password"
                            label="Mot de passe"
                            variant="outlined"
                            fullWidth
                            {...formUser.getInputProps('password')}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="passwordVerify"
                            type="password"
                            label="Confirmation du mot de passe"
                            variant="outlined"
                            fullWidth
                            {...formUser.getInputProps('confirmPassword')}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <Button
                            type="submit"
                            variant="outlined"
                            size='large'
                        >
                            Créer mon compte
                        </Button>
                    </Box>
                </form>
            </Card>
        </Layout>
    );
}
