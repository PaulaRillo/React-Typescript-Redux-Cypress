import { Route, Routes } from "react-router-dom";
import { Booking } from "../features/Booking";

export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Booking />} />
        </Routes>
    )
};