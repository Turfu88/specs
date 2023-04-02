import { Box } from '@mui/material';
import Button from '@mui/material/Button';

export function Login() {
    const styles = {
        color: 'red',
    };
    const styles2 = {
        color: 'green',
    };

    return (
        <Box className="d-flex justify-content-center mt-4">
            <span className="text">Login Page</span>
            <Button variant="outlined">Text</Button>
        </Box>
    );
}
