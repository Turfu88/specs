import { useForm } from "@mantine/form";
import { Feedback } from "../types";
import { Box, Button, TextField, Typography } from "@mui/material";
import { StatusChooser } from "./StatusChooser";
import { editFeedback } from "../api/feedback";
import { getUserId } from "../api/user";

export interface EditFeedbackForm {
    content: string,
    status: string,
}

interface FeedbackEditProps {
    feedback: Feedback | null,
    handleCloseDialog: () => void,
    setInvalidateQuery: (value: boolean) => void
}

export function FeedbackEdit(props: FeedbackEditProps) {
    const { feedback, handleCloseDialog, setInvalidateQuery } = props;
    const user = getUserId();


    const formFeedback = useForm({
        initialValues: {
            content: feedback ? feedback.content : '',
            status: feedback ? feedback.status : '',
        } as EditFeedbackForm,
        validate: {
            content: (value) => (value.length < 2 ? 'Le commentaire est trop court' : null)
        },
    });

    function handleEditFeedback(values: EditFeedbackForm) {
        if (feedback) {
            editFeedback(feedback.id, values).then(() => {
                setInvalidateQuery(true);
                handleCloseDialog();
            });
        }
    }

    return (
        <Box mb={8}>
            <Typography component="h1" variant="h4" textAlign="center">
                Modifier un commentaire
            </Typography>
            <form onSubmit={formFeedback.onSubmit((values) => handleEditFeedback(values))}>
                {feedback && feedback.toTreat &&
                    <Box>
                        <StatusChooser
                            currentStatus={formFeedback.getInputProps('status').value}
                            handleChooseStatus={(value: string) => formFeedback.setFieldValue('status', value)}
                        />
                    </Box>
                }
                {feedback && feedback.userId === user &&
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField
                            id="name"
                            label="Nom de la connexion"
                            name="name"
                            variant="outlined"
                            fullWidth
                            multiline
                            minRows={4}
                            {...formFeedback.getInputProps('content')}
                            error={formFeedback.errors.content ? true : false}
                            helperText={formFeedback.errors.content}
                        />
                    </Box>
                }
                <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                    <Button
                        type="submit"
                        variant="contained"
                        size='large'
                    >
                        Modifier
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
