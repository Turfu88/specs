import { Box, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, Typography } from "@mui/material";
import { Project } from "../../common/types";
import { element } from "prop-types";
import { useState } from "react";
import { StatusChooser } from "../../common/components/StatusChooser";

interface SummaryStepperContentProps {
    isLoading: boolean,
    project: Project
}

interface Filter {
    pagesSelected: boolean,
    pagesValidOnly: boolean,
    pagesStatus: string,
    featuresSelected: boolean,
    featuresValidOnly: boolean,
    featuresStatus: string,
    globalFeaturesSelected: boolean,
    globalFeaturesValidOnly: boolean,
    globalFeaturesStatus: string,
    connectionsSelected: boolean,
    connectionsValidOnly: boolean,
    connectionsStatus: string
}

const defaultFilters = {
    pagesSelected: false,
    pagesValidOnly: false,
    pagesStatus: '',
    featuresSelected: false,
    featuresValidOnly: false,
    featuresStatus: '',
    globalFeaturesSelected: false,
    globalFeaturesValidOnly: false,
    globalFeaturesStatus: '',
    connectionsSelected: false,
    connectionsValidOnly: false,
    connectionsStatus: ''
};

export function SummaryStepperContent(props: SummaryStepperContentProps) {
    const { isLoading, project } = props;
    const [filters, setFilters] = useState<Filter>(defaultFilters);

    function toggleFilter(filterSelected: string, newValue: string | boolean) {
        setFilters((prevValue) => ({ ...prevValue, [filterSelected]: newValue }));
    }

    if (isLoading) {
        return (
            <>
                <Typography component="p" variant="body1">
                    Chargement des données
                </Typography>
            </>
        );
    }

    return (
        <>
            <Typography component="h1" variant="h5" textAlign="center" mt={4}>
                Contenu à inclure
            </Typography>
            <FormControl component="fieldset" variant="standard">
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox onChange={() => toggleFilter('pagesSelected', !filters.pagesSelected)} name="commited-pages" />
                        }
                        label="Pages"
                    />
                    {filters.pagesSelected &&
                        <Box px={10}>
                            <FormControlLabel
                                control={
                                    <Checkbox onChange={() => toggleFilter('pagesValidOnly', !filters.pagesValidOnly)} name="commited-pages" />
                                }
                                label="Validées uniquement"
                            />
                            <StatusChooser
                                currentStatus={filters.pagesStatus}
                                handleChooseStatus={(value: string) => toggleFilter('pagesStatus', value)}
                            />
                        </Box>
                    }
                    <FormControlLabel
                        control={
                            <Checkbox onChange={() => toggleFilter('featuresSelected', !filters.featuresSelected)} name="commited-features" />
                        }
                        label="Fonctionnalités"
                    />
                    {filters.featuresSelected &&
                        <Box px={10}>
                            <FormControlLabel
                                control={
                                    <Checkbox onChange={() => toggleFilter('featuresValidOnly', !filters.featuresValidOnly)} name="commited-features" />
                                }
                                label="Validées uniquement"
                            />
                            <StatusChooser
                                currentStatus={filters.featuresStatus}
                                handleChooseStatus={(value: string) => toggleFilter('featuresStatus', value)}
                            />
                        </Box>
                    }
                    <FormControlLabel
                        control={
                            <Checkbox onChange={() => toggleFilter('globalFeaturesSelected', !filters.globalFeaturesSelected)} name="global-functions" />
                        }
                        label="Fonctionnalités globales"
                    />
                    {filters.globalFeaturesSelected &&
                        <Box px={10}>
                            <FormControlLabel
                                control={
                                    <Checkbox onChange={() => toggleFilter('globalFeaturesValidOnly', !filters.globalFeaturesValidOnly)} name="commited-global-features" />
                                }
                                label="Validées uniquement"
                            />
                            <StatusChooser
                                currentStatus={filters.globalFeaturesStatus}
                                handleChooseStatus={(value: string) => toggleFilter('globalFeaturesStatus', value)}
                            />
                        </Box>
                    }
                    <FormControlLabel
                        control={
                            <Checkbox onChange={() => toggleFilter('connectionsSelected', !filters.connectionsSelected)} name="connections" />
                        }
                        label="Connexions"
                    />
                    {filters.connectionsSelected &&
                        <Box px={10}>
                            <FormControlLabel
                                control={
                                    <Checkbox onChange={() => toggleFilter('connectionsValidOnly', !filters.connectionsValidOnly)} name="commited-global-features" />
                                }
                                label="Validées uniquement"
                            />
                            <StatusChooser
                                currentStatus={filters.connectionsStatus}
                                handleChooseStatus={(value: string) => toggleFilter('connectionsStatus', value)}
                            />
                        </Box>
                    }
                </FormGroup>
            </FormControl>
            <Box my={2}>
                <Divider></Divider>
            </Box>
            <Typography textAlign="center" mt={4} component="h2" variant="h5">
                Filtres spécifiques
            </Typography>
            {filters.pagesSelected &&
                <>
                    {project.pages.map((page, index) => (
                        <Box key={index}>
                            <FormControlLabel
                                control={
                                    <Checkbox name={page.uid} />
                                }
                                label={page.name}
                            />
                        </Box>
                    ))}
                </>
            }
        </>
    );
}
