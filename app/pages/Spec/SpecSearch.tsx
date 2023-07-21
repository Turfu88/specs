import { Box, Button, Dialog, Slide, TextField, Typography } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { useQuery } from "react-query";
import { Spec } from "../../common/types";
import { getUserFeatures, getUserSpecs } from "../../common/api/user";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface SpecSearchProps {
    importData: (spec: Spec) => void
}

export function SpecSearch(props: SpecSearchProps) {
    const {importData} = props
    const [dialog, setDialog] = useState(false);
    const { isLoading, data: allSpecs } = useQuery('getUserSpecs', () => getUserSpecs());
    const results = allSpecs || [];
    const [specs, setSpecs] = useState<Spec[]>([]);

    const handleOpenDialog = () => {
        setDialog(true);
    };

    const handleCloseDialog = () => {
        setDialog(false);
    };

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const search = e.target.value;
        if (search.length > 1) {
            const specsUpdated = results.filter((spec: Spec) => {
                return spec.name.toLowerCase().includes(search.toLowerCase());
            })
            setSpecs(specsUpdated);
        }
        if (search.length === 0) {
            setSpecs(results);
        }
    }

    useEffect(() => {
        if (results.length > 0) {
            setSpecs(results);
        }
    }, [results])

    return (
        <>
            <Box my={2}>
                <Typography component="p" variant="h6" mb={2} textAlign="center">
                    Importer depuis les specs existantes
                </Typography>
                <Box display="flex" justifyContent="center">
                    <Button color="primary" variant="outlined" onClick={handleOpenDialog}>
                        Rechercher
                    </Button>
                </Box>
            </Box>
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
                    <Typography component="h2" variant="h5" textAlign="center">
                        Rechercher une spec
                    </Typography>
                    <Box className="d-flex justify-content-center mw-75 m-auto mt-4">
                        <TextField onChange={handleSearch} fullWidth />
                    </Box>
                    {isLoading ?
                        <Typography component="p" variant="body1" textAlign="center">
                            Chargement...
                        </Typography>
                        :
                        <Box className="mw-75 m-auto mt-4">
                            {specs.map((spec: Spec, index: number) => (
                                <Box key={index} className="border rounded p-2" display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                    <div>
                                        {spec.name}
                                    </div>
                                    <div>
                                        <Button color="primary" variant="outlined" onClick={() => {importData(spec); handleCloseDialog();}}>
                                            Importer
                                        </Button>
                                    </div>
                                </Box>
                            ))}
                        </Box>
                    }
                </Box>
            </Dialog>
        </>
    );
}
