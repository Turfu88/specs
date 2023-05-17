import { Box, Snackbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Layout } from '../../common/components/Layout';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useEffect, useState } from 'react';
import { ElementChooser } from './ElementChooser';
import { DefaultArea, DefaultElement, DefaultPage, DefaultProjectForm, DefaultStatus, defaultCoreForm, defaultElements, defaultPages, defaultStatus, steps } from './defaultValues';
import { PageChooser } from './PageChooser';
import { CoreInformations } from './CoreInformations';
import { CoreNote } from './CoreNote';
import { createCore } from '../../common/api/project';
import { AreaChooser } from './AreaChooser';
import { useQuery } from 'react-query';
import { getUserAreas } from '../../common/api/user';
import { Area } from '../../common/types';
import { StatusChooser } from './StatusChooser';

export function ProjectCore() {
    const [activeStep, setActiveStep] = useState(0);
    const [elements, setElements] = useState<DefaultElement[]>(defaultElements);
    const [status, setStatus] = useState<DefaultStatus[]>(defaultStatus);
    const [pages, setPages] = useState<DefaultPage[]>(defaultPages);
    const [formCore, setFormCore] = useState<DefaultProjectForm>(defaultCoreForm);
    const { isLoading, data: areasFound } = useQuery('getUserAreas', () => getUserAreas());    
    const userAreas = areasFound ? areasFound.map((area: Area) => { return {...area, choosed: true}}) : [];
    const [areas, setAreas] = useState<DefaultArea[]>([])
    const [error, setError] = useState(false);
    
    useEffect(() => {
        setAreas(userAreas);
    }, [isLoading]);
    
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
        setError(() => newValue.some((value) => !value.choosed))
    };

    const handleChangeElements = (event: React.ChangeEvent<HTMLInputElement>) => {
        setElements(() => elements.map((element) => {
            if (element.name === event.target.name) {
                return {
                    ...element, choosed: !element.choosed
                };
            }
            return element;
        }));
    };

    const handleChangeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(() => status.map((status) => {
            if (status.name === event.target.name) {
                return {
                    ...status, choosed: !status.choosed
                };
            }
            return status;
        }));
    };

    const handleChangePages = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPages(() => pages.map((page) => {
            if (page.name === event.target.name) {
                return {
                    ...page, choosed: !page.choosed
                };
            }
            return page;
        }));
    };

    const handleChangeFormProject = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value, event.target.id);
        const { id, value } = event.target;
        setFormCore((prevFormCore) => ({ ...prevFormCore, [id]: value }));
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (activeStep === 5) {
            createCore({
                elements, pages, form: formCore, areas
            }).then(response => {
                if (200 === response.status) {
                    window.location.replace('/dashboard');
                    // @TODO: open notification success: Le coeur a été créé.
                } else {
                    // @TODO: open notification error: Une erreur s'est produite. Le coeur n'a pas pu être créé.
                }
            });
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Layout>
            <>
                <Typography component="h1" variant="h4" textAlign="center" mt={4} mb={2}>Création d'un projet mère</Typography>
                <Box sx={{ width: '100%', mt: 4, mb: 8 }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => {
                            const stepProps: { completed?: boolean } = {};
                            const labelProps: { optional?: React.ReactNode } = {};

                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === 0 && <CoreNote />}
                    {activeStep === 1 && <AreaChooser areas={areas} handleChangeElements={handleChangeAreas} error={error} />}
                    {activeStep === 2 && <ElementChooser elements={elements} handleChangeElements={handleChangeElements} />}
                    {activeStep === 3 && <PageChooser pages={pages} handleChangePages={handleChangePages} />}
                    {activeStep === 4 && <StatusChooser statusChoices={status} handleChangeStatus={handleChangeStatus} />}
                    {activeStep === 5 && <CoreInformations formCore={formCore} handleChangeFormProject={handleChangeFormProject} />}
                    {activeStep === 6 && <Typography variant="subtitle1" component="p" sx={{ mt: 8, mb: 1, textAlign: "center" }}>Création du projet</Typography>}
                    {activeStep < 6 && (
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
                                {activeStep === steps.length - 1 ? 'Valider' : 'Suite'}
                            </Button>
                        </Box>
                    )}
                </Box>
            </>
        </Layout>
    );
}
