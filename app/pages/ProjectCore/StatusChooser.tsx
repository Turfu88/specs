import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { DefaultElement, DefaultStatus } from "./defaultValues";

interface ElementChooserProps {
    statusChoices: DefaultStatus[],
    handleChangeStatus: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function StatusChooser(props: ElementChooserProps) {
    const { handleChangeStatus, statusChoices } = props;

    return (
        <>
            <Typography component='p' variant="h5" textAlign="center" mt={4} mb={2}>
                Choisir les états possibles des specs, fonctionnalités, pages, résumés...
            </Typography>
            <Box sx={{ display: 'flex' }} className="border rounded px-4 py-2" mb={2}>
                <FormControl component="fieldset" variant="standard" style={{ width: '100%'}}>
                    <FormGroup>
                        {statusChoices.map((status, index) => (
                            <Box key={index} display="flex" justifyContent="space-between" mb={1}>
                                <FormControlLabel
                                    control={
                                        <Checkbox checked={status.choosed} onChange={handleChangeStatus} name={status.name} />
                                    }
                                    label={status.name}
                                />
                                <Typography
                                    component="span"
                                    variant="body1"
                                    className="border rounded p-2"
                                    style={{ backgroundColor: status.color }}
                                >
                                    {status.name}
                                </Typography>
                            </Box>
                        ))}
                    </FormGroup>
                </FormControl>
            </Box>
        </>

    );
}
