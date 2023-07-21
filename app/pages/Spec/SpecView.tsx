import { Box, Breadcrumbs, Button, Menu, MenuItem, Typography } from '@mui/material';
import { Layout } from '../../common/components/Layout';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { getSpecDetails, deleteSpec } from '../../common/api/spec';
import { Element } from '../../common/types';
import { forwardRef, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { StatusShow } from '../../common/components/StatusShow';
import { SpecEdit } from './SpecEdit';
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

export function SpecView() {
    const { uid } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { isLoading, data } = useQuery('getSpecDetails', () => getSpecDetails(uid));
    const spec = data || null;
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

    const handleOpenSpecForm = () => {
        setDialog(true);
        handleCloseMenu();
    }

    const handleDeleteSpec = () => {            
        deleteSpec(spec.id);
        navigate(`/fonctionnalite/${spec.featureUid}`);
    }

    function sendValidation(status: boolean, type: string, validationToRemove: number | null) {
        if (status) {
            addValidation({
                type,
                projectId: localStorage.getItem('project'),
                userId: getUserId(),
                specId: spec.id
            });
        } else {
            deleteValidation({
                id: validationToRemove,
                userId: getUserId(),
            });
        }
    }

    function refreshConnectionDetails() {
        if (invalidateQuery) {
            queryClient.invalidateQueries(['getSpecDetails']);
            setInvalidateQuery(false);
        }
    }

    const breadcrumbs = [
        <Link key="1" color="inherit" to="/dashboard" className="link">
            Dashboard
        </Link>,
        <Link key="1" color="inherit" to={`/projet/${spec ? spec.projectUid : ''}`} className="link">
            {spec ? spec.projectName : ''}
        </Link>,
        <Link key="1" color="inherit" to={`/fonctionnalite/${spec ? spec.featureUid : ''}`} className="link">
            Fonctionnalité
        </Link>,
        <Typography key="3" component="span" variant="subtitle1">
            Spec
        </Typography>,
    ];

    useEffect(refreshConnectionDetails, [invalidateQuery])

    return (
        <Layout>
            <>
                {isLoading || !spec ?
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
                                    <MenuItem onClick={handleOpenSpecForm}>Modifier la spec</MenuItem>
                                    <MenuItem onClick={handleDeleteSpec}>Supprimer la spec</MenuItem>
                                </Menu>
                            </div>
                        </Box>
                        <Typography component="h1" variant="h4" textAlign="center" my={2}>
                            {spec.name}
                        </Typography>
                        <Box display="flex" justifyContent="center" mb={4}>
                            <StatusShow status={spec.status} />
                        </Box>
                        <ValidationBlock
                            validations={spec.validations}
                            validators={spec.validators}
                            sendValidation={sendValidation}
                            element={'spec'}
                        />
                        {spec.description !== null &&
                            <Box mb={4} className="border rounded" p={2}>
                                <Typography component="h1" variant="body1" textAlign="center" mt={2}>
                                    {spec.description}
                                </Typography>
                            </Box>
                        }
                        {spec.elements.length > 0 &&
                            <Box mb={4} className="border rounded" p={2}>
                                <Typography component="h1" variant="body1" textAlign="center" mt={2}>
                                    Eléments liés à cette spec
                                </Typography>
                                {spec.elements.map((element: Element, index: number) => (
                                    <Box key={index} display="flex" flexDirection="column" gap={2}>
                                        <Typography component="p" variant="body1">
                                            {element.name}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        }
                        <FeedbackSection
                            feedbacks={spec.feedbacks}
                            projectId={spec.projectId}
                            feedbackType={"spec"}
                            parentId={spec.id}
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
                        <SpecEdit
                            handleCloseDialog={handleCloseDialog}
                            setInvalidateQuery={setInvalidateQuery}
                            spec={spec}
                        />
                    </Box>
                </Dialog>
            </>
        </Layout>
    );
}
