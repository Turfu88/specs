import { Box, Divider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Layout } from '../../common/components/Layout';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getUserAreas } from '../../common/api/user';
import { Area } from '../../common/types';
import StarIcon from '@mui/icons-material/Star';

interface Project {
    id: number,
    uid: string,
    name: string,
    status: string | null
    isCore: boolean
}

export function LandingConnected() {
    const { isLoading, data: areas } = useQuery('getUserAreas', () => getUserAreas());
    const userAreas = areas || null;
    // const core = accountProjects && accountProjects.length > 0? accountProjects.filter((project: Project) => project.isCore) : null;
    let projects: Project[] = [];
    let core = null;
    if (areas) {
        areas.forEach((area: Area) => {
            area.projects.forEach((project: Project) => {
                if (!projects.includes(project)) {
                    projects.push(project);
                }
            })
        });
        core = projects && projects.length > 0 ? projects.filter((project: Project) => project.isCore) : null;
    }

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
                            <Typography component="h1" variant="h4" mt={2} mb={4}>Mes espaces</Typography>
                        </Box>
                        {userAreas && projects &&
                            <>
                                {userAreas.map((area: Area, index: number) => (
                                    <Link to={`/espace/${area.uid}`} key={index}>
                                        <Box className="rounded p-2 d-flex bg-neutral" >
                                            <Typography component="p" variant="subtitle1">
                                                {area.name}
                                            </Typography>
                                        </Box>
                                    </Link>

                                ))}
                                {projects.length > 0 &&
                                    <Box display="flex" justifyContent="center" mt={2}>
                                        <Link to="/espace/nouveau">
                                            <Button variant="contained" color="primary">
                                                Nouvel espace
                                            </Button>
                                        </Link>
                                    </Box>
                                }
                                <Box mt={4}>
                                    <Divider></Divider>
                                </Box>
                                <Box display="flex" justifyContent="center" mt={2}>
                                    <Typography component="h2" variant="h4" mb={4}>Tous mes projets</Typography>
                                </Box>
                                {projects.map((project: Project, index: number) => (
                                    <Link to={`/projet/${project.uid}`} key={index}>
                                        <Box display="flex" justifyContent="space-between" alignItems="center" className="rounded p-2 bg-neutral" >
                                            <Typography component="p" variant="subtitle1">
                                                {project.name}
                                            </Typography>
                                            {project.isCore &&
                                                <StarIcon />
                                            }
                                        </Box>
                                    </Link>

                                ))}
                                {projects.length > 0 &&
                                    <Box display="flex" justifyContent="center" mt={2}>
                                        <Link to="/projet/nouveau">
                                            <Button variant="contained" color="primary">
                                                Nouveau projet
                                            </Button>
                                        </Link>
                                    </Box>
                                }
                                {projects.length === 0 && !core &&
                                    <Box mt={2}>
                                        <Typography component="h2" variant="subtitle1" textAlign="center">Vous n'avez pas encore créé de projet</Typography>
                                        <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
                                            <Box display="flex" justifyContent="center" mt={2}>
                                                <Link to="/projet/nouveau-coeur">
                                                    <Button variant="contained" color="primary">
                                                        Créer un projet mère
                                                    </Button>
                                                </Link>
                                            </Box>
                                            <Box display="flex" justifyContent="center" mt={2}>
                                                <Link to="/projet/nouveau">
                                                    <Button variant="contained" color="primary">
                                                        Créer un projet vierge
                                                    </Button>
                                                </Link>
                                            </Box>
                                        </Box>

                                    </Box>
                                }
                            </>
                        }
                    </>
                }
            </>
        </Layout>
    );
}
