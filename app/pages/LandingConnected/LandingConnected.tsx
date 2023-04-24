import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Layout } from '../../common/components/Layout';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getAccountProjects } from '../../common/api/project';
import { log } from 'console';

interface Project {
    id: number,
    uid: string,
    name: string,
    status: string | null
    isCore: boolean
}

export function LandingConnected() {

    const { isLoading, data: projects } = useQuery('getAccountProjects', () => getAccountProjects());
    const accountProjects = projects || null;
    const core = accountProjects && accountProjects.length > 0? accountProjects.filter((project: Project) => project.isCore) : null;

    return (
        <Layout>
            <>
                {isLoading ?
                    <Box mt={8}>
                        <Typography component="h1" variant="h5" textAlign="center">Chargement...</Typography>
                    </Box>
                    :
                    <>
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Typography component="h1" variant="h3" mt={2} mb={4}>Dashboard</Typography>
                        </Box>
                        {core ?
                            <>
                                {core.map((project: Project, index: number) => (
                                    <Link to={`/projet/${project.uid}`} key={index}>
                                        <Box className="rounded p-2 d-flex bg-neutral" >
                                            <Typography component="p" variant="subtitle1">
                                                {project.name}
                                            </Typography>
                                            <Typography component="p" variant="subtitle1">
                                                {project.status}
                                            </Typography>
                                        </Box>
                                    </Link>

                                ))}
                                <Box display="flex" justifyContent="center" mt={2}>
                                    <Link to="/projet/nouveau">
                                        <Button variant="contained" color="primary">
                                            Nouveau projet
                                        </Button>
                                    </Link>
                                </Box>
                            </>
                            :
                            <Box>
                                <Typography component="h2" variant="subtitle1" textAlign="center">Vous n'avez pas encore créé le coeur de vos projets</Typography>
                                <Box display="flex" justifyContent="center" mt={2}>
                                    <Link to="/projet/nouveau-coeur">
                                        <Button variant="contained" color="primary">
                                            Définir un coeur
                                        </Button>
                                    </Link>
                                </Box>
                            </Box>
                        }
                    </>
                }

                {/* <Box display="flex" justifyContent="center" mt={2}>
                    <Button variant="contained" color="primary">
                        Afficher une notification
                    </Button>
                </Box> */}
            </>
        </Layout>
    );
}
