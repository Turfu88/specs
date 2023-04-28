import { Box, Typography } from "@mui/material";

export function CoreNote() {

    return (
        <>
            <Typography component='p' variant="h5" textAlign="center" mt={4} mb={2}>
                Informations
            </Typography>
            <Box className="border rounded px-4 py-2" mb={2}>
                <Typography component='p' variant="subtitle1">
                    Note: La création d'un projet mère permet de créer une base qui pourra ensuite être utilisée sur d'autres projets.
                    Les étapes suivantes vont vous servir à démarrer la création du projet mère avec quelques suggestions.
                </Typography>
            </Box>
        </>
    );
}
