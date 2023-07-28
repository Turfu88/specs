import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Slide, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Layout } from '../../common/components/Layout';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getUserAreas } from '../../common/api/user';
import { Area } from '../../common/types';
import StarIcon from '@mui/icons-material/Star';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useState } from 'react';

interface Project {
    id: number,
    uid: string,
    name: string,
    status: string | null
    isCore: boolean
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function LandingConnected() {
    const { isLoading, data: areas } = useQuery('getUserAreas', () => getUserAreas());
    const userAreas = areas || null;
    const [newProjectDialog, setNewProjectDialog] = useState(false);

    // const core = accountProjects && accountProjects.length > 0? accountProjects.filter((project: Project) => project.isCore) : null;
    let projects: Project[] = [];
    let projectIds: string[] = [];
    if (areas) {
        areas.forEach((area: Area) => {
            area.projects.forEach((project: Project) => {
                if (!projectIds.includes(project.uid)) {
                    projectIds.push(project.uid);
                    projects.push(project);
                }
            })
        });
    }

    const handleClickOpenDialog = () => {
        setNewProjectDialog(true);
    };

    const handleCloseDialog = () => {
        setNewProjectDialog(false);
    };

    return (
        <Layout>
            <>
                {isLoading ?
                    <Box mt={8}>
                        <Typography component="h1" variant="h5" textAlign="center">Chargement...</Typography>
                    </Box>
                    :
                    <Box mb={8}>
                        <Box display="flex" justifyContent="center" mt={2}>
                            <Typography component="h1" variant="h4" mt={2} mb={4}>Mes espaces</Typography>
                        </Box>
                        {userAreas && projects &&
                            <>
                                {userAreas.map((area: Area, index: number) => (
                                    <Link to={`/espace/${area.uid}`} key={index}>
                                        <Box className="rounded p-2 d-flex bg-neutral mb-3" >
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
                                    <Box mb={2} key={index}>
                                        <Link to={`/projet/${project.uid}`}>
                                            <Box display="flex" justifyContent="space-between" alignItems="center" className="rounded p-2 bg-neutral" >
                                                <Typography component="p" variant="subtitle1">
                                                    {project.name}
                                                </Typography>
                                                {project.isCore &&
                                                    <StarIcon />
                                                }
                                            </Box>
                                        </Link>
                                    </Box>
                                ))}
                                {projects.length === 0 &&
                                    <Typography component="h2" variant="subtitle1" textAlign="center">Vous n'avez pas encore créé de projet</Typography>
                                }
                                <Box display="flex" justifyContent="center" mt={4}>
                                    <Button variant="contained" color="primary" onClick={handleClickOpenDialog}>
                                        Nouveau projet
                                    </Button>
                                </Box>
                            </>
                        }
                    </Box>
                }
                <Dialog
                    open={newProjectDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseDialog}
                    aria-describedby="alert-dialog-create-project"
                >
                    <DialogTitle className='text-center'>{"Quel type de projet?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Un projet mère correspond à un modèle tandis qu'un projet enfant correspond à un projet pouvant hériter de n'importe quelle propriété.
                        </DialogContentText>
                        <DialogContentText>
                            Si vous n'avez pas encore créé de projet, il est conseillé de d'abord créer un projet mère.
                            Vous serez guidé dans les deux cas.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className='justify-center' style={{ padding: '20px' }}>
                        <Box display="flex" flexDirection="row" justifyContent="space-between" width="100%">
                            <Button onClick={handleCloseDialog} variant="outlined">Annuler</Button>
                            <Link to="/projet/nouveau-projet-mere">
                                <Button variant="contained" color="secondary">Projet mère</Button>
                            </Link>
                            <Link to="/projet/nouveau">
                                <Button variant="contained" color="primary">Projet enfant</Button>
                            </Link>
                        </Box>
                    </DialogActions>
                </Dialog>
            </>
        </Layout>
    );
}
