import Button from '@mui/material/Button';

export function LandingHome() {
    const styles = {
        color: 'red',
    };
    const styles2 = {
        color: 'green',
    };

    return (
        <div className="d-flex justify-content-center mt-4">
            <span className="text">Hello </span>
            <span style={styles}> world !</span>
            <span style={styles2}> world !</span>
            <Button variant="outlined">Text</Button>
        </div>
    );
}
