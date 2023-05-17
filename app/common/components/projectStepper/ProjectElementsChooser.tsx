import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { ElementSelect } from "./types";

interface ElementChooserProps {
    elements: ElementSelect[],
    handleChangeElement: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function ProjectElementsChooser(props: ElementChooserProps) {
    const { handleChangeElement, elements } = props;    

    return (
        <>
            <Typography component='p' variant="h5" textAlign="center" mb={2}>
                Choisir les éléments qui vont s'ajouter au projet
            </Typography>
            <Box sx={{ display: 'flex' }} className="border rounded px-4 py-2" mb={2}>
                <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                        {elements.map((element, index) => (
                            <FormControlLabel key={index}
                                control={
                                    <Checkbox checked={element.choosed} onChange={handleChangeElement} name={element.name} />
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
