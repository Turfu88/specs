import { Box, Breadcrumbs, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Layout } from '../../common/components/Layout';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getPageDetails } from '../../common/api/page';

export function PageView() {
    const { uid } = useParams();
    const { isLoading, data } = useQuery('getPageDetails', () => getPageDetails(uid));
    const page = data || null;
    console.log(page);
    if (page) {
        localStorage.setItem('page', JSON.stringify(page.id));
    }
    const breadcrumbs = [
        <Link key="1" color="inherit" to="/dashboard" className="link">
            Dashboard
        </Link>,
        <Link key="1" color="inherit" to={`/projet/${page ? page.projectUid : ''}`} className="link">
            {page ? page.projectName : ''}
        </Link>,
        <Typography key="3" component="span" variant="subtitle1">
            {page ? page.name : ''}
        </Typography>,
    ];

    return (
        <Layout>
            {
                isLoading || !page ?
                    <Box mt={2}>
                        <Typography component="h1" variant="subtitle1" textAlign="center" >Chargement...</Typography>
                    </Box>
                    :
                    <Box mt={2}>
                        <Breadcrumbs
                            separator="›"
                            aria-label="breadcrumb"
                        >
                            {breadcrumbs}
                        </Breadcrumbs>
                        <Typography component="h1" variant="h4" textAlign="center" mt={2}>{page.name}</Typography>
                        <Typography component="h2" variant="subtitle1" textAlign="center" mt={2}>Ensemble des fonctionnalités</Typography>
                        {
                            page.features.length > 0 ?
                                <>
                                    <Typography component="h2" variant="subtitle1" textAlign="center" mt={2}>
                                        Liste des fonctionnalités (todo)
                                    </Typography>


                                    <Box mt={2} display="flex" justifyContent="center">
                                        <Link to="/page/nouvelle">
                                            <Button variant="contained">
                                                Ajouter une fonctionnalité
                                            </Button>
                                        </Link>
                                    </Box>
                                </>
                                :
                                <>
                                    <Typography component="h2" variant="subtitle1" textAlign="center" mt={2}>
                                        Aucune fonctionnalité présente sur cette page
                                    </Typography>
                                    <Box mt={2} display="flex" justifyContent="center">
                                        <Link to="/fonctionnalite/nouvelle">
                                            <Button variant="contained">
                                                Créer une fonctionnalité
                                            </Button>
                                        </Link>
                                    </Box>
                                </>
                        }
                    </Box>
            }
        </Layout>
    );
}
