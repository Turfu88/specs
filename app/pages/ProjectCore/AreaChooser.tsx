import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { DefaultArea } from "./defaultValues";

interface AreaChooserProps {
    areas: DefaultArea[],
    handleChangeElements: (event: React.ChangeEvent<HTMLInputElement>) => void,
    error: boolean
}

export function AreaChooser(props: AreaChooserProps) {
    const { handleChangeElements, areas, error } = props;

    return (
        <>
            <Typography component='p' variant="h5" textAlign="center" mt={4} mb={2}>
                Choisir le(s) espace(s) qui vont inclure ce projet
            </Typography>
            {error &&
                <Typography component='p' variant="body1" textAlign="center" mt={2} mb={2} className="text-danger">
                    Vous devez choisir au moins un espace
                </Typography>
            }
            
            <Box sx={{ display: 'flex' }} className="border rounded px-4 py-2" mb={2} mt={error ? 0 : 7}>
                <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                        {areas.map((area, index) => (
                            <FormControlLabel key={index}
                                control={
                                    <Checkbox checked={area.choosed} onChange={handleChangeElements} name={area.name} />
                                }
                                label={area.name}
                            />
                        ))}
                    </FormGroup>
                </FormControl>
            </Box>
        </>

    );
}
