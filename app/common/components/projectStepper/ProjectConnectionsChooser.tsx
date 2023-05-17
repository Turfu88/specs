import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from "@mui/material";

interface ProjectConnectionsChooserProps {
    connectionsChoosed: { name: string, choosed: boolean }[],
    handleChangeConnection: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function ProjectConnectionsChooser(props: ProjectConnectionsChooserProps) {
    const { handleChangeConnection, connectionsChoosed } = props;

    return (
        <>
            <Typography component='p' variant="h5" textAlign="center" mb={2}>
                Choisir les connexions que vous souhaitez ajouter au projet
            </Typography>
            <Box sx={{ display: 'flex' }} className="border rounded px-4 py-2" mb={2}>
                <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                        {connectionsChoosed.map((connection, index) => (
                            <FormControlLabel key={index}
                                control={
                                    <Checkbox checked={connection.choosed} onChange={handleChangeConnection} name={connection.name} />
                                }
                                label={connection.name}
                            />
                        ))}
                    </FormGroup>
                </FormControl>
            </Box>
        </>

    );
}
