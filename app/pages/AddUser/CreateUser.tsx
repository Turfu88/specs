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
}

export function CreateUser() {

    const formUser = useForm({
        initialValues: {
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            company: '',
            password: '',
            confirmPassword: ''
        },
        validate: {
            username: (value) => (value.length < 2 ? 'Nom utilisateur incorrect (trop court)' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email non valide'),
            firstname: (value) => (value.length < 2 ? 'Prénom incorrect (trop court)' : null),
            lastname: (value) => (value.length < 2 ? 'Nom incorrect (trop court)' : null),
            company: (value) => (value.length < 2 ? 'Nom de l\'entreprise incorrect (trop court)' : null),
            password: (value) => (value.length < 6 ? 'Mot de passe trop court (minimum 6 caractères)' : null),
            confirmPassword: (value, values) => value !== values.password ? 'Les mots de passe ne sont pas identiques' : null,
        },
    });

    function createAccount(values: UserForm) {
        createAdmin(values)
    }

    function dataTest() {
        formUser.setFieldValue('username', 'johan');
        formUser.setFieldValue('email', 'clementjohan88@gmail.fr');
        formUser.setFieldValue('firstname', "Johan");
        formUser.setFieldValue('lastname', 'Clement');
        formUser.setFieldValue('company', 'PJ');
        formUser.setFieldValue('password', 'testyu');
        formUser.setFieldValue('confirmPassword', 'testyu');
    }

    return (
        <>
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
                            error={formUser.errors.username ? true : false}
                            helperText={formUser.errors.username}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="firstname"
                            label="Prénom"
                            variant="outlined"
                            fullWidth
                            {...formUser.getInputProps('firstname')}
                            error={formUser.errors.firstname ? true : false}
                            helperText={formUser.errors.firstname}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="lastname"
                            label="Nom"
                            variant="outlined"
                            fullWidth
                            {...formUser.getInputProps('lastname')}
                            error={formUser.errors.lastname ? true : false}
                            helperText={formUser.errors.lastname}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            {...formUser.getInputProps('email')}
                            error={formUser.errors.email ? true : false}
                            helperText={formUser.errors.email}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="company"
                            label="Nom de la société"
                            variant="outlined"
                            fullWidth
                            {...formUser.getInputProps('company')}
                            error={formUser.errors.company ? true : false}
                            helperText={formUser.errors.company}
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
                            error={formUser.errors.password ? true : false}
                            helperText={formUser.errors.password}
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
                            error={formUser.errors.confirmPassword ? true : false}
                            helperText={formUser.errors.confirmPassword}
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
        </>
    );
}
