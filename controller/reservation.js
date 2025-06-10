import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

export const sendReservation = async (req, res, next) => {
    const { firstname, lastname, email, phone, date, time } = req.body;

    // Validate inputs
    if (!firstname || !lastname || !email || !phone || !date || !time) {
        return next(new ErrorHandler("Please fill out the full reservation form!", 400));
    }

    try {
        // Save reservation to database
        await Reservation.create({ firstname, lastname, email, phone, date, time });

        return res.status(200).json({
            success: true,
            message: "Reservation sent successfully!",
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const validationErrors = Object.values(error.errors).map(
                (err) => err.message
            );
            return next(new ErrorHandler(validationErrors.join(", "), 400));
        }

        // Other unhandled errors
        return next(new ErrorHandler("Something went wrong", 500));
    }
};
