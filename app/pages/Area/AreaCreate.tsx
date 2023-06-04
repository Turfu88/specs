import { useForm } from "@mantine/form";
import { Area, Project } from "../../common/types";
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { createArea } from "../../common/api/area";
import { Layout } from "../../common/components/Layout";
import { getUserAreas, getUserId } from "../../common/api/user";
import { useQuery } from "react-query";
import StarIcon from '@mui/icons-material/Star';
import { useState } from "react";

export interface EditAreaForm {
    name: string,
}

export function AreaCreate() {

    const { isLoading, data: areas } = useQuery('getUserAreas', () => getUserAreas());
    const userAreas = areas || null;

    let projects: Project[] = [];
    const [selectedProjects, setSelectedProjects] = useState<number[]>([]);

    if (areas) {
        areas.forEach((area: Area) => {
            area.projects.forEach((project: Project) => {
                if (!projects.includes(project)) {
                    projects.push(project);
                }
            })
        });
    }

    const formArea = useForm({
        initialValues: {
            name: '',
            userId: getUserId()
        } as EditAreaForm,
        validate: {
            name: (value) => (value.length < 2 ? 'Le nom de l\'espace est trop court' : null),
        },
    });

    function toggleProject(id: number) {
        if (selectedProjects.includes(id)) {
            setSelectedProjects(selectedProjects.filter((project) => project !== id));
        } else {
            setSelectedProjects([...selectedProjects, id]);
        }
    }

    function handleCreateArea(values: EditAreaForm) {
        console.log({...values, selectedProjects});
        
        createArea({...values, selectedProjects}).then(() => {
            console.log("created");
        });
    }

    return (
        <Layout>
            <Box mt={8} mb={8}>
                <Typography component="h1" variant="h4" textAlign="center">
                    Créer un nouvel espace
                </Typography>
                <form onSubmit={formArea.onSubmit((values) => handleCreateArea(values))}>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="name"
                            label="Nom de l'espace"
                            name="name"
                            variant="outlined"
                            fullWidth
                            {...formArea.getInputProps('name')}
                            error={formArea.errors.name ? true : false}
                            helperText={formArea.errors.name}
                        />
                    </Box>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <Typography component="h2" variant="h4" mt={4} mb={2}>
                            Projets à inclure
                        </Typography>
                    </Box>

                    {projects.map((project: Project, index: number) => (
                        <Box key={index} className="d-flex justify-content-between align-items-center mw-75 m-auto">
                            <FormControlLabel
                                control={
                                    <Checkbox name={project.name} onChange={() => toggleProject(project.id)}/>
                                }
                                label={project.name}
                            />
                            {project.isCore &&
                                <StarIcon />
                            }
                        </Box>
                    ))}

                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <Button
                            type="submit"
                            variant="contained"
                            size='large'
                        >
                            Créer
                        </Button>
                    </Box>
                </form>
            </Box>
        </Layout>
    );
}
