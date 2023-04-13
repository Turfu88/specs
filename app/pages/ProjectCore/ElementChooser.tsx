import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Typography } from "@mui/material";
import { DefaultElement } from "./defaultValues";

interface ElementChooserProps {
    elements: DefaultElement[],
    handleChangeElements: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function ElementChooser(props: ElementChooserProps) {
    const { handleChangeElements, elements } = props;

    return (
        <>
            <Typography component='p' variant="h5" textAlign="center" mt={4} mb={2}>
                Choisir les éléments qui vont constituer le coeur
            </Typography>
            <Box sx={{ display: 'flex' }} className="border rounded px-4 py-2" mb={2}>
                <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                        {elements.map((element, index) => (
                            <FormControlLabel key={index}
                                control={
                                    <Checkbox checked={element.choosed} onChange={handleChangeElements} name={element.name} />
                                }
                                label={element.name}
                            />
                        ))}
                    </FormGroup>
                </FormControl>
            </Box>
        </>

    );
}
