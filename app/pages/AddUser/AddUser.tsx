import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { Layout } from '../../common/components/Layout';
import { useState } from 'react';

interface UserForm {
    name: string
}

export function AddUser() {

    const [form, setForm] = useState<UserForm>()

    return (
        <Layout>
            <Box className="">
                <div className="title mt-4 text-center">Ajouter un utilisateur</div>
                <p className="text mt-4 text-center">Créer le formulaire pour ajouter un utilisateur sur un compte</p>
            </Box>
        </Layout>
    );
}
