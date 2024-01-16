import { Reservation } from "../../../types/reservation";

function hasOverlap(reservations: Array<Reservation>, newReservation: Reservation) {
    for (const reservation of reservations) {
        if (reservation.id !== newReservation.id) {
            if (new Date(reservation.dateStart) <= new Date(newReservation.dateEnd) && new Date(newReservation.dateStart) <= new Date(reservation.dateEnd)) {
                return true;
            }
        }
    }
    return false;
}

export { hasOverlap }