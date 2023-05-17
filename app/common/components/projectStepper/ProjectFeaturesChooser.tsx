import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { FeatureSelect } from "./types";

interface ProjectFeaturesChooserProps {
    featuresChoosed: FeatureSelect[],
    handleChangeFeature: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function ProjectFeaturesChooser(props: ProjectFeaturesChooserProps) {
    const { handleChangeFeature, featuresChoosed } = props;    

    return (
        <>
            <Typography component='h1' variant="h5" textAlign="center" mb={2}>
                Choisir les fonctionnalités qui vont s'ajouter au projet
            </Typography>
            <Box sx={{ display: 'flex' }} className="border rounded px-4 py-2" mb={2}>
                <FormControl component="fieldset" variant="standard">
                    <Typography mt={2} component="h2" variant="h6">Fonctionnalités globales</Typography>
                    <FormGroup>
                        {featuresChoosed.filter((feature) => feature.hasPage).map((feature, index) => (
                            <FormControlLabel key={index}
                                control={
                                    <Checkbox checked={feature.choosed} onChange={handleChangeFeature} name={feature.name} />
                                }
                                label={feature.name}
                            />
                        ))}
                    </FormGroup>
                    <Typography mt={2} component="h2" variant="h6">Fonctionnalités liées à une page</Typography>
                    <FormGroup>
                        {featuresChoosed.filter((feature) => !feature.hasPage).map((feature, index) => (
                            <FormControlLabel key={index}
                                control={
                                    <Checkbox checked={feature.choosed} onChange={handleChangeFeature} name={feature.name} />
                                }
                                label={feature.name}
                            />
                        ))}
                    </FormGroup>
                </FormControl>
            </Box>
        </>
    );
}
