import { Link, useParams } from "react-router-dom";
import { Layout } from "../../common/components/Layout";
import { useQuery, useQueryClient } from "react-query";
import { Accordion, AccordionDetails, AccordionSummary, Box, Breadcrumbs, Button, Dialog, Menu, MenuItem, Slide, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useEffect, useState } from "react";
import { Project, User } from "../../common/types";
import { AreaEdit } from "./AreaEdit";
import { getAreaDetails } from "../../common/api/area";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export function AreaView() {
    const { uid } = useParams();
    const { isLoading, data } = useQuery('getAreaDetails', () => getAreaDetails(uid));
    const area = data || null;
    const [dialog, setDialog] = useState(false);
    const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);
    const open = Boolean(openMenu);
    const [invalidateQuery, setInvalidateQuery] = useState(false);
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

    const handleOpenAreaForm = () => {
        setDialog(true);
        handleCloseMenu();
    }

    function refreshAreaDetails() {
        if (invalidateQuery) {
            queryClient.invalidateQueries(['getAreaDetails']);
            setInvalidateQuery(false);
        }
    }

    useEffect(refreshAreaDetails, [invalidateQuery]);

    const breadcrumbs = [
        <Link key="1" color="inherit" to="/dashboard" className="link">
            Dashboard
        </Link>,
        <Typography key="3" component="span" variant="subtitle1">
            {area ? area.name : ''}
        </Typography>,
    ];

    return (
        <Layout>
            <>
                {isLoading || !area ?
                    <Box mt={2}>
                        <Typography component="h1" variant="subtitle1" textAlign="center">Chargement...</Typography>
                    </Box>
                    :
                    <Box mt={2} mb={6}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
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
                                    <MenuItem onClick={handleOpenAreaForm}>Modifier cet espace</MenuItem>
                                    <MenuItem onClick={handleOpenAreaForm}>Supprimer cet espace (TODO)</MenuItem>
                                </Menu>
                            </div>
                        </Box>
                        <Typography component="h1" variant="h4" textAlign="center" my={2}>
                            {area.name}
                        </Typography>
                        {area.users.length > 0 &&
                            <Box mb={4} p={2}>
                                <Typography component="h2" variant="body1" my={2}>
                                    Utilisateurs utilisant cet espace :
                                </Typography>
                                {area.users.map((user: User, index: number) => (
                                    <Box key={index} mb={2}>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls={`panel-content-${index}`}
                                                id={`panel-header-${index}`}
                                            >
                                                <Typography>{user.username}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography component="p" variant="body1">
                                                    {user.firstname} {user.lastname}
                                                </Typography>
                                                <Typography component="p" variant="body1">
                                                    Contact : {user.email}
                                                </Typography>
                                                {user.company &&
                                                    <Typography component="p" variant="body1">
                                                        Société : {user.company}
                                                    </Typography>
                                                }
                                            </AccordionDetails>
                                        </Accordion>
                                    </Box>
                                ))}
                            </Box>
                        }
                        {area.projects.length === 0 ?
                            <Typography component="h2" variant="body1" textAlign="center" mt={2}>
                                Pas de projet lié à cet espace
                            </Typography>
                            :
                            <Box mb={4} p={2}>
                                <Typography component="h2" variant="body1" textAlign="center" mt={2}>
                                    Projets liés à cet espace
                                </Typography>
                                {area.projects.map((project: Project, index: number) => (
                                    <Link to={`/projet/${project.uid}`}>
                                        <Box key={index} display="flex" flexDirection="column" gap={2} className="border rounded p-2">
                                            <Typography component="p" variant="body1">
                                                {project.name}
                                            </Typography>
                                        </Box>
                                    </Link>

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
                        <AreaEdit
                            handleCloseDialog={handleCloseDialog}
                            setInvalidateQuery={setInvalidateQuery}
                            area={area}
                        />
                    </Box>
                </Dialog>
            </>
        </Layout>
    );
}
