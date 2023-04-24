import { useQuery } from "react-query";
import { Project } from "../types";
import { getProjectDetails } from "../api/project";
import { Box, Typography } from "@mui/material";

interface StatusChooserProps {
    currentStatus: string | null,
    handleChooseStatus: (status: string) => void
}

export function StatusChooser(props: StatusChooserProps) {
    const { currentStatus, handleChooseStatus } = props;
    
    const { isLoading, data } = useQuery('getProjectDetails', () => getProjectDetails(localStorage.getItem('project')));
    const project: Project = data || null;
    let statusChoices: { status: string; color: string; }[] = [];
    if (project !== null) {
        statusChoices = project.statusChoices.map((choice: string, index: number) => {
            return {
                status: project.statusChoices[index],
                color: project.statusColors[index]
            };
        });
    }

    if (isLoading) {
        return (
             <Typography component="div" variant="body1" textAlign="center" mt={4}>
                Chargement des status...
            </Typography>
        );
    }

    return (
        <>
            {statusChoices.length === 0 ?
                <Typography component="div" variant="body1" textAlign="center" mt={4}>
                    Pas de status enregistré. Vous pouvez ajouter et personnaliser les status dans les options du projet
                </Typography>
                :
                <Box display="flex" justifyContent="center" gap={2}>
                    {statusChoices.map((choice: { status: string, color: string }, index: number) => (
                        <Box
                            className={currentStatus === choice.status ? 'border border-danger rounded p-1 pointer' : 'p-1 pointer'}
                            onClick={() => handleChooseStatus(choice.status)}
                            key={index}
                        >
                            <Box className="border rounded p-2" style={{ backgroundColor: choice.color }}>
                                <Typography textAlign="center">
                                    {choice.status}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            }
        </>
    );
}
