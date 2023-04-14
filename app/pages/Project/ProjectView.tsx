import { Box, Breadcrumbs, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Layout } from '../../common/components/Layout';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getProjectDetails } from '../../common/api/project';
import { PageThumbnail } from './PageThumbnail';
import { forwardRef, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { ProjectEditStatus } from './ProjectEditStatus';
import { Project } from '../../common/types';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export function ProjectView() {
    const { uid } = useParams();
    const { isLoading, data } = useQuery('getProjectDetails', () => getProjectDetails(uid));
    const project: Project = data || null;
    const [dialog, setDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState<'status' | 'section' | null>(null);
    const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);
    const open = Boolean(openMenu);

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

    const handleOpenStatus = () => {
        setOpenMenu(null);
        setDialogContent('status');
        setDialog(true);
    }

    const handleOpenSection = () => {
        setOpenMenu(null);
        setDialogContent('section');
        setDialog(true);
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
        <Layout>
            <>
                {
                    isLoading || !project?.pages ?
                        <Box mt={2}>
                            <Typography component="h1" variant="subtitle1" textAlign="center" >Chargement...</Typography>
                        </Box>
                        :
                        <Box mt={2}>
                            <Box display="flex" justifyContent="space-between">
                                <Breadcrumbs
                                    separator="›"
                                    aria-label="breadcrumb"
                                >
                                    {breadcrumbs}
                                </Breadcrumbs>
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
                                        <MenuItem onClick={handleClose}>Modifier les informations (N/A)</MenuItem>
                                        <MenuItem onClick={handleOpenStatus}>Gestion des statuts</MenuItem>
                                        <MenuItem onClick={handleOpenSection}>Gestion des sections</MenuItem>
                                    </Menu>
                                </div>
                            </Box>

                            <Typography component="h1" variant="h3" textAlign="center">{project.name}</Typography>
                            <Typography component="h2" variant="subtitle1" textAlign="center" mt={2}>Ensemble des pages</Typography>
                            {
                                project.pages.length > 0 ?
                                    <>
                                        <Typography component="h2" variant="subtitle1" textAlign="center" mt={2}>
                                            Liste des pages (todo)
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
                        </Box>
                }
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
                        <ProjectEditStatus
                            handleCloseDialog={handleCloseDialog}
                            project={project}
                        />
                    </Box>
                </Dialog>
            </>
        </Layout>
    );
}
