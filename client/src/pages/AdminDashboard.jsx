import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import {
    FaCalendarAlt,
    FaUsers,
    FaClipboardList,
    FaPlus,
    FaTrash,
    FaCheckCircle,
    FaTimesCircle,
    FaClock,
    FaMapMarkerAlt
} from 'react-icons/fa';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEventForm, setShowEventForm] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: '',
        category: '',
        totalSeats: '',
        ticketPrice: '',
        image: ''
    });

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
            return;
        }

        fetchData();
    }, [user, navigate]);

    const fetchData = async () => {
        try {
            const [eventsRes, bookingsRes] = await Promise.all([
                api.get('/events'),
                api.get('/bookings/my')
            ]);

            setEvents(eventsRes.data);
            setBookings(bookingsRes.data);
        } catch (error) {
            console.error('Error fetching admin data', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();

        try {
            await api.post('/events', formData);

            setShowEventForm(false);

            setFormData({
                title: '',
                description: '',
                date: '',
                location: '',
                category: '',
                totalSeats: '',
                ticketPrice: '',
                image: ''
            });

            fetchData();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                'Error creating program or event'
            );
        }
    };

    const handleDeleteEvent = async (id) => {
        if (
            window.confirm(
                'Are you sure you want to delete this program or event?'
            )
        ) {
            try {
                await api.delete(`/events/${id}`);
                fetchData();
            } catch (error) {
                alert('Error deleting program or event');
            }
        }
    };

    const handleConfirmBooking = async (id, paymentStatus) => {
        try {
            await api.put(`/bookings/${id}/confirm`, { paymentStatus });
            fetchData();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                'Error approving registration'
            );
        }
    };

    const handleCancelBooking = async (id) => {
        if (
            window.confirm(
                'Are you sure you want to reject this registration?'
            )
        ) {
            try {
                await api.delete(`/bookings/${id}`);
                fetchData();
            } catch (error) {
                alert(
                    error.response?.data?.message ||
                    'Error rejecting registration'
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

    const pendingRegistrations = bookings.filter(
        (booking) => booking.status === 'pending'
    ).length;

    const confirmedRegistrations = bookings.filter(
        (booking) => booking.status === 'confirmed'
    ).length;

    if (loading) {
        return (
            <div className="text-center py-20">
                <p className="text-xl font-semibold text-gray-700">
                    Loading admin dashboard...
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">

            {/* Dashboard Header */}
            <div className="bg-gray-900 text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">

                <div>
                    <p className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-2">
                        ASHIRWAD CO-OP CREDIT SOCIETY
                    </p>

                    <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">
                        Admin Dashboard
                    </h1>

                    <p className="text-gray-300">
                        Manage programs, events and participant registrations.
                    </p>
                </div>

                <button
                    onClick={() => setShowEventForm(!showEventForm)}
                    className="w-full md:w-auto bg-white text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition shadow-md flex items-center justify-center gap-2"
                >
                    <FaPlus />

                    {showEventForm
                        ? 'Close Event Form'
                        : 'Create New Event'}
                </button>
            </div>

            {/* Dashboard Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                {/* Total Events */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">
                                Total Events
                            </p>

                            <h3 className="text-3xl font-black text-gray-900">
                                {events.length}
                            </h3>
                        </div>

                        <div className="w-12 h-12 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center text-xl">
                            <FaCalendarAlt />
                        </div>
                    </div>
                </div>

                {/* Total Registrations */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">
                                Registrations
                            </p>

                            <h3 className="text-3xl font-black text-gray-900">
                                {bookings.length}
                            </h3>
                        </div>

                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl">
                            <FaUsers />
                        </div>
                    </div>
                </div>

                {/* Confirmed */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">
                                Confirmed
                            </p>

                            <h3 className="text-3xl font-black text-green-600">
                                {confirmedRegistrations}
                            </h3>
                        </div>

                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl">
                            <FaCheckCircle />
                        </div>
                    </div>
                </div>

                {/* Pending */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">
                                Pending
                            </p>

                            <h3 className="text-3xl font-black text-yellow-600">
                                {pendingRegistrations}
                            </h3>
                        </div>

                        <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center text-xl">
                            <FaClock />
                        </div>
                    </div>
                </div>

            </div>

            {/* Create Event Form */}
            {showEventForm && (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">

                    <div className="mb-6">
                        <p className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-2">
                            EVENT MANAGEMENT
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900">
                            Create New Program or Event
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Add a seminar, workshop, awareness program or
                            community event.
                        </p>
                    </div>

                    <form
                        onSubmit={handleCreateEvent}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Event Title
                            </label>

                            <input
                                required
                                type="text"
                                placeholder="e.g. Financial Awareness Workshop"
                                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-gray-700 outline-none transition"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Category
                            </label>

                            <input
                                required
                                type="text"
                                placeholder="e.g. Workshop, Seminar, Awareness"
                                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-gray-700 outline-none transition"
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        category: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Event Date
                            </label>

                            <input
                                required
                                type="date"
                                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-gray-700 outline-none transition"
                                value={formData.date}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        date: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Venue
                            </label>

                            <input
                                required
                                type="text"
                                placeholder="Enter venue"
                                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-gray-700 outline-none transition"
                                value={formData.location}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        location: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Maximum Participants
                            </label>

                            <input
                                required
                                type="number"
                                min="1"
                                placeholder="e.g. 100"
                                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-gray-700 outline-none transition"
                                value={formData.totalSeats}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        totalSeats: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Registration Fee
                            </label>

                            <input
                                required
                                type="number"
                                min="0"
                                placeholder="Enter 0 for free events"
                                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-gray-700 outline-none transition"
                                value={formData.ticketPrice}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        ticketPrice: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Event Image URL
                            </label>

                            <input
                                type="text"
                                placeholder="Paste a direct image URL"
                                className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-gray-700 outline-none transition"
                                value={formData.image}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        image: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Description
                            </label>

                            <textarea
                                required
                                placeholder="Describe the program or event..."
                                className="w-full border border-gray-300 px-4 py-3 rounded-lg h-32 focus:ring-2 focus:ring-gray-700 outline-none transition"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value
                                    })
                                }
                            />
                        </div>

                        <button
                            type="submit"
                            className="md:col-span-2 bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-black transition shadow-md"
                        >
                            Publish Program / Event
                        </button>

                    </form>
                </div>
            )}

            {/* Events & Registrations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Events Section */}
                <div className="flex flex-col">

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                            <FaCalendarAlt className="text-gray-600" />
                            Events
                        </h2>

                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 text-sm font-bold">
                            {events.length}
                        </span>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                        <ul className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">

                            {events.length === 0 ? (
                                <li className="p-8 text-gray-500 text-center">
                                    No programs or events created yet.
                                </li>
                            ) : (
                                events.map((event) => (
                                    <li
                                        key={event._id}
                                        className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50 transition"
                                    >

                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-2 leading-tight">
                                                {event.title}
                                            </h4>

                                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">

                                                <span className="flex items-center gap-1 font-medium">
                                                    <FaCalendarAlt />
                                                    {new Date(
                                                        event.date
                                                    ).toLocaleDateString()}
                                                </span>

                                                <span className="flex items-center gap-1 font-medium">
                                                    <FaMapMarkerAlt />
                                                    {event.location}
                                                </span>

                                                <span
                                                    className={`flex items-center gap-1 font-medium ${
                                                        event.availableSeats > 0
                                                            ? 'text-green-600'
                                                            : 'text-red-500'
                                                    }`}
                                                >
                                                    {event.availableSeats}/
                                                    {event.totalSeats} seats
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() =>
                                                handleDeleteEvent(event._id)
                                            }
                                            className="w-full sm:w-auto text-red-500 hover:text-white hover:bg-red-500 border border-red-200 px-4 py-2 rounded-lg text-sm font-bold transition shadow-sm shrink-0 flex items-center justify-center gap-2"
                                        >
                                            <FaTrash />
                                            Delete
                                        </button>

                                    </li>
                                ))
                            )}

                        </ul>
                    </div>
                </div>

                {/* Registrations Section */}
                <div className="flex flex-col">

                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                            <FaClipboardList className="text-gray-600" />
                            Registrations
                        </h2>

                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 text-sm font-bold">
                            {bookings.length}
                        </span>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                        <ul className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">

                            {bookings.length === 0 ? (
                                <li className="p-8 text-gray-500 text-center">
                                    No registrations yet.
                                </li>
                            ) : (
                                bookings.map((booking) => (
                                    <li
                                        key={booking._id}
                                        className={`p-6 hover:bg-gray-50 transition border-l-4 ${
                                            booking.status === 'pending'
                                                ? 'border-l-yellow-400'
                                                : booking.status === 'confirmed'
                                                    ? 'border-l-green-400'
                                                    : 'border-l-red-400'
                                        }`}
                                    >

                                        <div className="flex justify-between items-start mb-3">

                                            <h4 className="font-bold text-gray-900 text-lg leading-tight">
                                                {booking.eventId?.title ||
                                                    'Deleted Event'}
                                            </h4>

                                            <div className="flex flex-col gap-1 items-end shrink-0 ml-4">

                                                <span
                                                    className={`px-2 py-1 text-[10px] font-black rounded uppercase tracking-wider ${
                                                        booking.status ===
                                                        'confirmed'
                                                            ? 'bg-green-100 text-green-700'
                                                            : booking.status ===
                                                                'cancelled'
                                                                ? 'bg-red-100 text-red-700'
                                                                : 'bg-yellow-100 text-yellow-700'
                                                    }`}
                                                >
                                                    {formatStatus(
                                                        booking.status
                                                    )}
                                                </span>

                                                {booking.status !==
                                                    'cancelled' &&
                                                    booking.paymentStatus && (
                                                        <span
                                                            className={`px-2 py-1 text-[10px] font-black rounded uppercase tracking-wider ${
                                                                booking.paymentStatus ===
                                                                'paid'
                                                                    ? 'bg-blue-100 text-blue-700'
                                                                    : 'bg-gray-100 text-gray-700'
                                                            }`}
                                                        >
                                                            {formatStatus(
                                                                booking.paymentStatus
                                                            )}
                                                        </span>
                                                    )}
                                            </div>
                                        </div>

                                        {/* Participant Information */}
                                        <div className="bg-gray-50 rounded-lg p-4 mb-3 border border-gray-100 text-sm">

                                            <p className="text-gray-700 mb-2">
                                                <span className="font-bold text-gray-500 uppercase text-xs">
                                                    Participant
                                                </span>
                                                <br />
                                                <span className="font-semibold">
                                                    {booking.userId?.name ||
                                                        'Unknown participant'}
                                                </span>

                                                {booking.userId?.email && (
                                                    <span className="text-gray-400 ml-2">
                                                        (
                                                        {
                                                            booking.userId
                                                                .email
                                                        }
                                                        )
                                                    </span>
                                                )}
                                            </p>

                                            <p className="text-gray-700 mb-2">
                                                <span className="font-bold text-gray-500 uppercase text-xs">
                                                    Registration Fee
                                                </span>
                                                <br />
                                                <span
                                                    className={`font-semibold ${
                                                        booking.amount === 0
                                                            ? 'text-green-600'
                                                            : ''
                                                    }`}
                                                >
                                                    {booking.amount === 0
                                                        ? 'Free'
                                                        : `₹${booking.amount}`}
                                                </span>
                                            </p>

                                            <p className="text-gray-700">
                                                <span className="font-bold text-gray-500 uppercase text-xs">
                                                    Registered On
                                                </span>
                                                <br />
                                                <span>
                                                    {new Date(
                                                        booking.bookedAt
                                                    ).toLocaleString()}
                                                </span>
                                            </p>

                                            {booking.eventId && (
                                                <p className="text-gray-700 mt-3 pt-3 border-t border-gray-200">
                                                    <span className="font-bold text-gray-500 uppercase text-xs">
                                                        Seats Remaining
                                                    </span>
                                                    <br />
                                                    <span
                                                        className={`font-bold ${
                                                            booking.eventId
                                                                .availableSeats >
                                                            0
                                                                ? 'text-green-600'
                                                                : 'text-red-500'
                                                        }`}
                                                    >
                                                        {
                                                            booking.eventId
                                                                .availableSeats
                                                        }
                                                    </span>{' '}
                                                    of{' '}
                                                    {
                                                        booking.eventId
                                                            .totalSeats
                                                    }
                                                </p>
                                            )}

                                        </div>

                                        {/* Registration Actions */}
                                        {booking.status === 'pending' && (
                                            <div className="flex flex-wrap gap-2 mt-3">

                                                <button
                                                    onClick={() =>
                                                        handleConfirmBooking(
                                                            booking._id,
                                                            'paid'
                                                        )
                                                    }
                                                    className="flex-1 min-w-[120px] bg-green-50 text-green-700 hover:bg-green-600 hover:text-white border border-green-200 text-xs font-bold py-2.5 px-3 rounded-lg shadow-sm transition flex items-center justify-center gap-1"
                                                >
                                                    <FaCheckCircle />
                                                    Approve
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleConfirmBooking(
                                                            booking._id,
                                                            'not_paid'
                                                        )
                                                    }
                                                    className="flex-1 min-w-[120px] bg-gray-50 text-gray-700 hover:bg-gray-800 hover:text-white border border-gray-200 text-xs font-bold py-2.5 px-3 rounded-lg shadow-sm transition"
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleCancelBooking(
                                                            booking._id
                                                        )
                                                    }
                                                    className="w-[100px] bg-red-50 text-red-600 hover:bg-red-500 hover:text-white border border-red-200 text-xs font-bold py-2.5 px-3 rounded-lg transition flex items-center justify-center gap-1"
                                                >
                                                    <FaTimesCircle />
                                                    Reject
                                                </button>

                                            </div>
                                        )}

                                    </li>
                                ))
                            )}

                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;