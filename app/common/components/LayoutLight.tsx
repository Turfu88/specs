import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';


const theme = createTheme({
    palette: {
        primary: {
            main: '#13293D',    // blue dark
        },
        secondary: {
            main: '#61E294',    // green
        },
        third: {
            main: '#E71D36',    // red
        },
        neutral: {
            main: '#DAD2D8',    // light grey
        },
        dark: {
            main: '#11cb5f',
        }
    },
});

declare module '@mui/material/styles' {
    interface Palette {
        neutral: Palette['primary'];
        dark: Palette['primary'];
        third: Palette['primary'];
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        neutral?: PaletteOptions['primary'];
        dark?: PaletteOptions['primary'];
        third?: PaletteOptions['primary'];
    }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        neutral: true;
        dark: true;
        third: true;
    }
}

export function LayoutLight({ children }: { children: React.ReactElement }) {

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Box display="flex" justifyContent="space-between" width="100%">
                            <div>
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
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box className="container">
                {children}
            </Box>
            {/* <Footer /> */}
        </ThemeProvider>
    );
}
