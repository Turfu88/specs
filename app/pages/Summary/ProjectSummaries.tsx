import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Project } from '../../common/types';

interface ProjectSummariesProps {
    project: Project
}

export function ProjectSummaries(props: ProjectSummariesProps) {
    const {project} = props;

    return (
        <Box className="mt-4">
            <Typography component="h1" variant="h4" textAlign="center">Résumés</Typography>
            <Box mt={2} display="flex" justifyContent="center">
                <Link to={`/projet/${project.uid}/nouveau-resume`}>
                    <Button variant="contained">
                        Créer un nouveau résumé
                    </Button>
                </Link>
            </Box>
        </Box>
    );
}
