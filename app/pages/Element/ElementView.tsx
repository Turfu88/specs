import { Box, Breadcrumbs, Button, Dialog, Menu, MenuItem, Slide, Typography } from '@mui/material';
import { Layout } from '../../common/components/Layout';
import { useQuery, useQueryClient } from 'react-query';
import { Element } from '../../common/types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteElement, getElementDetails } from '../../common/api/element';
import { forwardRef, useEffect, useState } from 'react';
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
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { isLoading, data } = useQuery('getElementDetails', () => getElementDetails(uid));
    const element: Element = data || null;
    const [dialog, setDialog] = useState(false);
    const [invalidateQuery, setInvalidateQuery] = useState(false);
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

    function refreshConnectionDetails() {
        if (invalidateQuery) {
            queryClient.invalidateQueries(['getElementDetails']);
            setInvalidateQuery(false);
        }
    }

    const handleDeleteElement = () => {            
        deleteElement(element.id);
        navigate(`/projet/${element.projectUid}`);
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

    useEffect(refreshConnectionDetails, [invalidateQuery])

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
                                <MenuItem onClick={handleDeleteElement} disabled={element && (element.specs.length > 0 || element.connections.length > 0)}>Supprimer cet élément</MenuItem>
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
                            {element.connections.length > 0 &&
                                <Box mb={4} className="border rounded" p={2}>
                                    <Typography component="h1" variant="body1" textAlign="center" mt={2}>
                                        Connections liées à cet élément
                                    </Typography>
                                    {element.connections.map((connection: {id: number, name: string}, index: number) => (
                                        <Box key={index} display="flex" flexDirection="column" gap={2}>
                                            <Typography component="p" variant="body1">
                                                {connection.name}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            }
                            {element.specs.length > 0 &&
                                <Box mb={4} className="border rounded" p={2}>
                                    <Typography component="h1" variant="body1" textAlign="center" mt={2}>
                                        Connections liées à cet élément
                                    </Typography>
                                    {element.specs.map((spec: {id: number, name: string}, index: number) => (
                                        <Box key={index} display="flex" flexDirection="column" gap={2}>
                                            <Typography component="p" variant="body1">
                                                {spec.name}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            }
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
                            setInvalidateQuery={setInvalidateQuery}
                            element={element}
                        />
                    </Box>
                </Dialog>
            </>
        </Layout>
    );
}
