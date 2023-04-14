import { Box, Snackbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Layout } from '../../common/components/Layout';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useState } from 'react';
import { ElementChooser } from './ElementChooser';
import { DefaultElement, DefaultPage, defaultCoreForm, defaultElements, defaultPages, steps } from './defaultValues';
import { PageChooser } from './PageChooser';
import { CoreInformations } from './CoreInformations';
import { CoreNote } from './CoreNote';
import { createCore } from '../../common/api/project';
import { getAccountId } from '../../common/api/account';

export function ProjectCore() {
    const [activeStep, setActiveStep] = useState(0);
    const [elements, setElements] = useState<DefaultElement[]>(defaultElements);
    const [pages, setPages] = useState<DefaultPage[]>(defaultPages);
    const [formCore, setFormCore] = useState<DefaultCoreForm>(defaultCoreForm);

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

    const handleChangePages = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPages(() => pages.map((element) => {
            if (element.name === event.target.name) {
                return {
                    ...element, choosed: !element.choosed
                };
            }
            return element;
        }));
    };

    interface DefaultCoreForm {
        name: string,
        version: string,
        comment: string
    }

    const handleChangeFormCore = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value, event.target.id);
        const { id, value } = event.target;
        setFormCore((prevFormCore) => ({ ...prevFormCore, [id]: value }));
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        const account = getAccountId();
        if (activeStep === 3 && null !== account) {
            createCore({
                elements, pages, form: formCore, account
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
                <Typography component="h1" variant="h4" textAlign="center" mt={4} mb={2}>Création du coeur</Typography>

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
                    {activeStep === 1 && <ElementChooser elements={elements} handleChangeElements={handleChangeElements} />}
                    {activeStep === 2 && <PageChooser pages={pages} handleChangePages={handleChangePages} />}
                    {activeStep === 3 && <CoreInformations formCore={formCore} handleChangeFormCore={handleChangeFormCore} />}
                    {activeStep === 4 && <Typography variant="subtitle1" component="p" sx={{ mt: 8, mb: 1, textAlign: "center" }}>Création du coeur</Typography>}
                    {activeStep < 4 && (
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
                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Valider' : 'Suite'}
                            </Button>
                        </Box>
                    )}
                </Box>
            </>
        </Layout>
    );
}
