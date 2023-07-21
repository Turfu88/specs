import { Box, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { isLogedIn, signOut } from "../api/authentication";

export function DrawerNavLinks() {

    return (
        <>
            <Box display="flex" justifyContent="center" mt={2}>
                <Typography component="h4" variant="h5">Menu</Typography>
            </Box>
            {isLogedIn('ROLE_USER') ?
                <Box display="flex" flexDirection="column">
                    <Link to="/dashboard">
                        <ListItemButton>
                            <ListItemText primary={"Accueil"} />
                        </ListItemButton>
                    </Link>
                    <Link to="/parametres">
                        <ListItemButton>
                            <ListItemText primary={"Paramètres"} />
                        </ListItemButton>
                    </Link>
                    <Box onClick={signOut}>
                        <ListItemButton>
                            <ListItemText primary={"Deconnexion"} />
                        </ListItemButton>
                    </Box>
                </Box>
                :
                <Box display="flex" flexDirection="column">
                    <Link to="/connexion">
                        <ListItemButton>
                            <ListItemText primary={"Connexion"} />
                        </ListItemButton>
                    </Link>
                    <Link to="/creer-un-compte">
                        <ListItemButton>
                            <ListItemText primary={"Inscription"} />
                        </ListItemButton>
                    </Link>
                    <Link to="/contact">
                        <ListItemButton>
                            <ListItemText primary={"Contact"} />
                        </ListItemButton>
                    </Link>
                </Box>
            }
        </>
    )
}
