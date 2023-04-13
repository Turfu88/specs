import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { forwardRef, useState } from 'react';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Notifications(props: any) {
    const [open, setOpen] = useState<boolean>(false);
    const [type, setType] = useState<'success' | 'error'>('success');
    const [message, setMessage] = useState<string>('');

    function openNotification(type: 'success' | 'error', message: string) {
        setType(() => type);
        setMessage(() => message);
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                { message }
            </Alert>
        </Snackbar>
    );
}