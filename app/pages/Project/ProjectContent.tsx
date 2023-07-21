import { Box, Divider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { PageThumbnail } from './PageThumbnail';
import { forwardRef, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { ProjectEditStatus } from './ProjectEditStatus';
import { ProjectEditSection } from './ProjectEditSection';
import { Project } from '../../common/types';
import { ProjectEdit } from './ProjectEdit';
import { getColorFromStatus } from '../../common/helpers/projectHelper';
import { deleteProject } from '../../common/api/project';
import { useQueryClient } from 'react-query';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface ProjectContentProps {
    project: Project,
    setInvalidateQuery: (value: boolean) => void
}

export function ProjectContent(props: ProjectContentProps) {
    const {project, setInvalidateQuery} = props;
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [dialog, setDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState<'projectForm' | 'status' | 'section' | null>(null);
    const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);
    const open = Boolean(openMenu);

    if (localStorage.getItem('page')) {
        localStorage.removeItem('page');
    }

    const handleCloseDialog = () => {
        setDialog(false);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenMenu(event.currentTarget);
    };

    const handleClose = () => {
        setOpenMenu(null);
        setDialogContent(null);
    };

    const handleOpenProjectForm = () => {
        setOpenMenu(null);
        setDialogContent('projectForm');
        setDialog(true);
    };

    const handleOpenStatus = () => {
        setOpenMenu(null);
        setDialogContent('status');
        setDialog(true);
    };

    const handleOpenSection = () => {
        setOpenMenu(null);
        setDialogContent('section');
        setDialog(true);
    };

    const handleDeleteProject = () => {            
        deleteProject(project.id).then(() => {
            queryClient.invalidateQueries(['getPageDetails']);
            navigate(`/dashboard`);
        });
    }

    if (project) {
        localStorage.setItem('project', JSON.stringify(project.id));
    }

    const breadcrumbs = [
        <Link key="1" color="inherit" to="/dashboard" className="link">
            Dashboard
        </Link>,
        <Typography key="3" component="span" variant="subtitle1">
            {project ? project.name : ''}
        </Typography>,
    ];

    return (
        <>
            <Box mt={2}>
                <Box display="flex" justifyContent="space-between">
                    <div></div>
                    <div>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            variant="outlined"
                        >
                            Options
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={openMenu}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleOpenProjectForm}>Modifier les informations</MenuItem>
                            <MenuItem onClick={handleOpenStatus}>Gestion des statuts</MenuItem>
                            <MenuItem onClick={handleOpenSection}>Gestion des sections</MenuItem>
                            <MenuItem onClick={handleDeleteProject}>Supprimer le projet</MenuItem>
                        </Menu>
                    </div>
                </Box>
                <Typography component="h1" variant="h3" textAlign="center">{project.name}</Typography>

                <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={2}>
                        {project.version &&
                            <Typography component="p" variant="body1">
                                Version: {project.version}
                            </Typography>
                        }
                        {project.previousVersion &&
                            <Typography component="p" variant="body1">
                                Version précédente: {project.previousVersion}
                            </Typography>
                        }
                    </Box>
                    {project.status &&
                        <Typography
                            component="span"
                            variant="body1"
                            className="border rounded p-2"
                            style={{ backgroundColor: getColorFromStatus(project.status, project) }}
                        >
                            {project.status}
                        </Typography>
                    }
                </Box>
                {project.comment &&
                    <Box mt={2} className="border rounded p-2">
                        <Typography component="p" variant="body1">
                            {project.comment}
                        </Typography>
                    </Box>
                }
                {
                    project.pages.length > 0 ?
                        <>
                            <Typography component="h2" variant="subtitle1" textAlign="center" mt={2}>
                                Liste des pages
                            </Typography>
                            <Box className="row justify-content-md-center">
                                {project.pages.map((page: any, index: number) => <PageThumbnail key={index} page={page} />)}
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
                <Box my={2}>
                    <Divider></Divider>
                </Box>
                <Typography component="h2" variant="h4" textAlign="center" mb={2}>
                    Fonctionnalités globales
                </Typography>
                {project.features.filter((feature) => !feature.hasPage).map((feature, index) => (
                    <Box key={index} display="flex" justifyContent="space-between" alignItems="center" className="border p-2 rounded">
                        <Typography component="span" variant="body1">
                            {feature.name}
                        </Typography>
                        <Link to={`/fonctionnalite/${feature.uid}`}>
                            <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
                                <Button variant="outlined">
                                    Détails
                                </Button>
                            </Box>
                        </Link>
                    </Box>

                ))}

                <Box mt={2} mb={8} display="flex" justifyContent="center">
                    <Link to="/fonctionnalite/nouvelle">
                        <Button variant="contained">
                            Ajouter une fonctionnalité globale
                        </Button>
                    </Link>
                </Box>
                <Box my={2}>
                    <Divider></Divider>
                </Box>
                <Box>
                    <Typography component="h2" variant="h4" textAlign="center" mb={2}>
                        Gestion des éléments
                    </Typography>
                    {project.elements.length === 0 ?
                        <>
                            Pas d'élément présent sur le projet
                        </>
                        :
                        <>
                            {project.elements.map((element, index) => (
                                <Link to={`/element/${element.uid}`} key={index}>
                                    <Box mt={2} className="border rounded p-2">
                                        <Typography variant="subtitle1" component="h3">
                                            {element.name}
                                        </Typography>
                                    </Box>
                                </Link>
                            ))}
                        </>
                    }
                    <Box mt={2} mb={8} display="flex" justifyContent="center">
                        <Link to="/element/nouveau">
                            <Button variant="contained">
                                Ajouter un élément
                            </Button>
                        </Link>
                    </Box>
                </Box>
                <Box my={2}>
                    <Divider></Divider>
                </Box>
                <Box>
                    <Typography component="h2" variant="h4" textAlign="center" mb={2}>
                        Gestion des connexions
                    </Typography>
                    {project.connections.length === 0 ?
                        <Typography component="p" variant="body1" my={4} textAlign="center">
                            Pas de connexion sur le projet
                        </Typography>
                        :
                        <>
                            {project.connections.map((connection, index: number) => (
                                <Link to={`/connexion/${connection.uid}`} key={index}>
                                    <Box mt={2} className="border rounded p-2">
                                        <Typography variant="subtitle1" component="h3">
                                            {connection.name}
                                        </Typography>
                                    </Box>
                                </Link>
                            ))}
                        </>
                    }
                    <Box mt={2} mb={8} display="flex" justifyContent="center">
                        <Link to="/connexion/nouvelle">
                            <Button variant="contained">
                                Ajouter une connexion
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
            <Dialog
                fullScreen
                open={dialog}
                onClose={handleCloseDialog}
                TransitionComponent={Transition}
            >
                <Box className="container">
                    <Box mt={2}>
                        <Button variant="outlined" onClick={handleCloseDialog}>
                            Fermer
                        </Button>
                    </Box>
                    {dialogContent === 'projectForm' &&
                        <ProjectEdit
                            handleCloseDialog={handleCloseDialog}
                            setInvalidateQuery={setInvalidateQuery}
                            project={project}
                        />
                    }
                    {dialogContent === 'status' &&
                        <ProjectEditStatus
                            handleCloseDialog={handleCloseDialog}
                            project={project}
                        />
                    }
                    {dialogContent === 'section' &&
                        <ProjectEditSection
                            handleCloseDialog={handleCloseDialog}
                            project={project}
                        />
                    }
                </Box>
            </Dialog>
        </>
    );
}
