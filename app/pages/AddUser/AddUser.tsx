import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Layout } from '../../common/components/Layout';
import { useForm } from '@mantine/form';
import { createInvitation } from '../../common/api/invitation';
import { useParams } from 'react-router-dom';

export function AddUser() {
    const { uid } = useParams();

    const formInvitation = useForm({
        initialValues: {
            email: '',
            areaUid: uid as string
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email non valide'),
        },
    });

    function submitInviteUser(values: {email: string, areaUid: string}) {
        createInvitation(values);
    }

    return (
        <Layout>
            <Box>
                <Typography mt={4} mb={2} component="h1" variant="h4" textAlign="center">
                    Inviter un utilisateur <br />
                    à rejoindre cet espace
                </Typography>
                <form onSubmit={formInvitation.onSubmit((values) => submitInviteUser(values))}>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            {...formInvitation.getInputProps('email')}
                            error={formInvitation.errors.email ? true : false}
                            helperText={formInvitation.errors.email}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <Button
                            type="submit"
                            variant="outlined"
                            size='large'
                        >
                            Inviter
                        </Button>
                    </Box>
                </form>
            </Box>
        </Layout>
    );
}
