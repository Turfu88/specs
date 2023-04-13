import Button from '@mui/material/Button';
import { Layout } from '../../common/components/Layout';
import { Box, Divider, Typography } from '@mui/material';

export function Homepage() {

    return (
        <Layout>
            <Box>
                <Box textAlign='center' mt={2}>
                    <Typography component="h1" variant="h2">SpecForge</Typography>
                    <Typography component="p" variant="subtitle1">L'outil essentiel pour réaliser vos projets</Typography>
                </Box>

                <Box display="flex" justifyContent="center">
                    <Button variant="outlined" color="primary">Text</Button>
                    <Divider></Divider>
                    <Button variant="contained" color="primary">Text</Button>
                    <Divider></Divider>
                    <Button variant="outlined" color="secondary">Text</Button>
                    <Divider></Divider>
                    <Button variant="outlined" color="third">Text</Button>
                    <Divider></Divider>
                </Box>

            </Box>

        </Layout>
    );
}
