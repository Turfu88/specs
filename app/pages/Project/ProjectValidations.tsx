import { Box, Divider, LinearProgress, LinearProgressProps, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { PageThumbnail } from './PageThumbnail';
import { forwardRef, useState } from 'react';

import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import { Project } from '../../common/types';
import { getColorFromStatus } from '../../common/helpers/projectHelper';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

interface ProjectContentProps {
    project: Project
}

export function ProjectValidations(props: ProjectContentProps) {
    const { project } = props;

    console.log(project);

    if (localStorage.getItem('page')) {
        localStorage.removeItem('page');
    }

    if (project) {
        localStorage.setItem('project', JSON.stringify(project.id));
    }

    function getProgress() {
        // TODO:
    }

    return (
        <>
            <Box mt={2} mb={10}>
                <Typography component="h1" variant="h3" textAlign="center">Validations</Typography>
                <Typography component="h2" variant="h5" mt={4}>Pages</Typography>
                {project.pages.map((page, index) => (
                    <Box key={index} mt={2} display="flex" justifyContent="space-between" alignItems="center">
                        <Box sx={{ width: '50%' }} display="flex" alignItems="center" gap={2}>
                            <Typography component="p" variant="body1">
                                {page.name}
                            </Typography>
                        </Box>
                        <Box sx={{ width: '50%' }}>
                            <LinearProgressWithLabel value={10} />
                        </Box>
                    </Box>
                ))}
                <Typography component="h2" variant="h5" mt={4}>Fonctionnalités</Typography>
                {project.features.map((feature, index) => (
                    <Box key={index} mt={2} display="flex" justifyContent="space-between" alignItems="center">
                        <Box sx={{ width: '50%' }} display="flex" alignItems="center" gap={2}>
                            <Typography component="p" variant="body1">
                                {feature.name}
                            </Typography>
                        </Box>
                        <Box sx={{ width: '50%' }}>
                            <LinearProgressWithLabel value={10} />
                        </Box>
                    </Box>
                ))}
                <Typography component="h2" variant="h5" mt={4}>Specs</Typography>
                {project.specs.map((spec, index) => (
                    <Box key={index} mt={2} display="flex" justifyContent="space-between" alignItems="center">
                        <Box sx={{ width: '50%' }} display="flex" alignItems="center" gap={2}>
                            <Typography component="p" variant="body1">
                                {spec.name}
                            </Typography>
                        </Box>
                        <Box sx={{ width: '50%' }}>
                            <LinearProgressWithLabel value={10} />
                        </Box>
                    </Box>
                ))}
                <Typography component="h2" variant="h5" mt={4}>Connections</Typography>
                {project.connections.map((connection, index) => (
                    <Box key={index} mt={2} display="flex" justifyContent="space-between" alignItems="center">
                        <Box sx={{ width: '50%' }} display="flex" alignItems="center" gap={2}>
                            <Typography component="p" variant="body1">
                                {connection.name}
                            </Typography>
                        </Box>
                        <Box sx={{ width: '50%' }}>
                            <LinearProgressWithLabel value={10} />
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    );
}
