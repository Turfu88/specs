import { Box, Breadcrumbs, Tab, Tabs, Typography } from '@mui/material';
import { Layout } from '../../common/components/Layout';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { getProjectDetails } from '../../common/api/project';
import { forwardRef, useEffect, useState } from 'react';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { Project } from '../../common/types';
import { ProjectSummaries } from '../Summary/ProjectSummaries';
import { ProjectContent } from './ProjectContent';
import { WorkInProgress } from './WorkInProgress';
import { ProjectValidations } from './ProjectValidations';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export function ProjectView() {
    const { uid } = useParams();
    const queryClient = useQueryClient();
    const { isLoading, data } = useQuery('getProjectDetails', () => getProjectDetails(uid));
    const project: Project = data || null;
    const [tabValue, setTabValue] = useState(0);
    const [invalidateQuery, setInvalidateQuery] = useState(false);

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    if (project) {
        localStorage.setItem('project', JSON.stringify(project.id));
    }

    function refreshConnectionDetails() {
        if (invalidateQuery) {
            queryClient.invalidateQueries(['getProjectDetails']);
            setInvalidateQuery(false);
        }
    }

    const breadcrumbs = [
        <Link key="1" color="inherit" to="/dashboard" className="link">
            Dashboard
        </Link>,
        <Typography key="3" component="span" variant="subtitle1">
            {project ? project.name : ''}
        </Typography>,
    ];

    useEffect(refreshConnectionDetails, [invalidateQuery])

    return (
        <Layout>
            {isLoading || !project?.pages ?
                <Box mt={20}>
                    <Typography component="h1" variant="subtitle1" textAlign="center" >Chargement...</Typography>
                </Box>
                :
                <Box mt={3}>
                    <Box display="flex" justifyContent="space-between">
                        <Breadcrumbs
                            separator="›"
                            aria-label="breadcrumb"
                        >
                            {breadcrumbs}
                        </Breadcrumbs>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={tabValue} centered onChange={handleChangeTab} aria-label="basic tabs example">
                                <Tab label="Contenu" {...a11yProps(0)} />
                                <Tab label="Evolution" {...a11yProps(1)} />
                                <Tab label="Résumés" {...a11yProps(2)} />
                                <Tab label="Tickets en cours" {...a11yProps(3)} />
                            </Tabs>
                        </Box>
                        {tabValue === 0 && <ProjectContent project={project} setInvalidateQuery={setInvalidateQuery} />}
                        {tabValue === 1 && <ProjectValidations project={project} />}
                        {tabValue === 2 && <ProjectSummaries project={project} />}
                        {tabValue === 3 && <WorkInProgress project={project} />}
                    </Box>
                </Box>
            }
        </Layout>
    );
}
