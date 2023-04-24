import { Accordion, AccordionDetails, AccordionSummary, Box, Breadcrumbs, Dialog, Divider, Menu, MenuItem, Slide, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Layout } from '../../common/components/Layout';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getPageDetails } from '../../common/api/page';
import { Feature, Spec } from '../../common/types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { forwardRef, useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { PageEdit } from './PageEdit';
import { StatusShow } from '../../common/components/StatusShow';
import UnpublishedOutlinedIcon from '@mui/icons-material/UnpublishedOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function PageView() {
    const { uid } = useParams();
    const { isLoading, data } = useQuery('getPageDetails', () => getPageDetails(uid));
    const page = data || null;
    const [dialog, setDialog] = useState(false);
    const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);
    const open = Boolean(openMenu);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenMenu(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setOpenMenu(null);
    };

    const handleCloseDialog = () => {
        setDialog(false);
    };

    const handleOpenELementForm = () => {
        setDialog(true);
        handleCloseMenu();
    }
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
            <>
                {isLoading || !page ?
                    <Box mt={2}>
                        <Typography component="h1" variant="subtitle1" textAlign="center" >Chargement...</Typography>
                    </Box>
                    :
                    <Box mt={2} mb={6}>
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
                                    onClose={handleCloseMenu}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleOpenELementForm}>Modifier cette page</MenuItem>
                                    <MenuItem onClick={handleOpenELementForm}>Supprimer cette page (TODO)</MenuItem>
                                </Menu>
                            </div>
                        </Box>
                        <Typography component="h1" variant="h4" textAlign="center" my={2}>
                            {page.name}
                        </Typography>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                            <Typography component="span" variant="body1">
                                Visibilité: {page.isPrivate ? <LockIcon /> : <LockOpenIcon color="success" />}
                            </Typography>
                            <Typography component="span" variant="body1">
                                Modèle validé ? {page.isModelOk ? <CheckCircleOutlineOutlinedIcon color="success" /> : <UnpublishedOutlinedIcon />}
                            </Typography>
                            <StatusShow status={page.status} />
                        </Box>
                        {page.comment !== null &&
                            <Box mb={4} className="border rounded" p={2}>
                                <Typography component="h1" variant="body1" textAlign="center" mt={2}>
                                    {page.comment}
                                </Typography>
                            </Box>
                        }
                        <Typography component="h2" variant="h5" textAlign="center" mt={2}>
                            Fonctionnalités
                        </Typography>
                        {page.features.length > 0 ?
                            <>
                                <Box mt={2}>
                                    {page.features.map((feature: Feature, index: number) => (
                                        <Accordion defaultExpanded key={index}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls={`panel-${index}-content`}
                                                id={`panel-${index}-header`}
                                                className="accordion-panel"
                                            >
                                                <Typography component="p" variant="body1">
                                                    {feature.name}
                                                </Typography>
                                                <Typography component="p" variant="body1">
                                                    Status
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <>
                                                    <Link to={`/fonctionnalite/${feature.uid}`}>
                                                        <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2} pb={2}>
                                                            <Button variant="outlined">
                                                                Détails
                                                            </Button>
                                                        </Box>
                                                    </Link>
                                                    <Divider></Divider>
                                                    <Box>
                                                        {0 === feature.specs.length &&
                                                            <Typography component="p" variant="body1" textAlign="center" mt={2}>
                                                                Pas de spec pour cette fonctionnalité
                                                            </Typography>
                                                        }
                                                        {feature.specs.map((spec: Spec, index: number) => (
                                                            <Link to={`/spec/${spec.uid}`} key={index}>
                                                                <Box mt={2} display="flex" justifyContent="space-between">
                                                                    <Typography component="div" variant="body1">
                                                                        {spec.name}
                                                                    </Typography>
                                                                    <Typography component="div" variant="body1">
                                                                        {spec.status}
                                                                    </Typography>
                                                                </Box>
                                                            </Link>

                                                        ))}
                                                    </Box>
                                                </>
                                            </AccordionDetails>
                                        </Accordion>
                                    ))}
                                </Box>
                                <Box mt={2} display="flex" justifyContent="center">
                                    <Link to="/fonctionnalite/nouvelle">
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
                        <PageEdit
                            handleCloseDialog={handleCloseDialog}
                            page={page}
                        />
                    </Box>
                </Dialog>
            </>
        </Layout>
    );
}
