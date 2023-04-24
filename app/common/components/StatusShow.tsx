import { Typography } from "@mui/material";
import { Project } from "../types";
import { useQuery } from "react-query";
import { getProjectDetails } from "../api/project";
import { getColorFromStatus } from "../helpers/projectHelper";

interface StatusShowProps {
    status: string
}

export function StatusShow(props: StatusShowProps) {
    const { status } = props;
    const { isLoading, data: data } = useQuery('getProjectDetails', () => getProjectDetails(localStorage.getItem('project')));
    const project: Project = data || null;

    if (isLoading) {
        return (
            <Typography
                component="span"
                variant="body1"
                className="border rounded p-2"
            >
                ...
            </Typography>
        );
    }
    
    if (null === status || '' === status) {
        return (
            <Typography component="span" variant="body1">
                Status indéfini
            </Typography>
        );
    }

    return (
        <Typography
            component="span"
            variant="body1"
            className="border rounded p-2"
            style={{ backgroundColor: getColorFromStatus(status, project) }}
        >
            {status}
        </Typography>
    );
}
