import { Box, TextField, Typography } from "@mui/material";
import { DefaultCoreForm } from "./defaultValues";

interface CoreInformationsProps {
    formCore: DefaultCoreForm,
    handleChangeFormCore: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function CoreInformations(props: CoreInformationsProps) {
    const {formCore, handleChangeFormCore} = props; 

    return (
        <>
            <Typography component='p' variant="h5" textAlign="center" mt={4} mb={2}>
                Dernière étape
            </Typography>
            <div>
                <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                    <TextField
                        id="name"
                        label="Nom du projet"
                        variant="outlined"
                        defaultValue={formCore.name}
                        onChange={handleChangeFormCore}
                        fullWidth
                        required
                    />
                </Box>
                <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                    <TextField
                        id="version"
                        label="Version (optionnel)"
                        variant="outlined"
                        defaultValue={formCore.version}
                        onChange={handleChangeFormCore}
                        fullWidth
                    />
                </Box>
                <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                    <TextField
                        id="comment"
                        label="Commentaire (optionnel)"
                        variant="outlined"
                        defaultValue={formCore.comment}
                        onChange={handleChangeFormCore}
                        fullWidth
                        multiline
                        minRows={2}
                    />
                </Box>
            </div>
        </>
    );
}
