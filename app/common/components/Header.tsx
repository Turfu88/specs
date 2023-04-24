import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Drawer } from '@mui/material';
import { Link } from 'react-router-dom';
import { DrawerNavLinks } from './DrawerNavLinks';
import { isLogedIn } from '../api/authentication';

export function Header() {
    const [drawer, setDrawer] = useState(false);
    const isLoggedIn = isLogedIn('ROLE_USER');

    function toggleDrawer(event: React.KeyboardEvent | React.MouseEvent) {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setDrawer(() => !drawer);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box display="flex" justifyContent="space-between" width="100%">
                        <div onClick={toggleDrawer}>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </div>
                        {!isLoggedIn &&
                            <Box display="flex" gap={2} alignItems="center">
                                <Link to="/login">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        className="bg-neutral"
                                        size="small"
                                    >
                                        Connexion
                                    </Button>
                                </Link>
                                <Link to="/creer-un-compte">
                                    <Button
                                        color="third"
                                        variant="outlined"
                                        className="bg-neutral"
                                        size="small"
                                    >
                                        Inscription
                                    </Button>
                                </Link>
                            </Box>
                        }

                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor={'left'}
                open={drawer}
                onClose={toggleDrawer}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer}
                    onKeyDown={toggleDrawer}
                >
                    <DrawerNavLinks />
                </Box>
            </Drawer>
        </Box>
    );
}
