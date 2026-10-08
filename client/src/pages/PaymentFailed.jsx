import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';

const PaymentFailed = () => {
    return (
        <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 max-w-lg w-full text-center p-8 md:p-10">

                {/* Brand */}
                <p className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-5">
                    ASHIRWAD CO-OP CREDIT SOCIETY
                </p>

                {/* Error Icon */}
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaTimesCircle className="text-red-500 text-5xl" />
                </div>

                {/* Heading */}
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                    Registration Unsuccessful
                </h1>

                {/* Message */}
                <p className="text-gray-600 leading-relaxed mb-8">
                    We were unable to complete your registration at this time.
                    Please try registering again or return to the programs and
                    events page.
                </p>

                {/* Information Box */}
                <div className="bg-red-50 border border-red-100 rounded-xl p-5 mb-8 text-left">
                    <div className="flex items-start gap-3">
                        <FaExclamationTriangle className="text-red-500 mt-1 shrink-0" />

                        <div>
                            <h3 className="font-bold text-red-900 mb-1">
                                What can you do?
                            </h3>

                            <p className="text-sm text-red-700 leading-relaxed">
                                Check your internet connection and try again.
                                If the problem continues, please contact
                                Ashirwad Co-op Credit Society for assistance.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">

                    <Link
                        to="/"
                        className="block w-full bg-gray-900 hover:bg-black text-white font-bold py-3.5 px-6 rounded-xl transition shadow-md"
                    >
                        Explore Programs & Events
                    </Link>

                    <Link
                        to="/dashboard"
                        className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 px-6 rounded-xl transition"
                    >
                        Go to Member Dashboard
                    </Link>

                </div>

                {/* Footer Note */}
                <p className="text-xs text-gray-400 mt-7 leading-relaxed">
                    If you continue to experience difficulties, please contact
                    Ashirwad Co-op Credit Society.
                </p>

            </div>
        </div>
    );
};

export default PaymentFailed;