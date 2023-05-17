import { useState } from "react";
import { Layout } from "../../common/components/Layout";
import { Box, Stepper, Step, StepLabel, Button } from "@mui/material";
import { SummaryStepperInformations } from "./SummaryStepperInformations";
import { useParams } from "react-router-dom";
import { getProjectDetails } from "../../common/api/project";
import { useQuery } from "react-query";
import { Project } from "../../common/types";
import { SummaryStepperContent } from "./SummaryStepperContent";

export interface SummaryForm {
    name: string,
    version: string,
}

const defaultFunnelSteps = [ 'Contenu', 'Informations ', 'Validation'];
const defaultSummaryForm = {
    name: '',
    version: ''
}

export function ProjectSummaryCreate() {
    const [activeSteps, setActiveSteps] = useState(defaultFunnelSteps);
    const [activeStep, setActiveStep] = useState(0);
    const [error, setError] = useState(true);
    const [formSummary, setFormSummary] = useState<SummaryForm>(defaultSummaryForm);
    const { uid } = useParams();
    const { isLoading, data } = useQuery('getProjectDetails', () => getProjectDetails(uid));
    const project: Project = data || null;

    const handleChangeFormSummary = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormSummary((prevFormSummary) => ({ ...prevFormSummary, [id]: value }));
        if (error === true && id === 'name' && value.length > 2) {
            setError(false);
        }
        if (error === false && id === 'name' && value.length <= 2) {
            setError(true);
        }
    };

    const handleNext = () => {   
        if (activeStep === 2) {
            console.log("création du projet");
            
            // createSummary({
            
            // }).then((response: any) => {
            //     if (200 === response.status) {
            //         // @TODO: open notification success: Le projet a été créé.
            //     } else {
            //         // @TODO: open notification error: Une erreur s'est produite. Le projet n'a pas pu être créé.
            //     }
            // });
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Layout>
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
                {activeStep === 0 && <SummaryStepperContent isLoading={isLoading} project={project} />}
                {activeStep === 1 && <SummaryStepperInformations formSummary={formSummary} handleChangeFormSummary={handleChangeFormSummary} />}
                {activeStep === 2 && <>Step 3</>}
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
            </Box>
        </Layout>
    );
}
