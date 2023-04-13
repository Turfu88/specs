import { Box } from '@mui/material';
import { Header } from './Header';
import { Footer } from './Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';


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

export function Layout({ children }: { children: React.ReactElement }) {

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <Box className="container">
                {children}
            </Box>
            {/* <Footer /> */}
        </ThemeProvider>
    );
}
