import { Box, Breadcrumbs, Button, Dialog, Menu, MenuItem, Slide, Typography } from '@mui/material';
import { Layout } from '../../common/components/Layout';
import { useQuery } from 'react-query';
import { Element } from '../../common/types';
import { Link, useParams } from 'react-router-dom';
import { getElementDetails } from '../../common/api/element';
import { forwardRef, useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import { ElementEdit } from './ElementEdit';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export function ElementView() {
    const { uid } = useParams();
    const { isLoading, data } = useQuery('getElementDetails', () => getElementDetails(uid));
    const element: Element = data || null;
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

    const breadcrumbs = [
        <Link key="1" color="inherit" to="/dashboard" className="link">
            Dashboard
        </Link>,
        <Link key="1" color="inherit" to={`/projet/${element ? element.projectUid : ''}`} className="link">
            {element ? element.projectName : ''}
        </Link>,
        <Typography key="3" component="span" variant="subtitle1">
            {element ? element.name : ''}
        </Typography>,
    ];

    return (
        <Layout>
            <>
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
                                onClose={handleCloseMenu}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleOpenELementForm}>Modifier cet élément</MenuItem>
                                <MenuItem onClick={handleOpenELementForm}>Supprimer cet élément (TODO)</MenuItem>
                            </Menu>
                        </div>
                    </Box>
                    <Typography component="h1" variant="h4" textAlign="center" mt={2}>Détails Eléments</Typography>
                    {isLoading ?
                        <Typography mt={4} textAlign="center" component="h1" variant="subtitle1">
                            Chargement...
                        </Typography>
                        :
                        <Box mt={2} mb={6}>
                            <Typography component="h2" variant="subtitle1" textAlign="center">
                                {element.name}
                            </Typography>
                            <Box mt={2}>
                                <Typography component="p" variant="body1">
                                    {element.comment}
                                </Typography>
                            </Box>
                        </Box>
                    }
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
                        <ElementEdit
                            handleCloseDialog={handleCloseDialog}
                            element={element}
                        />
                    </Box>
                </Dialog>
            </>
        </Layout>
    );
}
