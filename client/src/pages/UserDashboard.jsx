import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaClipboardList,
    FaTimesCircle
} from 'react-icons/fa';

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        fetchBookings();
    }, [user, navigate]);

    const fetchBookings = async () => {
        try {
            const { data } = await api.get('/bookings/my');
            setBookings(data);
        } catch (error) {
            console.error('Error fetching registrations:', error);
        } finally {
            setLoading(false);
        }
    };

    const cancelBooking = async (id) => {
        if (
            window.confirm(
                'Are you sure you want to cancel your registration for this event?'
            )
        ) {
            try {
                await api.delete(`/bookings/${id}`);
                fetchBookings();
            } catch (error) {
                alert(
                    error.response?.data?.message ||
                    'Unable to cancel the registration.'
                );
            }
        }
    };

    const formatStatus = (status) => {
        if (!status) return 'Pending';

        return status
            .replace('_', ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-700';

            case 'cancelled':
                return 'bg-red-100 text-red-700';

            case 'rejected':
                return 'bg-red-100 text-red-700';

            default:
                return 'bg-yellow-100 text-yellow-700';
        }
    };

    const getPaymentClass = (paymentStatus) => {
        return paymentStatus === 'paid'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-gray-100 text-gray-700';
    };

    if (loading) {
        return (
            <div className="text-center py-20">
                <p className="text-xl font-semibold text-gray-700">
                    Loading your dashboard...
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">

            {/* Welcome Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 mb-8 border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">

                <div className="w-20 h-20 bg-gray-900 text-white rounded-full flex items-center justify-center text-3xl font-bold uppercase shrink-0">
                    {user?.name?.charAt(0)}
                </div>

                <div className="flex flex-col items-center sm:items-start">
                    <p className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-2">
                        ASHIRWAD CO-OP CREDIT SOCIETY
                    </p>

                    <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
                        Welcome, {user?.name}!
                    </h1>

                    <p className="text-gray-500 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Member Dashboard
                    </p>
                </div>
            </div>

            {/* Dashboard Introduction */}
            <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    My Programs & Events
                </h2>

                <p className="text-gray-500">
                    View and manage your registrations for upcoming programs and events.
                </p>
            </div>

            {/* Registrations */}
            {bookings.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">

                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-5">
                        <FaClipboardList className="text-gray-300 text-3xl" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                        No Registrations Yet
                    </h3>

                    <p className="text-gray-500 mb-7 max-w-md mx-auto">
                        You haven't registered for any programs or events yet.
                        Explore the available events and find something that interests you.
                    </p>

                    <Link
                        to="/"
                        className="inline-block bg-gray-900 hover:bg-black text-white font-bold py-3 px-8 rounded-lg transition shadow-md"
                    >
                        Explore Programs & Events
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col"
                        >

                            {booking.eventId ? (
                                <>
                                    {/* Event Information */}
                                    <div className="p-6 flex-grow">

                                        <div className="flex justify-between items-start gap-3 mb-5">

                                            <h3 className="text-lg font-bold text-gray-900 leading-tight">
                                                {booking.eventId.title}
                                            </h3>

                                            <div className="flex flex-col gap-1 items-end shrink-0">

                                                <span
                                                    className={`px-2 py-1 text-[10px] font-black rounded uppercase tracking-wider ${getStatusClass(
                                                        booking.status
                                                    )}`}
                                                >
                                                    {formatStatus(booking.status)}
                                                </span>

                                                {booking.status !== 'cancelled' &&
                                                    booking.paymentStatus && (
                                                        <span
                                                            className={`px-2 py-1 text-[10px] font-black rounded uppercase tracking-wider ${getPaymentClass(
                                                                booking.paymentStatus
                                                            )}`}
                                                        >
                                                            {formatStatus(
                                                                booking.paymentStatus
                                                            )}
                                                        </span>
                                                    )}
                                            </div>
                                        </div>

                                        <div className="text-sm text-gray-500 space-y-3">

                                            <div className="flex items-start gap-3">
                                                <FaCalendarAlt className="text-gray-400 mt-1 shrink-0" />

                                                <div>
                                                    <p className="font-semibold text-gray-700">
                                                        Date
                                                    </p>

                                                    <p>
                                                        {new Date(
                                                            booking.eventId.date
                                                        ).toLocaleDateString(undefined, {
                                                            weekday: 'long',
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>

                                            {booking.eventId.location && (
                                                <div className="flex items-start gap-3">
                                                    <FaMapMarkerAlt className="text-gray-400 mt-1 shrink-0" />

                                                    <div>
                                                        <p className="font-semibold text-gray-700">
                                                            Venue
                                                        </p>

                                                        <p>
                                                            {booking.eventId.location}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex items-start gap-3">
                                                <FaClipboardList className="text-gray-400 mt-1 shrink-0" />

                                                <div>
                                                    <p className="font-semibold text-gray-700">
                                                        Registered On
                                                    </p>

                                                    <p>
                                                        {new Date(
                                                            booking.bookedAt
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>

                                            {booking.amount !== undefined && (
                                                <div>
                                                    <p className="font-semibold text-gray-700">
                                                        Registration Fee
                                                    </p>

                                                    <p>
                                                        {booking.amount === 0
                                                            ? 'Free'
                                                            : `₹${booking.amount}`}
                                                    </p>
                                                </div>
                                            )}

                                        </div>
                                    </div>

                                    {/* Card Actions */}
                                    <div className="p-4 bg-gray-50 flex justify-between items-center shrink-0">

                                        <Link
                                            to={`/events/${booking.eventId._id}`}
                                            className="text-gray-900 font-semibold text-sm hover:underline"
                                        >
                                            View Event
                                        </Link>

                                        {booking.status !== 'cancelled' && (
                                            <button
                                                onClick={() =>
                                                    cancelBooking(booking._id)
                                                }
                                                className="text-red-500 font-semibold text-sm hover:text-red-700 transition flex items-center gap-1"
                                            >
                                                <FaTimesCircle />
                                                Cancel Registration
                                            </button>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="p-6 flex-grow flex flex-col justify-center">
                                    <p className="text-red-500 italic text-sm">
                                        Event details are unavailable because the
                                        event may have been removed.
                                    </p>

                                    <div className="mt-5 pt-4 border-t border-gray-100 text-center text-sm text-gray-500">
                                        Registration unavailable
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserDashboard;