import { configureStore } from '@reduxjs/toolkit'
import reservationSlice from '../slices/reservationSlice'

export const store = configureStore({
  reducer: {
    reservations: reservationSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch