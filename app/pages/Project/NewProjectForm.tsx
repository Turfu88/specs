import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Layout } from '../../common/components/Layout';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useEffect, useState } from 'react';
import { DefaultArea, DefaultProjectForm, MotherProject, defaultProjectForm } from '../ProjectCore/defaultValues';
import { AreaChooser } from '../ProjectCore/AreaChooser';
import { useQuery, useQueryClient } from 'react-query';
import { getUserAreas } from '../../common/api/user';
import { Area, Connection, Element, Feature, Page } from '../../common/types';
import { MotherProjectChooser } from './MotherProjectChooser';
import { CoreInformations } from '../ProjectCore/CoreInformations';
import { ProjectRecap } from '../../common/components/projectStepper/ProjectRecap';
import { createProject, getProjectDetails } from '../../common/api/project';
import { ProjectStatusChooser } from './ProjectStatusChooser';
import { ProjectConnectionsChooser } from '../../common/components/projectStepper/ProjectConnectionsChooser';
import { ProjectElementsChooser } from '../../common/components/projectStepper/ProjectElementsChooser';
import { ConnectionSelect, ElementSelect, FeatureSelect, PageSelect, StatusSelect } from '../../common/components/projectStepper/types';
import { ProjectPagesChooser } from '../../common/components/projectStepper/ProjectPageChooser';
import { ProjectFeaturesChooser } from '../../common/components/projectStepper/ProjectFeaturesChooser';
import { ProjectCreationLoader } from '../../common/components/projectStepper/ProjectCreationLoader';
import { useNavigate } from 'react-router-dom';

export const defaultFunnelSteps = ['Choix du projet mère', '...']
export const longFunnelSteps = ['Choix du projet mère', 'Espaces', 'Status', 'Connexions', 'Eléments', 'Pages', 'Fonctionnalités', 'Informations du projet', 'Résumé'];
export const shortFunnelSteps = ['Choix du projet mère', 'Espaces', 'Informations du projet', 'Résumé'];

