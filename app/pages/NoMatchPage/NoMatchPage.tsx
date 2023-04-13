import { Box, Typography } from "@mui/material";
import { Layout } from "../../common/components/Layout";
import { Link } from "react-router-dom";

export function NoMatchPage() {

    return (
        <Layout>
            <Box display="flex" justifyContent="center" mt={4} flexDirection="column" width="100%">
                <Typography component="h1" variant="h3" textAlign="center">404...</Typography>
                <Link to="/">
                    <Typography component="h2" variant="subtitle1" textAlign="center">
                        Retourner à l'écran principal
                    </Typography> 
                </Link>
            </Box>
        </Layout>
    );
}
