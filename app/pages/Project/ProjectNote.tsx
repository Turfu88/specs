import { Box, Typography } from "@mui/material";

export function ProjectNote() {

    return (
        <>
            <Typography component='p' variant="h5" textAlign="center" mt={4} mb={2}>
                Informations
            </Typography>
            <Box className="border rounded px-4 py-2" mb={2}>
                <Typography component='p' variant="subtitle1">
                    Note: Lors de la création d'un projet, vous pouvez lui faire hériter des propriétés d'un projet mère.
                </Typography>
            </Box>
        </>
    );
}
