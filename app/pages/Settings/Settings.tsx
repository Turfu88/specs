import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Layout } from '../../common/components/Layout';
import { useForm } from '@mantine/form';
import { useQuery } from 'react-query';
import { getUserDetails, getUserId, updateUser } from '../../common/api/user';
import { User } from '../../common/types';
import { useEffect } from 'react';

export interface UserUpdateForm {
    email: string,
    firstname: string,
    lastname: string,
    company: string
}

export function Settings() {
    const { isLoading, data } = useQuery('getUserDetails', () => getUserDetails());
    const user: User = data || null;    

    const formUser = useForm({
        initialValues: {
            email: '',
            firstname: '',
            lastname: '',
            company: ''
        } as UserUpdateForm,
        validate: {
            email: (value: string) => (value.length < 2 ? 'Email trop court' : null),
            firstname: (value: string) => (value.length < 2 ? 'Nom trop court' : null),
        },
    });


    function handleUpdateUser(values: UserUpdateForm) {
        updateUser(user.id, { ...values });
    }

    function dataTest() {
        formUser.setFieldValue('email', 'johanclement88@hotmail.com');
        formUser.setFieldValue('firstname', "johan");
        formUser.setFieldValue('lastname', "clement");
        formUser.setFieldValue('company', "Purjus");
    }

    useEffect(() => {
        if (null !== user) {
            formUser.setFieldValue('id', user.id);
            formUser.setFieldValue('email', user.email);
            formUser.setFieldValue('firstname', user.firstname);
            formUser.setFieldValue('lastname', user.lastname);
            formUser.setFieldValue('company', user.company);
        }
    }, [user]);
    

    return (
        <Layout>
            <Box className="mt-4">
                <div className="text-center">Mettre à jour les données de votre compte utilisateur</div>
                {/* <Button onClick={dataTest}>Data test</Button> */}
                <form onSubmit={formUser.onSubmit((values) => handleUpdateUser(values))}>
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
                            id="firstname"
                            label="Firstname"
                            variant="outlined"
                            fullWidth
                            {...formUser.getInputProps('firstname')}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="lastname"
                            label="Lastname"
                            variant="outlined"
                            fullWidth
                            {...formUser.getInputProps('lastname')}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="company"
                            label="Company"
                            variant="outlined"
                            fullWidth
                            {...formUser.getInputProps('company')}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <Button
                            type="submit"
                            variant="contained"
                            size='large'
                        >
                            Mettre à jour
                        </Button>
                    </Box>
                </form>
            </Box>
        </Layout>
    );
}