export function NewProjectForm() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [activeSteps, setActiveSteps] = useState(defaultFunnelSteps);
    const [activeStep, setActiveStep] = useState(0);
    const { isLoading, data: areasFound } = useQuery('getUserAreas', () => getUserAreas());
    const userAreas = areasFound ? areasFound.map((area: Area) => { return { ...area, choosed: false } }) : [];
    const [error, setError] = useState(false);
    const [motherProjects, setMotherProjects] = useState<MotherProject[]>([]);
    const [creationStatus, setCreationStatus] = useState(false);

    // Form
    const [areas, setAreas] = useState<DefaultArea[]>([]);
    const [statusChoosed, setStatusChoosed] = useState<StatusSelect[]>([]);
    const [connectionsChoosed, setConnectionsChoosed] = useState<ConnectionSelect[]>([]);
    const [elementsChoosed, setElementsChoosed] = useState<ElementSelect[]>([]);
    const [pagesChoosed, setPagesChoosed] = useState<PageSelect[]>([]);
    const [featuresChoosed, setFeaturesChoosed] = useState<FeatureSelect[]>([]);
    const [formProject, setFormProject] = useState<DefaultProjectForm>(defaultProjectForm);
    const [motherProjectChoosed, setMotherProjectChoosed] = useState<number | undefined>(undefined);

    useEffect(() => {
        setAreas(userAreas);
        getMotherProjects();
    }, [isLoading]);

    function getMotherProjects() {
        let projects: MotherProject[] = [];
        let projectIds: number[] = [];

        userAreas.forEach((area: any) => {
            area.projects.forEach((project: any) => {
                if (project.isCore && !projectIds.includes(project.id)) {
                    projectIds.push(project.id);
                    projects.push(project)
                }
            })
        })
        setMotherProjects(projects);
        setError(true); // Dois choisir un projet mère ou aucun
    }

    const handleChangeAreas = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = areas.map((area) => {
            if (area.name === event.target.name) {
                return {
                    ...area, choosed: !area.choosed
                };
            }
            return area;
        })
        setAreas(() => newValue);
        setError(() => !newValue.some((value) => value.choosed === true));
    };

    const handleChangeMotherProject = (newValue: number) => {
        setMotherProjectChoosed(newValue);
        setError(false);
    };

    const handleChangeElement = (event: React.ChangeEvent<HTMLInputElement>) => {
        setElementsChoosed(() => elementsChoosed.map((element) => {
            if (element.name === event.target.name) {
                return {
                    ...element, choosed: !element.choosed
                };
            }
            return element;
        }));
    };

    const handleChangeConnection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConnectionsChoosed(() => connectionsChoosed.map((connection) => {
            if (connection.name === event.target.name) {
                return {
                    ...connection, choosed: !connection.choosed
                };
            }
            return connection;
        }));
    };

    const handleChangePage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPagesChoosed(() => pagesChoosed.map((page) => {
            if (page.name === event.target.name) {
                return {
                    ...page, choosed: !page.choosed
                };
            }
            return page;
        }));
    };

    const handleChangeFeature = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFeaturesChoosed(() => featuresChoosed.map((feature) => {
            if (feature.name === event.target.name) {
                return {
                    ...feature, choosed: !feature.choosed
                };
            }
            return feature;
        }));
    };

    const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatusChoosed(() => statusChoosed.map((status: { label: string, color: string, choosed: boolean }) => {
            if (status.label === event.target.name) {
                return {
                    ...status, choosed: !status.choosed
                };
            }
            return status;
        }));
    };

    const handleChangeFormProject = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormProject((prevFormProject) => ({ ...prevFormProject, [id]: value }));
        if (error === true && id === 'name' && value.length > 2) {
            setError(false);
        }
        if (error === false && id === 'name' && value.length <= 2) {
            setError(true);
        }
    };

    const handleNext = () => {
        if (activeStep === 0) {
            setError(() => areas.some((value) => !value.choosed))
            if (motherProjectChoosed === 0) {
                setActiveSteps(shortFunnelSteps);
            } else {
                setActiveSteps(longFunnelSteps);
            }
        }
        if (activeStep === 0 && 0 !== motherProjectChoosed) {
            const motherProject = motherProjects.find((project) => project.id === motherProjectChoosed);
            getProjectDetails(motherProject?.uid).then((res) => {
                setStatusChoosed(() => res.statusChoices.map((status: string, index: number) => {
                    return { label: status, color: res.statusColors[index], choosed: true };
                }));
                setConnectionsChoosed(() => res.connections.map((connection: Connection) => {
                    return { ...connection, choosed: true };
                }));
                setElementsChoosed(() => res.elements.map((element: Element) => {
                    return { ...element, choosed: true };
                }));
                setPagesChoosed(() => res.pages.map((page: Page) => {
                    return { ...page, choosed: true };
                }));
                setFeaturesChoosed(() => res.features.map((feature: Feature) => {
                    return { ...feature, choosed: true };
                }));
            });
        }
        if (activeStep === 1 && 0 === motherProjectChoosed) {
            setError(true);
        }
        if (activeStep === 6 && 0 !== motherProjectChoosed) {
            setError(true);
        }
        if ((activeStep === 3 && 0 === motherProjectChoosed) || (activeStep === 8 && 0 !== motherProjectChoosed)) {
            createProject({
                elements: elementsChoosed,
                features: featuresChoosed,
                pages: pagesChoosed,
                form: formProject,
                connections: connectionsChoosed,
                status: statusChoosed,
                projectId: motherProjectChoosed as number,
                areas
            }).then((response: any) => {                
                if (200 === response.code) {
                    setCreationStatus(true);
                    queryClient.invalidateQueries(['getUserAreas']);
                    navigate(`/dashboard`);
                    // @TODO: open notification success: Le projet a été créé.
                } else {
                    // @TODO: open notification error: Une erreur s'est produite. Le projet n'a pas pu être créé.
                }
            });
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        if (activeStep === 1) {
            setActiveSteps(defaultFunnelSteps);
        }
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Layout>
            <>
                <Typography component="h1" variant="h4" textAlign="center" mt={4} mb={2}>Création d'un nouveau projet</Typography>
                <Box sx={{ width: '100%', mt: 4, mb: 8 }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {activeSteps.map((label) => {
                            const stepProps: { completed?: boolean } = {};
                            const labelProps: { optional?: React.ReactNode } = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {((activeStep < 4 && 0 === motherProjectChoosed) || (activeStep < 9 && 0 !== motherProjectChoosed)) && (
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                onClick={handleBack}
                                disabled={activeStep === 0}
                                sx={{ mr: 1 }}
                            >
                                Retour
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext} disabled={error}>
                                {activeStep === activeSteps.length - 1 ? 'Valider' : 'Suite'}
                            </Button>
                        </Box>
                    )}
                    {activeStep === 0 && <MotherProjectChooser handleChangeMotherProject={handleChangeMotherProject} motherProjects={motherProjects} motherProjectChoosed={motherProjectChoosed} />}
                    {activeStep === 1 && <AreaChooser areas={areas} handleChangeAreas={handleChangeAreas} error={error} />}
                    {activeStep === 2 && 0 === motherProjectChoosed && <CoreInformations formCore={formProject} handleChangeFormProject={handleChangeFormProject} />}
                    {activeStep === 3 && 0 === motherProjectChoosed &&
                        <ProjectRecap
                            formProject={formProject}
                            handleChangeFormProject={handleChangeFormProject}
                            motherProjectChoosed={motherProjectChoosed}
                            featuresChoosed={featuresChoosed}
                            pagesChoosed={pagesChoosed}
                            elementsChoosed={elementsChoosed}
                            connectionsChoosed={connectionsChoosed}
                            statusChoosed={statusChoosed}
                            areas={areas}
                        />
                    }
                    {activeStep === 4 && 0 === motherProjectChoosed && <ProjectCreationLoader creationStatus={creationStatus} />}
                    {activeStep === 2 && 0 !== motherProjectChoosed && <ProjectStatusChooser statusChoosed={statusChoosed} handleChangeStatus={handleChangeStatus} />}
                    {activeStep === 3 && 0 !== motherProjectChoosed && <ProjectConnectionsChooser connectionsChoosed={connectionsChoosed} handleChangeConnection={handleChangeConnection} />}
                    {activeStep === 4 && 0 !== motherProjectChoosed && <ProjectElementsChooser elements={elementsChoosed} handleChangeElement={handleChangeElement} />}
                    {activeStep === 5 && 0 !== motherProjectChoosed && <ProjectPagesChooser pagesChoosed={pagesChoosed} handleChangePage={handleChangePage} />}
                    {activeStep === 6 && 0 !== motherProjectChoosed && <ProjectFeaturesChooser featuresChoosed={featuresChoosed} handleChangeFeature={handleChangeFeature} />}
                    {activeStep === 7 && 0 !== motherProjectChoosed && <CoreInformations formCore={formProject} handleChangeFormProject={handleChangeFormProject} />}
                    {activeStep === 8 && 0 !== motherProjectChoosed &&
                        <ProjectRecap
                            formProject={formProject}
                            handleChangeFormProject={handleChangeFormProject}
                            motherProjectChoosed={motherProjectChoosed}
                            featuresChoosed={featuresChoosed}
                            pagesChoosed={pagesChoosed}
                            elementsChoosed={elementsChoosed}
                            connectionsChoosed={connectionsChoosed}
                            statusChoosed={statusChoosed}
                            areas={areas}
                        />
                    }
                    {activeStep === 9 && 0 !== motherProjectChoosed && <ProjectCreationLoader creationStatus={creationStatus} />}
                    {((activeStep < 4 && 0 === motherProjectChoosed) || (activeStep < 9 && 0 !== motherProjectChoosed)) && (
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                onClick={handleBack}
                                disabled={activeStep === 0}
                                sx={{ mr: 1 }}
                            >
                                Retour
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext} disabled={error}>
                                {activeStep === activeSteps.length - 1 ? 'Valider' : 'Suite'}
                            </Button>
                        </Box>
                    )}
                </Box>
            </>
        </Layout>
    );
}
