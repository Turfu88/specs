import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { DefaultPage } from "./defaultValues";

interface ElementChooserProps {
    pages: DefaultPage[],
    handleChangePages: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function PageChooser(props: ElementChooserProps) {
    const { handleChangePages, pages } = props;

    return (
        <>
            <Typography component='p' variant="h5" textAlign="center" mt={4} mb={2}>
                Choisir les pages créées par défaut
            </Typography>
            <Box sx={{ display: 'flex' }} className="border rounded px-4 py-2" mb={2}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Action</TableCell>
                            <TableCell>Page</TableCell>
                            <TableCell>Catégorie</TableCell>
                            <TableCell>Privée</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pages.map((page, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    <Checkbox checked={page.choosed} onChange={handleChangePages} name={page.name} />
                                </TableCell>
                                <TableCell>
                                    {page.name}
                                </TableCell>
                                <TableCell>
                                    {page.category}
                                </TableCell>
                                <TableCell>
                                    {page.private ? 'oui' : 'non'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </>
    );
}
