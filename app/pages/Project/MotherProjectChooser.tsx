import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, Typography } from "@mui/material";
import { MotherProject } from "../ProjectCore/defaultValues";

interface ElementChooserProps {
    motherProjects: MotherProject[],
    handleChangeMotherProject: (newValue: number) => void,
    motherProjectChoosed: number | undefined,
}

export function MotherProjectChooser(props: ElementChooserProps) {
    const { handleChangeMotherProject, motherProjects, motherProjectChoosed } = props;

    return (
        <>
            <Typography component='p' variant="h5" textAlign="center" mb={2}>
                Choix du projet mère
            </Typography>
            <Box sx={{ display: 'flex' }} className="border rounded px-4 py-2" mb={2}>
                <FormControl component="fieldset" variant="standard">
                    <RadioGroup>
                        {motherProjects.map((project, index) => (
                            <FormControlLabel key={index}
                                value={project.id}
                                control={
                                    <Radio checked={motherProjectChoosed === project.id} onChange={() => handleChangeMotherProject(project.id)} name={project.name} />
                                }
                                label={project.name}
                            />
                        ))}
                        <FormControlLabel
                            value={0}
                            control={
                                <Radio checked={motherProjectChoosed === 0} onChange={() => handleChangeMotherProject(0)} name={'no-project'} />
                            }
                            label={'Aucun'}
                        />
                    </RadioGroup>
                </FormControl>
            </Box>
        </>

    );
}
