import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import {
  Alert,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import validationSchema from '../../utils/validationSchema';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Reservation } from '../../../../types/reservation';
import { useAppSelector, useAppDispatch } from '../../../../hooks';
import { nanoid } from '@reduxjs/toolkit';
import moment from 'moment';
import { properties } from '../../../../mock/properties';
import theme from '../../../../theme/theme';
import { hasOverlap } from '../../utils/reservationServices';

export const BookingForm = () => {
  const id = nanoid().toString();
  const reservations = useAppSelector(
    (state) => state.reservations.reservations
  );
  const dispatch = useAppDispatch();
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [numPets, setNumPets] = useState(0);
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);
  const [numOfDays, setNumOfDays] = useState<number | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>(
    'success'
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

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
    recalculatePrice(newStartDate, endDate);
  };

  const handleEndDateChange = (newEndDate: Dayjs | null) => {
    setEndDate(newEndDate);
    recalculatePrice(startDate, newEndDate);
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

  const recalculatePrice = (start: Dayjs | null, end: Dayjs | null) => {
    if (start?.isValid() && end?.isValid()) {
      const dailyPrice = properties.price;
      const startDate = moment(start.toISOString());
      const endDate = moment(end.toISOString());
      const price = endDate.diff(startDate, 'day') * dailyPrice;
      const numOfDays = endDate.diff(startDate, 'day');
      setCalculatedPrice(price);
      setNumOfDays(numOfDays);
    }
  };

  const isDateReserved = (date: Dayjs) => {
    return reservations.some((reservation) =>
      moment(date.toISOString()).isBetween(
        moment(reservation.dateStart),
        moment(reservation.dateEnd),
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
      const dailyPrice = properties.price;
      const startDate = moment(data.startDate.toISOString());
      const endDate = moment(data.endDate.toISOString());
      const price = endDate.diff(startDate, 'day') * dailyPrice;

      const booking: Reservation = {
        dateStart: data.startDate.toISOString(),
        dateEnd: data.endDate.toISOString(),
        price: price,
        numAdults: data.numAdults,
        numChildren: data.numChildren,
        numPets: data.numPets,
        id: id,
        dailyPrice: dailyPrice,
        propertyId: properties.id
      };

      if (hasOverlap(reservations, booking)) {
        showAlert('Reservation overlaps with existing reservation.', 'error');
        return;
      }

      dispatch({ type: 'reservations/addReservation', payload: booking });
      showAlert('Reservation saved successfully!', 'success');

      reset({
        startDate: null,
        endDate: null,
        numAdults: 1,
        numChildren: 0,
        numPets: 0
      });

      setStartDate(null);
      setEndDate(null);
      setNumAdults(1);
      setNumChildren(0);
      setNumPets(0);
      setCalculatedPrice(null);
      setNumOfDays(null);
    } catch (error) {
      console.error('Failed to save reservation:', error);
      showAlert('Failed to save reservation.', 'error');
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          ${properties.price.toLocaleString()} / night
        </Typography>

        <Stack direction="row" my={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="startDate"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Start date"
                  minDate={dayjs()}
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
              defaultValue={null}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="End date"
                  value={field.value || endDate}
                  minDate={startDate?.add(1, 'day') || undefined}
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
                size="medium"
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        id='decreaseNumAdults'
                        onClick={() => handleNumAdultsChange(numAdults - 1)}
                        disabled={numAdults === 1}
                      >
                        <RemoveCircleOutline />
                      </IconButton>
                      <IconButton
                      id='increaseNumAdults'
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
                size="medium"
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                      id='decreaseNumChildren'
                        onClick={() => handleNumChildrenChange(numChildren - 1)}
                        disabled={numChildren === 0}
                      >
                        <RemoveCircleOutline />
                      </IconButton>
                      <IconButton
                      id='increaseNumChildren'
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
                size="medium"
                InputProps={{
                  readOnly: true,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                      id='decreaseNumPets'
                        onClick={() => handleNumPetsChange(numPets - 1)}
                        disabled={numPets === 0}
                      >
                        <RemoveCircleOutline />
                      </IconButton>
                      <IconButton
                      id='increaseNumPets'
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

          {calculatedPrice !== null && (
            <>
              <Divider />
              <Typography variant="body2">
                {`$${properties.price.toLocaleString()} x ${numOfDays} nights`}
              </Typography>
              <Typography sx={{ color: theme.palette.secondary.main }}>
                Total: ${calculatedPrice.toLocaleString()}
              </Typography>
            </>
          )}

          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            color="primary"
            type="submit"
          >
            Make Reservation
          </Button>
          {alertOpen && (
            <Alert severity={alertSeverity} onClose={handleAlertClose}>
              {alertMessage}
            </Alert>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};
