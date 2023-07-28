import { Box, Breadcrumbs, Button, Menu, MenuItem, Typography } from '@mui/material';
import { Layout } from '../../common/components/Layout';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { deleteConnection, getConnectionDetails } from '../../common/api/connexion';
import { forwardRef, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { ConnectionEdit } from './ConnectionEdit';
import { StatusShow } from '../../common/components/StatusShow';
import { Element } from '../../common/types';
import { FeedbackSection } from '../../common/components/FeedbackSection';
import { addValidation, deleteValidation } from '../../common/api/validation';
import { getUserId } from '../../common/api/user';
import { ValidationBlock } from '../../common/components/ValidationBlock';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function ConnectionView() {
    const { uid } = useParams();
    const navigate = useNavigate();
    const { isLoading, data } = useQuery('getConnectionDetails', () => getConnectionDetails(uid));
    const connection = data || null;
    const [dialog, setDialog] = useState(false);
    const [invalidateQuery, setInvalidateQuery] = useState(false);
    const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);
    const open = Boolean(openMenu);
    const queryClient = useQueryClient();

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

    const handleDeleteConnection = () => {            
        deleteConnection(connection.id);
        navigate(`/projet/${connection.projectUid}`);
    }

    function refreshConnectionDetails() {
        if (invalidateQuery) {
            queryClient.invalidateQueries(['getConnectionDetails']);
            setInvalidateQuery(false);
        }
    }

    function sendValidation(status: boolean, type: string, validationToRemove: number | null) {
        if (status) {
            addValidation({
                type,
                projectId: localStorage.getItem('project'),
                userId: getUserId(),
                connectionId: connection.id
            }).then(() => {
                queryClient.invalidateQueries(['getConnectionDetails']);
                setInvalidateQuery(false);
            });
        } else {
            deleteValidation({
                id: validationToRemove,
                userId: getUserId(),
            }).then(() => {
                queryClient.invalidateQueries(['getConnectionDetails']);
                setInvalidateQuery(false);
            });
        }
    }

    useEffect(refreshConnectionDetails, [invalidateQuery])

    const breadcrumbs = [
        <Link key="1" color="inherit" to="/dashboard" className="link">
            Dashboard
        </Link>,
        <Link key="1" color="inherit" to={`/projet/${connection ? connection.projectUid : ''}`} className="link">
            {connection ? connection.projectName : ''}
        </Link>,
        <Typography key="3" component="span" variant="subtitle1">
            {connection ? connection.name : ''}
        </Typography>,
    ];

    return (
        <Layout>
            <>
                {isLoading || !connection ?
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
                                    <MenuItem onClick={handleOpenConnectionForm}>Modifier la connexion</MenuItem>
                                    <MenuItem onClick={handleDeleteConnection}>Supprimer la connexion</MenuItem>
                                </Menu>
                            </div>
                        </Box>
                        <Typography component="h1" variant="h4" textAlign="center" my={2}>
                            {connection.name}
                        </Typography>
                        <Box display="flex" justifyContent="center" mb={4}>
                            <StatusShow status={connection.status} />
                        </Box>
                        <ValidationBlock
                            validations={connection.validations}
                            validators={connection.validators}
                            sendValidation={sendValidation}
                            element={'connection'}
                        />
                        {connection.description !== null &&
                            <Box mb={4} className="border rounded" p={2}>
                                <Typography component="h2" variant="body1" textAlign="center" mt={2}>
                                    {connection.description}
                                </Typography>
                            </Box>
                        }
                        {connection.url !== null &&
                            <Box mb={4} className="border rounded" p={2}>
                                <Typography component="h2" variant="body1" textAlign="center" mt={2}>
                                    {connection.url}
                                </Typography>
                            </Box>
                        }
                        {connection.code !== null &&
                            <Box mb={4} className="border rounded" p={2}>
                                <Typography component="h2" variant="body1" textAlign="center" mt={2}>
                                    {connection.code}
                                </Typography>
                            </Box>
                        }
                        {connection.elements.length > 0 &&
                            <Box mb={4} className="border rounded" p={2}>
                                <Typography component="h2" variant="body1" textAlign="center" mt={2}>
                                    Eléments liés à cette spec
                                </Typography>
                                {connection.elements.map((element: Element, index: number) => (
                                    <Box key={index} display="flex" flexDirection="column" gap={2}>
                                        <Typography component="p" variant="body1">
                                            {element.name}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        }
                        <FeedbackSection
                            feedbacks={connection.feedbacks}
                            projectId={connection.projectId}
                            feedbackType={"connection"}
                            parentId={connection.id}
                            setInvalidateQuery={setInvalidateQuery}
                        />
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
                        <ConnectionEdit
                            handleCloseDialog={handleCloseDialog}
                            setInvalidateQuery={setInvalidateQuery}
                            connection={connection}
                        />
                    </Box>
                </Dialog>
            </>
        </Layout>
    );
}
