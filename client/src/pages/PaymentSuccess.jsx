import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaCalendarAlt } from 'react-icons/fa';

const PaymentSuccess = () => {
    return (
        <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 max-w-lg w-full text-center p-8 md:p-10">

                {/* Brand */}
                <p className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-5">
                    ASHIRWAD CO-OP CREDIT SOCIETY
                </p>

                {/* Success Icon */}
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCheckCircle className="text-green-500 text-5xl" />
                </div>

                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                    Registration Successful!
                </h1>

                {/* Message */}
                <p className="text-gray-600 leading-relaxed mb-8">
                    Your registration request has been submitted successfully.
                    You can view your registered programs and events from your
                    member dashboard.
                </p>

                {/* Status Information */}
                <div className="bg-green-50 border border-green-100 rounded-xl p-5 mb-8 text-left">
                    <div className="flex items-start gap-3">
                        <FaCalendarAlt className="text-green-600 mt-1 shrink-0" />

                        <div>
                            <h3 className="font-bold text-green-900 mb-1">
                                Registration Submitted
                            </h3>

                            <p className="text-sm text-green-700 leading-relaxed">
                                Your registration is being processed. If admin
                                confirmation is required, you can check the
                                registration status from your dashboard.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">

                    <Link
                        to="/dashboard"
                        className="block w-full bg-gray-900 hover:bg-black text-white font-bold py-3.5 px-6 rounded-xl transition shadow-md"
                    >
                        View My Registrations
                    </Link>

                    <Link
                        to="/"
                        className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 px-6 rounded-xl transition"
                    >
                        Explore More Programs & Events
                    </Link>

                </div>

                {/* Footer Note */}
                <p className="text-xs text-gray-400 mt-7 leading-relaxed">
                    Thank you for participating in programs organized by
                    Ashirwad Co-op Credit Society.
                </p>

            </div>
        </div>
    );
};

export default PaymentSuccess;