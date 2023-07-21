import { Box, Button, Dialog, DialogActions, DialogTitle, Grid, Typography } from "@mui/material";
import { Validation } from "../types";
import { useState } from "react";
import { getUserId } from "../api/user";

interface ValidationBlockProps {
    validators: number | null,
    validations: Validation[],
    element: string,
    sendValidation: (status: boolean, type: string, validationToRemove: number | null) => void
}

export function ValidationBlock(props: ValidationBlockProps) {
    const { validators, validations, sendValidation, element } = props;
    const [openDialog, setOpenDialog] = useState(false);
    const [validation, setValidation] = useState(false);
    const [selectedType, setSelectedType] = useState('');
    const [validationToRemove, setValidationToRemove] = useState<number | null>(null);

    function handleClickOpen(status: boolean, type: string, idToRemove?: number) {
        setValidation(status);
        setSelectedType(type);
        idToRemove ? setValidationToRemove(idToRemove) : setValidationToRemove(null);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    function handleConfirm() {
        sendValidation(validation, selectedType, validationToRemove);
        handleClose();
    }

    if (null === validators) {
        return (
            <Typography component="div" variant="body1" textAlign="center" mt={2} mb={4}>
                Pas de validation mise en place sur ce projet
            </Typography>
        );
    }
    
    const blockLength = 12 / validators;
    const userId = getUserId();
    const specificationValidatedByUser = validations.filter((validation) => validation.type === 'specification' && validation.userId === userId);
    const specificationValidatedByOthers = validations.filter((validation) => validation.type === 'specification' && validation.userId !== userId).length;
    const specificationValidationsOK = validations.length - (1 === specificationValidatedByUser.length ? 1 : 0);
    const specificationValidationNotOk = validators - 1 - specificationValidatedByOthers;

    const specificationsValidatedByAllUser = validations.filter((validation) => validation.type === 'rendering').length === validators;

    const renderingValidatedByUser = validations.filter((validation) => validation.type === 'rendering' && validation.userId === userId);
    const renderingValidatedByOthers = validations.filter((validation) => validation.type === 'rendering' && validation.userId !== userId).length;
    const renderingValidationsOK = validations.length - (renderingValidatedByUser.length ? 1 : 0);
    const renderingValidationNotOk = validators - 1 - renderingValidatedByOthers;

    return (
        <Box mb={4}>
            <Typography component="h4" variant="h5" textAlign="center" mt={2}>
                Spécification
            </Typography>
            <Grid container spacing={2}>
                {specificationValidatedByUser.length === 1 ?
                    <Grid item xs={blockLength}>
                        <Typography component='div' variant='body1' className="border rounded p-2 pointer" textAlign="center" style={{ backgroundColor: 'green', height: '80px' }} onClick={() => handleClickOpen(false, 'specification', specificationValidatedByUser[0].id)}>
                            Validé
                        </Typography>
                    </Grid>
                    :
                    <Grid item xs={blockLength}>
                        <Typography component='div' variant='body1' className="border rounded p-2 pointer" textAlign="center" style={{ backgroundColor: 'grey', height: '80px' }} onClick={() => handleClickOpen(true, 'specification')}>
                            Non validé
                        </Typography>
                    </Grid>
                }
                {Array.from(Array(specificationValidationsOK).keys()).map((index) => (
                    <Grid item xs={blockLength} key={index}>
                        <Typography component='div' variant='body1' className="border rounded p-2" textAlign="center" style={{ backgroundColor: 'green', height: '80px' }}>
                            Validé
                        </Typography>
                    </Grid>
                ))}
                {Array.from(Array(specificationValidationNotOk).keys()).map((index) => (
                    <Grid item xs={blockLength} key={index}>
                        <Typography component='div' variant='body1' className="border rounded p-2" textAlign="center" style={{ backgroundColor: 'grey', height: '80px' }}>
                            Validation nécessaire
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            <Typography component="h4" variant="h5" textAlign="center" mt={2}>
                Rendu
            </Typography>
            {specificationsValidatedByAllUser ?
                <Grid container spacing={2}>
                    {renderingValidatedByUser ?
                        <Grid item xs={blockLength}>
                            <Typography component='div' variant='body1' className="border rounded p-2 pointer" textAlign="center" style={{ backgroundColor: 'green', height: '80px' }} onClick={() => handleClickOpen(false, 'rendering', renderingValidatedByUser[0].id)}>
                                Validé
                            </Typography>
                        </Grid>
                        :
                        <Grid item xs={blockLength}>
                            <Typography component='div' variant='body1' className="border rounded p-2 pointer" textAlign="center" style={{ backgroundColor: 'grey', height: '80px' }} onClick={() => handleClickOpen(true, 'rendering')}>
                                Non validé
                            </Typography>
                        </Grid>
                    }
                    {Array.from(Array(renderingValidationsOK).keys()).map((index) => (
                        <Grid item xs={blockLength} key={index}>
                            <Typography component='div' variant='body1' className="border rounded p-2" textAlign="center" style={{ backgroundColor: 'green', height: '80px' }}>
                                Validé
                            </Typography>
                        </Grid>
                    ))}
                    {Array.from(Array(renderingValidationNotOk).keys()).map((index) => (
                        <Grid item xs={blockLength} key={index}>
                            <Typography component='div' variant='body1' className="border rounded p-2" textAlign="center" style={{ backgroundColor: 'grey', height: '80px' }}>
                                Validation nécessaire
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
                :
                <Grid container spacing={2}>
                    {Array.from(Array(validators).keys()).map((index) => (
                        <Grid item xs={blockLength} key={index}>
                            <Typography component='div' variant='body1' className="border rounded p-2" textAlign="center" style={{ backgroundColor: 'grey', height: '80px' }}>
                                Validation nécessaire
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            }

            <Dialog
                open={openDialog}
                onClose={handleClose}
            >
                <DialogTitle>
                    {validation ? `Valider cette ${element} ?` : `Retirer la validation de cette ${element} ?`}
                </DialogTitle>
                <DialogActions>
                    <Box display="flex" justifyContent="space-around" width={'100%'}>
                        <Button onClick={handleConfirm} variant="outlined">
                            Oui
                        </Button>
                        <Button onClick={handleClose} variant="outlined">
                            Non
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
