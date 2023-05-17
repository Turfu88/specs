import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface PageThumbnailProps {
    uid: string,
    name: string,
    status: string | null,
    category: string
}

export function PageThumbnail({ page }: { page: PageThumbnailProps }) {
    const {name, uid, status, category} = page;

    return (
        <Link to={`/page/${uid}`} className="col-4 m-auto pt-4">
            <Box width={200} minHeight={350} mt={2} className=" border rounded p-2" margin="auto">
                <Typography component="h2" variant="subtitle1" textAlign="center">
                    {name}
                </Typography>
                <Typography component="h2" variant="subtitle1" textAlign="center">
                    {category}
                </Typography>
            </Box>
        </Link>
    );
}
