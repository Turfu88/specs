import { Box, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { LayoutLight } from '../../common/components/LayoutLight';
import { Layout } from '../../common/components/Layout';
import { useForm } from '@mantine/form';
import { createInvitation } from '../../common/api/invitation';
import { useParams, useSearchParams } from 'react-router-dom';
import { getUserEmail } from '../../common/api/user';
import { useQuery } from 'react-query';
import { getInvitationDetails } from '../../common/api/invitation';
import { Login } from '../Login/Login';
import { CreateUser } from './CreateUser';

export function InvitationView() {
    const { uid } = useParams();
    const { isLoading, data } = useQuery('getInvitationDetails', () => getInvitationDetails(uid));
    const validation = data || null;
    let [searchParams, setSearchParams] = useSearchParams();

    function joinArea() {
        console.log("join area");
    }

    if (validation && getUserEmail() === validation.email) {
        return (
            <Layout>
                <Box>
                    <Typography mt={4} mb={2} component="h1" variant="h4" textAlign="center">
                        Vous êtes déjà connecté
                    </Typography>
                    <Typography mt={4} mb={2} component="p" variant="body1" textAlign="center">
                        Parfait ! Ce sera encore plus rapide !
                        Vous pouvez directement activer votre nouvel espace en cliquant ici
                    </Typography>
                    <Box display="flex" justifyContent="center">
                        <Button color="primary" variant='contained' onClick={joinArea}>
                            Rejoindre
                        </Button>
                    </Box>
                </Box>
            </Layout>
        );
    }

    if ('true' === searchParams.get('userHasAccount')) {
        return (
            <Login />
        );
    }

    return (
        <LayoutLight>
            <CreateUser />
        </LayoutLight>
    )
}
