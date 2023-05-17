import { Box, TextField, Typography } from "@mui/material";
import { DefaultProjectForm } from "./defaultValues";

interface CoreInformationsProps {
    formCore: DefaultProjectForm,
    handleChangeFormProject: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function CoreInformations(props: CoreInformationsProps) {
    const {formCore, handleChangeFormProject} = props; 

    return (
        <>
            <Typography component='p' variant="h5" textAlign="center" mb={2}>
                Informations du projet
            </Typography>
            <div>
                <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                    <TextField
                        id="name"
                        label="Nom du projet"
                        variant="outlined"
                        defaultValue={formCore.name}
                        onChange={handleChangeFormProject}
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
                        onChange={handleChangeFormProject}
                        fullWidth
                    />
                </Box>
                <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                    <TextField
                        id="comment"
                        label="Commentaire (optionnel)"
                        variant="outlined"
                        defaultValue={formCore.comment}
                        onChange={handleChangeFormProject}
                        fullWidth
                        multiline
                        minRows={2}
                    />
                </Box>
            </div>
        </>
    );
}
