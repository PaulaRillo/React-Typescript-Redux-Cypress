import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Reservation } from '../../../../types/reservation';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import moment from 'moment';
import validationSchema from '../../utils/validationSchema';
import theme from '../../../../theme/theme';
import { hasOverlap } from '../../utils/reservationServices';

type Props = {
  reservation: Reservation;
}

export const ReservationDetailsForm = ({ reservation }:Props) => {
  const dispatch = useAppDispatch();
  const reservations = useAppSelector(
    (state) => state.reservations.reservations
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(reservation.dateStart));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(reservation.dateEnd));
  const [numAdults, setNumAdults] = useState(reservation.numAdults);
  const [numChildren, setNumChildren] = useState(reservation.numChildren);
  const [numPets, setNumPets] = useState(reservation.numPets);
  const [newPrice, setNewPrice] = useState(reservation.price);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>(
    'success'
  );

  const showAlert = (message: string, severity: 'success' | 'error') => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleStartDateChange = (newStartDate: Dayjs | null) => {
    setStartDate(newStartDate);
  };

  const handleEndDateChange = (newEndDate: Dayjs | null) => {
    setEndDate(newEndDate);
  };

  const handleNumAdultsChange = (newNumAdults: number) => {
    setNumAdults(newNumAdults);
    setValue('numAdults', newNumAdults);
  };

  const handleNumChildrenChange = (newNumChildren: number) => {
    setNumChildren(newNumChildren);
    setValue('numChildren', newNumChildren);
  };

  const handleNumPetsChange = (newNumPets: number) => {
    setNumPets(newNumPets);
    setValue('numPets', newNumPets);
  };

  useEffect(() => {
    setStartDate(dayjs(reservation.dateStart));
    setEndDate(dayjs(reservation.dateEnd));
    setNumAdults(reservation.numAdults);
    setNumChildren(reservation.numChildren);
    setNumPets(reservation.numPets);
  }, [reservation]);

  const calculateNewPrice = (startDate: Dayjs, endDate: Dayjs) => {
    const days = moment(endDate.toISOString()).diff(moment(startDate.toISOString()), 'days');
    return days * reservation.dailyPrice;
  };

  useEffect(() => {
    if (startDate?.isValid() && endDate?.isValid()) {
      setNewPrice(calculateNewPrice(startDate, endDate));
    }
  }, [startDate, endDate]);

  const isDateReserved = (date: Dayjs) => {
    return reservations.some((existingReservation) =>
      existingReservation.id !== reservation.id &&
      moment(date.toISOString()).isBetween(
        moment(existingReservation.dateStart),
        moment(existingReservation.dateEnd),
        'day',
        '[]'
      )
    );
  };

  const onSubmit = (data: {
    startDate: Dayjs;
    price: number;
    endDate: Dayjs;
    numAdults: number;
    numChildren: number;
    numPets: number;
  }) => {
    try {
    const dailyPrice = reservation.dailyPrice;
    const startDate = moment(data.startDate.toISOString());
    const endDate = moment(data.endDate.toISOString());
    const days = endDate.diff(startDate, 'day');
    const price = days * dailyPrice;

    const booking: Reservation = {
      dateStart: data.startDate.toISOString(),
      dateEnd: data.endDate.toISOString(),
      price: price,
      numAdults: data.numAdults,
      numChildren: data.numChildren,
      numPets: data.numPets,
      id: reservation.id,
      propertyId: reservation.propertyId,
      dailyPrice: reservation.dailyPrice
    };

    if (hasOverlap(reservations, booking)) {
      showAlert('Reservation overlaps with an existing reservation.', 'error');
      return;
    }

    dispatch({ type: 'reservations/updateReservation', payload: booking });
    showAlert('Reservation changed successfully!', 'success');
  } catch (error) {
    console.error('Failed to change reservation:', error);
    showAlert('Failed to change reservation.', 'error');
  }
  };

  return (
    <>
        <Typography variant="h5" sx={{ mb: 2 }}>
          ${reservation.price.toLocaleString()}
        </Typography>

        <Stack direction="row" mb={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="startDate"
                key='editStartDate'
                control={control}
                defaultValue={startDate}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    minDate={dayjs()}
                    label="Start date"
                    value={startDate}
                    onChange={(newStartDate) => {
                      field.onChange(newStartDate);
                      handleStartDateChange(newStartDate);
                    }}
                    shouldDisableDate={isDateReserved}
                  />
                )}
              />
            <Controller
              name="endDate"
              control={control}
              defaultValue={endDate}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="End date"
                  value={field.value || endDate}
                  minDate={startDate || undefined}
                  onChange={(newEndDate) => {
                    field.onChange(newEndDate);
                    handleEndDateChange(newEndDate);
                  }}
                  shouldDisableDate={isDateReserved}
                />
              )}
            />
          </LocalizationProvider>
        </Stack>
        <Stack direction="row" spacing={6} mt={-2} mb={2}>
          {errors.startDate && (
            <Typography variant="caption" color="error">
              {errors.startDate.message as string}
            </Typography>
          )}
          {errors.endDate && (
            <Typography variant="caption" color="error">
              {errors.endDate.message as string}
            </Typography>
          )}
        </Stack>

        <Stack gap={2}>
          <Controller
            name="numAdults"
            control={control}
            defaultValue={1}
            render={({ field }) => (
              <TextField
                {...field}
                label="Adults"
                type="number"
                value={numAdults}
                size="small"
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                      id='decreaseNumAdultsEdit'
                        onClick={() => handleNumAdultsChange(numAdults - 1)}
                        disabled={numAdults === 1}
                      >
                        <RemoveCircleOutline />
                      </IconButton>
                      <IconButton
                      id='increaseNumAdultsEdit'
                        onClick={() => handleNumAdultsChange(numAdults + 1)}
                      >
                        <AddCircleOutline />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />

          <Controller
            name="numChildren"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <TextField
                {...field}
                label="Childrens"
                error={!!errors.numChildren}
                type="number"
                value={numChildren}
                size="small"
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                      id='decreaseNumChildrenEdit'
                        onClick={() => handleNumChildrenChange(numChildren - 1)}
                        disabled={numChildren === 0}
                      >
                        <RemoveCircleOutline />
                      </IconButton>
                      <IconButton
                      id='increaseNumChildrenEdit'
                        onClick={() => handleNumChildrenChange(numChildren + 1)}
                      >
                        <AddCircleOutline />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
          {errors.numChildren && (
            <Typography variant="caption" color="error">
              {errors.numChildren.message as string}
            </Typography>
          )}

          <Controller
            name="numPets"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <TextField
                {...field}
                label="Pets"
                error={!!errors.numPets}
                type="number"
                value={numPets}
                size="small"
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                      id='decreaseNumPetsEdit'
                        onClick={() => handleNumPetsChange(numPets - 1)}
                        disabled={numPets === 0}
                      >
                        <RemoveCircleOutline />
                      </IconButton>
                      <IconButton
                      id='increaseNumPetsEdit'
                        onClick={() => handleNumPetsChange(numPets + 1)}
                      >
                        <AddCircleOutline />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            )}
          />
          {errors.numPets && (
            <Typography variant="caption" color="error">
              {errors.numPets.message as string}
            </Typography>
          )}

        {newPrice !== reservation.price && (
          <Typography variant="body1" sx={{ mb: 2, color: theme.palette.warning.main }}>
            New reservation price: ${newPrice.toLocaleString()}
          </Typography>
        )}

          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            color="primary"
          >
            Change Reservation
          </Button>
          {alertOpen && (
            <Alert severity={alertSeverity} onClose={handleAlertClose}>
              {alertMessage}
            </Alert>
          )}
        </Stack>
    </>
  );
};