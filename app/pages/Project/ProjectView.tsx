import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Layout } from '../../common/components/Layout';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getOneProject } from '../../common/api/project';
import { PageThumbnail } from './PageThumbnail';

export function ProjectView() {
    const { uid } = useParams();
    const { isLoading, data } = useQuery('getAccountProjects', () => getOneProject(uid));
    const project = data || null;
    console.log(project);
    if (project) {
        localStorage.setItem('project', JSON.stringify(project.id));
    }

    return (
        <Layout>
            {
                isLoading ?
                    <Box mt={2}>
                        <Typography component="h1" variant="subtitle1" textAlign="center" >Chargement...</Typography>
                    </Box>
                    :
                    <Box mt={2}>
                        <Typography component="h1" variant="h3" textAlign="center">{project.name}</Typography>
                        <Typography component="h2" variant="subtitle1" textAlign="center" mt={2}>Ensemble des pages</Typography>
                        {
                            project.pages.length > 0 ?
                                <>
                                    <Typography component="h2" variant="subtitle1" textAlign="center" mt={2}>
                                        Liste des pages (todo)
                                    </Typography>
                                    <Box className="row justify-content-md-center">
                                        {project.pages.map((page: any) => <PageThumbnail page={page} />)}
                                    </Box>
                                    
                                    <Box mt={2} display="flex" justifyContent="center">
                                        <Link to="/page/nouvelle">
                                            <Button variant="contained">
                                                Ajouter une page
                                            </Button>
                                        </Link>
                                    </Box>
                                </>
                                :
                                <>
                                    <Typography component="h2" variant="subtitle1" textAlign="center" mt={2}>
                                        Aucune page présente sur ce projet
                                    </Typography>
                                    <Box mt={2} display="flex" justifyContent="center">
                                        <Link to="/page/nouvelle">
                                            <Button variant="contained">
                                                Créer une page
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
