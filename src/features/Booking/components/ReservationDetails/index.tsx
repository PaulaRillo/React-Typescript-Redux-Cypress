import {
  Alert,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  DeleteOutlined,
  EditOffOutlined,
  EditOutlined
} from '@mui/icons-material';
import { Reservation } from '../../../../types/reservation';
import { useState } from 'react';
import { ReservationDetailsForm } from '../ReservationDetailsForm';

export const ReservationDetails = () => {
  const reservations = useAppSelector(
    (state: any) => state.reservations.reservations
  );
  const [editedReservationId, setEditedReservationId] = useState<null | string>(
    null
  );
  const [editedReservations, setEditedReservations] = useState<Record<string, boolean>>({});
  const [showReservationDetailsForm, setShowReservationDetailsForm] =
    useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const dispatch = useAppDispatch();

  const handleEditClick = (id: string) => {
    setEditedReservationId(id);
    setShowReservationDetailsForm((prevValue) => !prevValue);
    setEditedReservations((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDeleteClick = (id: string) => {
    dispatch({ type: 'reservations/deleteReservation', payload: id });
  };


  return (
    <>
      {reservations.length === 0 ? (
        <Typography variant="body1">No reservations found</Typography>
      ) : (
        reservations.map((reservation: Reservation) => (
          <Card key={reservation.id} sx={{ my: 2 }}>
            <CardContent>
              <Stack direction="row">
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Treehouse in Kailua-Kona
                </Typography>
                <IconButton
                  id={reservation.id}
                  color="primary"
                  onClick={() => handleEditClick(reservation.id)}
                >
                  {editedReservations[reservation.id] ? (
                    <EditOffOutlined />
                  ) : (
                    <EditOutlined />
                  )}
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => {
                    setShowDeleteAlert(true);
                    setEditedReservationId(reservation.id);
                  }}
                >
                  <DeleteOutlined />
                </IconButton>
              </Stack>
              {showDeleteAlert && editedReservationId === reservation.id && (
                <Alert
                  severity="warning"
                  action={
                    <Button
                      color="inherit"
                      size="small"
                      onClick={() => handleDeleteClick(reservation.id)}
                    >
                      Yes
                    </Button>
                  }
                >
                  Are you sure you want to cancel this reservation?
                </Alert>
              )}
              <Divider sx={{ my: 1 }} />
              {editedReservationId === reservation.id &&
              showReservationDetailsForm ? (
                <ReservationDetailsForm reservation={reservation} />
              ) : (
                <Stack spacing={1}>
                  <Typography variant="subtitle2">Price</Typography>
                  <Typography variant="body2">
                    ${reservation.price.toLocaleString()}
                  </Typography>
                  <Typography variant="subtitle2">Check in</Typography>
                  <Typography variant="body2">
                    {new Date(reservation.dateStart).toLocaleDateString()}
                  </Typography>
                  <Typography variant="subtitle2">Check out</Typography>
                  <Typography variant="body2">
                    {new Date(reservation.dateEnd).toLocaleDateString()}
                  </Typography>
                  <Typography variant="subtitle2">Guests</Typography>
                  <Typography variant="body2">
                    Aduts: {reservation.numAdults}
                  </Typography>
                  <Typography variant="body2">
                    Children: {reservation.numChildren}
                  </Typography>
                  <Typography variant="body2">
                    Pets: {reservation.numPets}
                  </Typography>
                </Stack>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </>
  );
};
