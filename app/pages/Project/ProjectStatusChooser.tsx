import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from "@mui/material";

interface ProjectStatusChooserProps {
    statusChoosed: { label: string, color: string, choosed: boolean }[],
    handleChangeStatus: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function ProjectStatusChooser(props: ProjectStatusChooserProps) {
    const { handleChangeStatus, statusChoosed } = props;
    
    return (
        <>
            <Typography component='p' variant="h5" textAlign="center" mb={2}>
                Choisir les status que vous souhaitez ajouter au projet
            </Typography>
            <Box sx={{ display: 'flex' }} className="border rounded px-4 py-2" mb={2}>
                <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                        {statusChoosed.map((status, index) => (
                            <Box key={index} display="flex" justifyContent="space-between" mb={1}>
                                <FormControlLabel key={index}
                                    control={
                                        <Checkbox checked={status.choosed} onChange={handleChangeStatus} name={status.label} />
                                    }
                                    label={status.label}
                                />
                                <Typography
                                    component="span"
                                    variant="body1"
                                    className="border rounded p-2"
                                    style={{ backgroundColor: status.color }}
                                >
                                    {status.label}
                                </Typography>
                            </Box>
                        ))}
                    </FormGroup>
                </FormControl>
            </Box>
        </>

    );
}
