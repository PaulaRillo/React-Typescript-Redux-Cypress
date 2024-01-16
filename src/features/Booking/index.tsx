import Grid from '@mui/system/Unstable_Grid';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import { Gallery } from './components/Gallery';
import { BookingForm } from './components/BookingForm';
import { PropertyHeader } from './components/PropertyHeader';
import { useState } from 'react';
import { ReservationDetails } from './components/ReservationDetails';
import { HighlightOff } from '@mui/icons-material';

export const Booking = () => {
  const [openReservationDetails, setOpenReservationDetails] = useState(false);

  const handleOpenReservationDetails = () => {
    setOpenReservationDetails(true);
  };

  const handleCloseReservationDetails = () => {
    setOpenReservationDetails(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container maxWidth="lg" spacing={2} sx={{ mx: 'auto'}}>
        <Grid xs={12} md={8}>
          <PropertyHeader />
          <Gallery />
        </Grid>
        <Grid xs={12} md={4}>
          <Stack>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleOpenReservationDetails}
              sx={{ alignSelf: 'self-end', my: 2 }}
            >
              My Reservations
            </Button>
            <BookingForm />
          </Stack>
        </Grid>
      </Grid>

      <Dialog
        fullWidth={true}
        open={openReservationDetails}
        onClose={handleCloseReservationDetails}
      >
        <DialogTitle>
          <Stack direction='row'>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>Upcoming trips</Typography>
            <IconButton
              onClick={handleCloseReservationDetails}
              color="primary"
            >
              <HighlightOff />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <ReservationDetails />
        </DialogContent>
      </Dialog>
    </Box>
  );
};
