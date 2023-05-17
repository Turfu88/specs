import { Box, TextField, Typography } from "@mui/material";
import { SummaryForm } from "./ProjectSummaryCreate";

interface SummaryStepperInformationsProps {
    formSummary: SummaryForm,
    handleChangeFormSummary: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function SummaryStepperInformations(props: SummaryStepperInformationsProps) {
    const {formSummary, handleChangeFormSummary} = props; 

    return (
        <>
            <Typography component='p' variant="h5" textAlign="center" mt={4} mb={2}>
                Informations du résumé
            </Typography>
            <div>
                <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                    <TextField
                        id="name"
                        label="Nom du résumé"
                        variant="outlined"
                        defaultValue={formSummary.name}
                        onChange={handleChangeFormSummary}
                        fullWidth
                        required
                    />
                </Box>
                <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                    <TextField
                        id="version"
                        label="Version (optionnel)"
                        variant="outlined"
                        defaultValue={formSummary.version}
                        onChange={handleChangeFormSummary}
                        fullWidth
                    />
                </Box>
            </div>
        </>
    );
}
