import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Layout } from '../../common/components/Layout';
import { useState } from 'react';
import { Link } from 'react-router-dom';


interface UserForm {
    name: string,
    version: string,
    previousVersion: string,
    comment: string,
    devAccess: string,
    isCore: boolean | null
    status: string
}

const formDefault = {
    name: '',
    version: '',
    previousVersion: '',
    comment: '',
    devAccess: '',
    isCore: null,
    status: ''
}

export function ProjectEdit() {

    const [form, setForm] = useState<UserForm>(formDefault);


    function submitProject(values: any) {
        console.log("submit project", values);

    }

    return (
        <Layout>
            <Box mt={2} mb={4}>
                <Link to="/dashboard">
                    <Button color="primary" variant="outlined">
                        Retour
                    </Button>
                </Link>
                <Typography component="h1" variant="h4" textAlign="center" mt={2}>
                    Création d'un nouveau projet
                </Typography>
                <Box>
                    <form onSubmit={() => submitProject(form)}>
                        <Box display="flex" justifyContent="center" margin="auto" mt={2} className="mw-75">
                            <TextField id="name" label="Nom du projet" variant="outlined" fullWidth />
                        </Box>
                        <Box display="flex" justifyContent="center" margin="auto" mt={2} className="mw-75">
                            <TextField id="version" label="Version" variant="outlined" fullWidth />
                        </Box>
                        <Box display="flex" justifyContent="center" margin="auto" mt={2} className="mw-75">
                            <TextField id="previousVersion" label="Précédente version" variant="outlined" fullWidth />
                        </Box>
                        <Box display="flex" justifyContent="center" margin="auto" mt={2} className="mw-75">
                            <TextField id="comment" multiline minRows={2} label="Commentaire" variant="outlined" fullWidth />
                        </Box>
                        <Box display="flex" justifyContent="center" margin="auto" mt={2} className="mw-75">
                            <TextField id="devAccess" multiline minRows={2} label="Liens d'accès" variant="outlined" fullWidth />
                        </Box>
                        <Box display="flex" justifyContent="center" margin="auto" mt={2} className="mw-75">
                            <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Coeur des autres projets ?</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Oui" />
                                <FormControlLabel value="false" control={<Radio />} label="Non" />
                            </RadioGroup>
                        </FormControl>
                        </Box>
                        
                        <Box display="flex" justifyContent="center" margin="auto" mt={2} className="mw-75">
                            <Button type='submit' variant="contained" size='large'>Valider</Button>
                        </Box>
                    </form>
                </Box>

            </Box>
        </Layout>
    );
}
