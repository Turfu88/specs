import { Box, Divider, Typography } from '@mui/material';
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

interface ProjectContentProps {
    project: Project
}

export function WorkInProgress(props: ProjectContentProps) {
    const { project } = props;

    if (localStorage.getItem('page')) {
        localStorage.removeItem('page');
    }

    if (project) {
        localStorage.setItem('project', JSON.stringify(project.id));
    }

    return (
        <>
            <Box mt={2} mb={10}>
                <Typography component="h1" variant="h3" textAlign="center">Tickets en cours</Typography>
                <Typography component="h2" variant="h5" mt={4}>Pages</Typography>
                {project.pages.map((page, index) => (
                    <Box key={index} mt={2} display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center" gap={2}>
                            <Typography component="p" variant="body1">
                                {page.name}
                            </Typography>
                        </Box>
                        {page.status ?
                            <Typography
                                component="span"
                                variant="body1"
                                className="border rounded p-2"
                                style={{ backgroundColor: getColorFromStatus(page.status, project) }}
                            >
                                {page.status}
                            </Typography>
                            :
                            <>
                                Status indéfini
                            </>
                        }
                    </Box>
                ))}
                <Typography component="h2" variant="h5" mt={4}>Fonctionnalités</Typography>
                {project.features.map((feature, index) => (
                    <Box key={index} mt={2} display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center" gap={2}>
                            <Typography component="p" variant="body1">
                                {feature.name}
                            </Typography>
                        </Box>
                        {feature.status ?
                            <Typography
                                component="span"
                                variant="body1"
                                className="border rounded p-2"
                                style={{ backgroundColor: getColorFromStatus(feature.status, project) }}
                            >
                                {feature.status}
                            </Typography>
                            :
                            <>
                                Status indéfini
                            </>
                        }
                    </Box>
                ))}
                <Typography component="h2" variant="h5" mt={4}>Specs</Typography>
                {project.specs.map((spec, index) => (
                    <Box key={index} mt={2} display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center" gap={2}>
                            <Typography component="p" variant="body1">
                                {spec.name}
                            </Typography>
                        </Box>
                        {spec.status ?
                            <Typography
                                component="span"
                                variant="body1"
                                className="border rounded p-2"
                                style={{ backgroundColor: getColorFromStatus(spec.status, project) }}
                            >
                                {spec.status}
                            </Typography>
                            :
                            <>
                                Status indéfini
                            </>
                        }
                    </Box>
                ))}
                <Typography component="h2" variant="h5" mt={4}>Connections</Typography>
                {project.connections.map((connection, index) => (
                    <Box key={index} mt={2} display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center" gap={2}>
                            <Typography component="p" variant="body1">
                                {connection.name}
                            </Typography>
                        </Box>
                        {connection.status ?
                            <Typography
                                component="span"
                                variant="body1"
                                className="border rounded p-2"
                                style={{ backgroundColor: getColorFromStatus(connection.status, project) }}
                            >
                                {connection.status}
                            </Typography>
                            :
                            <>
                                Status indéfini
                            </>
                        }
                    </Box>
                ))}
            </Box>
        </>
    );
}
