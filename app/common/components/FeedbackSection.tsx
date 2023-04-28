import { Box, Button, Dialog, Divider, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slide, TextField, Typography } from "@mui/material";
import { Feedback, FeedbackType } from "../types";
import { forwardRef, useState } from "react";
import { useForm } from "@mantine/form";
import { StatusChooser } from "./StatusChooser";
import { createFeedback } from "../api/feedback";
import { getUserId } from "../api/user";
import { StatusShow } from "./StatusShow";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { TransitionProps } from "@mui/material/transitions";
import { FeedbackEdit } from "./FeedbackEdit";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export interface CreateFeedbackForm {
    content: string,
    toTreat: boolean,
    status: string,
    projectId: number,
    parentId: number,
    feedbackType: FeedbackType,
    userId: number | null
}

interface FeedbackSectionProps {
    feedbacks: Feedback[],
    projectId: number,
    feedbackType: FeedbackType,
    parentId: number
}

export function FeedbackSection(props: FeedbackSectionProps) {
    const { feedbacks, projectId, parentId, feedbackType } = props;
    const [openFeedback, setOpenFeedback] = useState<boolean>(false);
    const [toTreat, setToTreat] = useState<boolean>(false);
    const user = getUserId();
    const [dialog, setDialog] = useState(false);
    const [invalidateQuery, setInvalidateQuery] = useState(false);
    const [feedbackToSet, setFeedbackToSet] = useState<Feedback | null>(null);

    const handleCloseDialog = () => {
        setDialog(false);
        setFeedbackToSet(null);
    };

    function handleOpenDialog(feedback: Feedback) {
        setFeedbackToSet(feedback);
        setDialog(true);
    }

    const formFeedback = useForm({
        initialValues: {
            content: '',
            toTreat: false,
            status: '',
        } as CreateFeedbackForm,
        validate: {
            content: (value) => (value.length < 2 ? 'Le commentaire est incomplet' : null),
        },
    });

    function handleCreateFeedback(values: CreateFeedbackForm) {
        console.log({ ...values, toTreat, feedbackType, projectId, parentId });
        createFeedback({ ...values, toTreat, feedbackType, projectId, parentId, userId: getUserId() });
    }

    // @TODO: A mettre dans un helper
    function getDateTime(date: string): string {
        const dateTime = new Date(date);
        const jour = dateTime.getDate().toString().padStart(2, '0');
        const mois = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const annee = dateTime.getFullYear().toString();

        return `${jour}-${mois}-${annee}`;
    }

    return (
        <Box>
            <Box display="flex" justifyContent="center">
                <Typography component="h3" variant="h5" textAlign="center" mt={2}>
                    Feedback & Commentaires
                </Typography>
            </Box>
            <Box mb={2} display="flex" justifyContent="flex-end">
                <Button variant="outlined" onClick={() => setOpenFeedback(!openFeedback)}>
                    Ajouter
                </Button>
            </Box>
            {openFeedback &&
                <Box className="border rounded px-2 py-4">
                    <form onSubmit={formFeedback.onSubmit((values) => handleCreateFeedback(values))}>
                        <Box className="d-flex justify-content-center m-auto">
                            <TextField
                                id="content"
                                label="Description du commentaire"
                                name="content"
                                variant="outlined"
                                fullWidth
                                multiline
                                minRows={4}
                                {...formFeedback.getInputProps('content')}
                                error={formFeedback.errors.content ? true : false}
                                helperText={formFeedback.errors.content}
                            />
                        </Box>
                        <Box className="d-flex justify-content-center mw-75 m-auto mt-2">
                            <FormControl>
                                <FormLabel className="m-auto">
                                    Créer un ticket ?
                                </FormLabel>
                                <RadioGroup
                                    row
                                    name="isPrivate"
                                    value={toTreat}
                                    onChange={() => setToTreat(!toTreat)}
                                >
                                    <FormControlLabel value={true} className="mx-4" control={<Radio />} label="Oui" />
                                    <FormControlLabel value={false} className="mx-4" control={<Radio />} label="Non" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        {toTreat &&
                            <Box>
                                <StatusChooser
                                    currentStatus={formFeedback.getInputProps('status').value}
                                    handleChooseStatus={(value: string) => formFeedback.setFieldValue('status', value)}
                                />
                            </Box>
                        }
                        <Box className="d-flex justify-content-center mw-75 m-auto mt-2">
                            <Button
                                type="submit"
                                variant="contained"
                                size='large'
                            >
                                Ajouter
                            </Button>
                        </Box>
                    </form>
                </Box>
            }
            {feedbacks.length === 0 ?
                <Box mb={4} p={2} display="flex" justifyContent="center">
                    <Typography component="p" variant="body1">
                        Pas de commentaire enregistré
                    </Typography>
                </Box>
                :
                <>
                    <Typography component="h3" variant="h5" textAlign="center" my={2}>
                        Tickets de retours mineurs
                    </Typography>
                    <Box mb={4} className="border rounded" p={2}>
                        {feedbacks.filter(feedback => feedback.toTreat).reverse().map((feedback: Feedback, index: number) => (
                            <Box key={index}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Typography component="p" variant="body1" fontWeight="bold">
                                            {feedback.username}
                                        </Typography>
                                        <Typography component="p" variant="subtitle2">
                                            {getDateTime(feedback.createdAt.date)}
                                        </Typography>
                                    </Box>
                                    {null !== feedback.status &&
                                        <StatusShow status={feedback.status} />
                                    }
                                </Box>
                                <Box display="flex" gap={1} alignItems="start" mt={1} mb={2}>
                                    <Box flexGrow="1">
                                        <Typography component="div" variant="body1">
                                            {feedback.content}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <button onClick={() => handleOpenDialog(feedback)} className="rounded border p-1">
                                            <ModeEditIcon />
                                        </button>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                    <Typography component="h3" variant="h5" textAlign="center" my={2}>
                        Commentaires
                    </Typography>
                    <Box mb={4} className="border rounded" p={2}>
                        {feedbacks.filter(feedback => !feedback.toTreat).reverse().map((feedback: Feedback, index: number) => (
                            <Box key={index}>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Typography component="p" variant="body1" fontWeight="bold">
                                            {feedback.username}
                                        </Typography>
                                        <Typography component="p" variant="subtitle2">
                                            {getDateTime(feedback.createdAt.date)}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box display="flex" gap={1} alignItems="start" mt={1} mb={2}>
                                    <Box flexGrow="1">
                                        <Typography component="div" variant="body1">
                                            {feedback.content}
                                        </Typography>
                                    </Box>
                                    {feedback.userId === user &&
                                        <Box>
                                            <button onClick={() => handleOpenDialog(feedback)} className="rounded border p-1">
                                                <ModeEditIcon />
                                            </button>
                                        </Box>
                                    }
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </>
            }
            <Dialog
                fullScreen
                open={dialog}
                onClose={handleCloseDialog}
                TransitionComponent={Transition}
            >
                <Box className="container">
                    <Box mt={2}>
                        <Button variant="outlined" onClick={handleCloseDialog}>
                            Fermer
                        </Button>
                    </Box>
                    <FeedbackEdit
                        handleCloseDialog={handleCloseDialog}
                        setInvalidateQuery={setInvalidateQuery}
                        feedback={feedbackToSet}
                    />
                </Box>
            </Dialog>
        </Box>
    );
}
