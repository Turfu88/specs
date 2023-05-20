import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Layout } from '../../common/components/Layout';
import { useForm } from '@mantine/form';
import { login } from '../../common/api/authentication';

interface LoginForm {
    email: string,
    password: string
}


export function Login() {

    const formLogin = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email non valide'),
            password: (value) => (value.length < 6 ? 'Mot de passe trop court (minimum 6 caractères)' : null)
        },
    });

    function handleLogin(values: LoginForm) {
        console.log(values);
        login(values).then((res) => {
            if (res) {
                window.location.replace("/dashboard");
            }
        })
    }

    function dataTest() {
        formLogin.setFieldValue('email', 'johanclement88@hotmail.fr');
        formLogin.setFieldValue('password', 'testyu');
    }

    return (
        <Layout>
            <div className='my-4 p-4'>
                <Typography variant='h4' component='h1' className="title mt-4 text-center">
                    Connexion à mon compte 
                </Typography>
                <Button onClick={dataTest}>Data test</Button>

                <form onSubmit={formLogin.onSubmit((values) => handleLogin(values))}>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            {...formLogin.getInputProps('email')}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="password"
                            type='password'
                            label="Mot de passe"
                            variant="outlined"
                            fullWidth
                            {...formLogin.getInputProps('password')}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <Button
                            type='submit'
                            variant="outlined"
                            size='large'
                        >
                            Connexion
                        </Button>
                    </Box>
                </form>
            </div>
        </Layout>
    );
}
