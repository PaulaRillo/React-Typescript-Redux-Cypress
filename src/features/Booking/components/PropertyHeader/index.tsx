import { Stack, Typography } from "@mui/material";
import { properties } from "../../../../mock/properties";

export const PropertyHeader = () => {
    return (
        <Stack direction='row' spacing={2} sx={{alignItems: 'self-end', my: 2}}>
            <Typography variant="h5" color='primary'>{properties.name}</Typography>
            <Typography variant="subtitle1">{properties.location}</Typography>
        </Stack>
    )
};