import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import { AuthContext } from '../context/AuthContext';
import {
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaChair,
    FaMoneyBillWave,
    FaArrowLeft,
    FaCheckCircle,
    FaUsers
} from 'react-icons/fa';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await api.get(`/events/${id}`);
                setEvent(data);
            } catch (err) {
                setError('Failed to load event details.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);

    const handleBooking = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setBookingLoading(true);
        setError('');
        setSuccessMsg('');

        try {
            if (!showOTP) {
                await api.post('/bookings/send-otp');
                setShowOTP(true);
                setSuccessMsg(
                    'OTP sent to your registered email address. Please enter it below to continue.'
                );
            } else {
                await api.post('/bookings', {
                    eventId: event._id,
                    otp
                });

                setSuccessMsg(
                    'Your registration request has been submitted. Please wait for admin confirmation.'
                );

                setShowOTP(false);
                setOtp('');

                setEvent({
                    ...event,
                    availableSeats: event.availableSeats - 1
                });
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Unable to complete registration. Please try again.'
            );
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-5"></div>
                    <p className="text-lg font-semibold text-gray-700">
                        Loading event details...
                    </p>
                </div>
            </div>
        );
    }

    if (error && !event) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="bg-red-50 text-red-600 px-6 py-4 rounded-xl border border-red-100 mb-6">
                        {error || 'Event not found'}
                    </div>

                    <button
                        onClick={() => navigate('/')}
                        className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-lg font-semibold transition"
                    >
                        Back to Programs & Events
                    </button>
                </div>
            </div>
        );
    }

    const isSoldOut = event.availableSeats <= 0;

    return (
        <div className="max-w-6xl mx-auto">

            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold mb-6 transition"
            >
                <FaArrowLeft />
                Back to Programs & Events
            </button>

            {/* Main Event Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                {/* Event Image */}
                {event.image ? (
                    <div className="relative">
                        <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-64 md:h-96 object-cover"
                        />

                        <div className="absolute top-5 left-5">
                            <span className="bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide shadow-sm">
                                {event.category}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="relative w-full h-64 md:h-80 bg-gray-900 flex items-center justify-center">
                        <div className="text-center text-white px-6">
                            <p className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-3">
                                ASHIRWAD CO-OP CREDIT SOCIETY
                            </p>

                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                                {event.category}
                            </h2>
                        </div>

                        <div className="absolute top-5 left-5">
                            <span className="bg-white text-gray-900 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide">
                                {event.category}
                            </span>
                        </div>
                    </div>
                )}

                <div className="p-6 md:p-10">

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* Event Information */}
                        <div className="lg:col-span-2">

                            <p className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-3">
                                ASHIRWAD CO-OP CREDIT SOCIETY
                            </p>

                            <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-5">
                                {event.title}
                            </h1>

                            <div className="flex flex-wrap gap-3 mb-8">

                                <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-lg text-sm text-gray-700">
                                    <FaCalendarAlt className="text-gray-500" />
                                    {new Date(event.date).toLocaleDateString(undefined, {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>

                                {event.location && (
                                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-lg text-sm text-gray-700">
                                        <FaMapMarkerAlt className="text-gray-500" />
                                        {event.location}
                                    </div>
                                )}

                            </div>

                            {/* About Event */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    About This Program
                                </h2>

                                <p className="text-gray-600 text-base md:text-lg leading-relaxed whitespace-pre-line">
                                    {event.description}
                                </p>
                            </div>

                            {/* Event Information */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-5">
                                    Event Information
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                    <div className="border border-gray-100 rounded-xl p-5 bg-gray-50">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                                <FaCalendarAlt className="text-gray-700" />
                                            </div>

                                            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                                                Date
                                            </p>
                                        </div>

                                        <p className="font-bold text-gray-900">
                                            {new Date(event.date).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="border border-gray-100 rounded-xl p-5 bg-gray-50">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                                <FaMapMarkerAlt className="text-gray-700" />
                                            </div>

                                            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                                                Venue
                                            </p>
                                        </div>

                                        <p className="font-bold text-gray-900">
                                            {event.location || 'Venue details will be announced'}
                                        </p>
                                    </div>

                                    <div className="border border-gray-100 rounded-xl p-5 bg-gray-50">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                                <FaUsers className="text-gray-700" />
                                            </div>

                                            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                                                Capacity
                                            </p>
                                        </div>

                                        <p className="font-bold text-gray-900">
                                            {event.totalSeats} Participants
                                        </p>
                                    </div>

                                    <div className="border border-gray-100 rounded-xl p-5 bg-gray-50">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                                <FaChair className="text-gray-700" />
                                            </div>

                                            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                                                Seats Available
                                            </p>
                                        </div>

                                        <p
                                            className={`font-bold ${
                                                isSoldOut
                                                    ? 'text-red-600'
                                                    : event.availableSeats < 10
                                                        ? 'text-orange-600'
                                                        : 'text-gray-900'
                                            }`}
                                        >
                                            {isSoldOut
                                                ? 'No seats available'
                                                : `${event.availableSeats} seats available`}
                                        </p>
                                    </div>

                                </div>
                            </div>

                        </div>

                        {/* Registration Card */}
                        <div className="lg:col-span-1">

                            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 md:p-7 lg:sticky lg:top-6">

                                <div className="mb-7">
                                    <p className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-2">
                                        Registration
                                    </p>

                                    <h2 className="text-2xl font-black text-gray-900">
                                        Join This Program
                                    </h2>
                                </div>

                                {/* Registration Fee */}
                                <div className="flex items-center gap-4 pb-5 border-b border-gray-200">
                                    <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                        <FaMoneyBillWave className="text-gray-700" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                                            Registration Fee
                                        </p>

                                        <p className="font-black text-xl text-gray-900">
                                            {event.ticketPrice === 0 ? (
                                                <span className="text-green-600">
                                                    Free
                                                </span>
                                            ) : (
                                                `₹${event.ticketPrice}`
                                            )}
                                        </p>
                                    </div>
                                </div>

                                {/* Availability */}
                                <div className="flex items-center gap-4 py-5 border-b border-gray-200">
                                    <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                        <FaChair className="text-gray-700" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                                            Availability
                                        </p>

                                        <p className="font-bold text-gray-900">
                                            {event.availableSeats} / {event.totalSeats}
                                        </p>
                                    </div>
                                </div>

                                {/* OTP Section */}
                                {showOTP && (
                                    <div className="py-5">
                                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
                                            <p className="font-semibold text-blue-900 mb-1">
                                                Verify Your Registration
                                            </p>

                                            <p className="text-sm text-blue-700">
                                                Enter the 6-digit OTP sent to your registered email address.
                                            </p>
                                        </div>

                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Verification Code
                                        </label>

                                        <input
                                            type="text"
                                            required
                                            placeholder="Enter 6-digit OTP"
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition shadow-sm font-bold tracking-widest text-center text-lg outline-none"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            maxLength="6"
                                            inputMode="numeric"
                                        />
                                    </div>
                                )}

                                {/* Messages */}
                                {error && (
                                    <div className="mb-4 bg-red-50 text-red-600 border border-red-100 p-3 rounded-lg text-sm font-medium">
                                        {error}
                                    </div>
                                )}

                                {successMsg && (
                                    <div className="mb-4 bg-green-50 text-green-700 border border-green-100 p-3 rounded-lg text-sm font-medium flex items-start gap-2">
                                        <FaCheckCircle className="mt-0.5 shrink-0" />
                                        <span>{successMsg}</span>
                                    </div>
                                )}

                                {/* Register Button */}
                                <button
                                    onClick={handleBooking}
                                    disabled={
                                        isSoldOut ||
                                        bookingLoading ||
                                        (successMsg && !showOTP) ||
                                        (showOTP && !otp)
                                    }
                                    className={`w-full py-4 px-6 rounded-xl font-bold text-base transition ${
                                        isSoldOut ||
                                        bookingLoading ||
                                        (successMsg && !showOTP) ||
                                        (showOTP && !otp)
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-gray-900 hover:bg-black text-white shadow-md hover:shadow-lg'
                                    }`}
                                >
                                    {bookingLoading
                                        ? 'Processing...'
                                        : showOTP
                                            ? 'Verify OTP & Register'
                                            : successMsg && !showOTP
                                                ? 'Registration Submitted'
                                                : isSoldOut
                                                    ? 'Registration Full'
                                                    : user
                                                        ? 'Register for This Program'
                                                        : 'Sign In to Register'}
                                </button>

                                <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
                                    Registration requests are subject to confirmation by the
                                    Ashirwad Co-op Credit Society administration.
                                </p>

                            </div>

                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Note */}
            <div className="text-center py-8">
                <p className="text-sm text-gray-400">
                    Ashirwad Co-op Credit Society • Programs, learning and community engagement
                </p>
            </div>

        </div>
    );
};

export default EventDetail;