import { Box, Breadcrumbs, Menu, MenuItem, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Layout } from '../../common/components/Layout';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Connection, Spec } from '../../common/types';
import { getFeatureDetails } from '../../common/api/feature';
import { forwardRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { StatusShow } from '../../common/components/StatusShow';
import { FeatureEdit } from './FeatureEdit';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function FeatureView() {
    const { uid } = useParams();
    const { isLoading, data } = useQuery('getFeatureDetails', () => getFeatureDetails(uid));
    const feature = data || null;
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

    const handleOpenConnectionForm = () => {
        setDialog(true);
        handleCloseMenu();
    }
    if (feature) {
        localStorage.setItem('feature', JSON.stringify(feature.id));
    }

    const breadcrumbs = [
        <Link key="1" color="inherit" to="/dashboard" className="link">
            Dashboard
        </Link>,
        <Link key="1" color="inherit" to={`/projet/${feature ? feature.projectUid : ''}`} className="link">
            {feature ? feature.projectName : ''}
        </Link>,
        <Typography key="3" component="span" variant="subtitle1">
            {feature ? feature.name : ''}
        </Typography>,
    ];

    return (
        <Layout>
            <>
                {isLoading || !feature ?
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
                                    <MenuItem onClick={handleOpenConnectionForm}>Modifier la fonctionnalité</MenuItem>
                                    <MenuItem onClick={handleOpenConnectionForm}>Supprimer la fonctionnalité (TODO)</MenuItem>
                                </Menu>
                            </div>
                        </Box>
                        <Typography component="h1" variant="h4" textAlign="center" my={2}>
                            {feature.name}
                        </Typography>
                        <Box display="flex" justifyContent="center" mb={4}>
                            <StatusShow status={feature.status} />
                        </Box>
                        {feature.description !== null &&
                            <Box mb={4} className="border rounded" p={2}>
                                <Typography component="h1" variant="body1" textAlign="center" mt={2}>
                                    {feature.description}
                                </Typography>
                            </Box>
                        }
                        <Typography component="h2" variant="h5" textAlign="center" mt={2}>
                            Specs
                        </Typography>
                        {feature.specs.length > 0 ?
                            <>
                                <Box mt={2}>
                                    {feature.specs.map((spec: Spec, index: number) => (
                                        <Box
                                            key={index}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            className="border rounded p-2"
                                            mb={2}
                                        >
                                            <Typography component="p" variant="body1">
                                                {spec.name}
                                            </Typography>
                                            <Box display="flex" alignItems="center" gap={2}>
                                                {spec.status &&
                                                    <Typography component="p" variant="body1" className="border p-2 rounded">
                                                        {spec.status}
                                                    </Typography>
                                                }
                                                <Link to={`/spec/${spec.uid}`}>
                                                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                                                        <Button variant="outlined">
                                                            Détails
                                                        </Button>
                                                    </Box>
                                                </Link>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                                <Box mt={2} display="flex" justifyContent="center">
                                    <Link to="/spec/nouvelle">
                                        <Button variant="contained">
                                            Ajouter une spec
                                        </Button>
                                    </Link>
                                </Box>
                            </>
                            :
                            <>
                                <Typography component="h2" variant="subtitle1" textAlign="center" mt={2}>
                                    Aucune Spec définie pour cette fonctionnalité
                                </Typography>
                                <Box mt={2} display="flex" justifyContent="center">
                                    <Link to="/spec/nouvelle">
                                        <Button variant="contained">
                                            Créer une spec
                                        </Button>
                                    </Link>
                                </Box>
                            </>
                        }
                        {feature.connections.length > 0 &&
                            <Box mb={4} className="border rounded" p={2}>
                                <Typography component="h1" variant="body1" textAlign="center" mt={2}>
                                    Eléments liés à cette spec
                                </Typography>
                                {feature.connections.map((connection: Connection, index: number) => (
                                    <Box key={index} display="flex" flexDirection="column" gap={2}>
                                        <Typography component="p" variant="body1">
                                            {connection.name}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
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
                        <FeatureEdit
                            handleCloseDialog={handleCloseDialog}
                            feature={feature}
                        />
                    </Box>
                </Dialog>
            </>
        </Layout>
    );
}
