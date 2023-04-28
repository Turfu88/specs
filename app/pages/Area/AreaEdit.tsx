import { useForm } from "@mantine/form";
import { Area } from "../../common/types";
import { Box, Button, TextField, Typography } from "@mui/material";
import { editArea } from "../../common/api/area";

export interface EditAreaForm {
    name: string,
}

interface AreaEditProps {
    area: Area,
    handleCloseDialog: () => void,
    setInvalidateQuery: (value: boolean) => void
}

export function AreaEdit(props: AreaEditProps) {
    const { area, handleCloseDialog, setInvalidateQuery } = props;
    const formArea = useForm({
        initialValues: {
            name: area.name,
        } as EditAreaForm,
        validate: {
            name: (value) => (value.length < 2 ? 'Le nom de la connexion est trop court' : null),
        },
    });

    function handleEditConnection(values: EditAreaForm) {
        editArea(area.id, values).then(() => {            
            setInvalidateQuery(true);
            handleCloseDialog();
        });
    }

    return (
        <Box mb={8}>
            <Typography component="h1" variant="h4" textAlign="center">
                Modifier cet espace
            </Typography>
            <form onSubmit={formArea.onSubmit((values) => handleEditConnection(values))}>
                <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                    <TextField
                        id="name"
                        label="Nom de l'espace"
                        name="name"
                        variant="outlined"
                        fullWidth
                        {...formArea.getInputProps('name')}
                        error={formArea.errors.name ? true : false}
                        helperText={formArea.errors.name}
                    />
                </Box>
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
