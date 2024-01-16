import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store'
import { Reservation } from '../types/reservation'

interface ReservationsState {
  reservations: Array<Reservation>;
}
const initialState: ReservationsState = {
    reservations: new Array<Reservation>()
}

export const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    addReservation: (state, action: PayloadAction<Reservation>) => {
      state.reservations.push(action.payload)
    },
    updateReservation: (state, action: PayloadAction<Reservation>) => {
      const index = state.reservations.findIndex(reservation => reservation.id === action.payload.id)
      state.reservations[index] = action.payload
    },
    deleteReservation: (state, action: PayloadAction<string>) => {
      state.reservations = state.reservations.filter(reservation => reservation.id !== action.payload)
    },
  },
})

export const { addReservation } = reservationSlice.actions

export const listReservations = (state: RootState) => state.reservations.reservations

export default reservationSlice.reducer