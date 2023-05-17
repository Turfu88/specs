import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { PageSelect } from "./types";

interface ProjectPagesChooserProps {
    pagesChoosed: PageSelect[],
    handleChangePage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function ProjectPagesChooser(props: ProjectPagesChooserProps) {
    const { handleChangePage, pagesChoosed } = props;    

    return (
        <>
            <Typography component='p' variant="h5" textAlign="center" mb={2}>
                Choisir les pages qui vont s'ajouter au projet
            </Typography>
            <Box sx={{ display: 'flex' }} className="border rounded px-4 py-2" mb={2}>
                <FormControl component="fieldset" variant="standard">
                    <FormGroup>
                        {pagesChoosed.map((page, index) => (
                            <FormControlLabel key={index}
                                control={
                                    <Checkbox checked={page.choosed} onChange={handleChangePage} name={page.name} />
                                }
                                label={page.name}
                            />
                        ))}
                    </FormGroup>
                </FormControl>
            </Box>
        </>
    );
}
