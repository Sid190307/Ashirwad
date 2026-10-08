import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register, verifyOTP } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!showOTP) {
                await register(name, email, password);
                setShowOTP(true);
                setError('');
            } else {
                await verifyOTP(email, otp);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message || err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center py-12">
            <div className="w-full max-w-md">

                {/* Registration Card */}
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <p className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-3">
                            ASHIRWAD CO-OP CREDIT SOCIETY
                        </p>

                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
                            Create an Account
                        </h1>

                        <p className="text-gray-500">
                            Register to discover and participate in our programs and events.
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-center border border-red-100 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Registration / OTP Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {!showOTP ? (
                            <>
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter your full name"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition shadow-sm outline-none"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        required
                                        placeholder="Enter your email address"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition shadow-sm outline-none"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        required
                                        placeholder="Create a password"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition shadow-sm outline-none"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <p className="text-xs text-gray-400 mt-2">
                                        Use a strong password to keep your account secure.
                                    </p>
                                </div>
                            </>
                        ) : (
                            /* OTP Verification */
                            <div>
                                <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-5 border border-green-200">
                                    <p className="font-semibold mb-1">
                                        Verification code sent
                                    </p>

                                    <p className="text-sm">
                                        An OTP has been sent to your email address.
                                        Enter the code below to verify your account.
                                    </p>
                                </div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Verification Code
                                </label>

                                <input
                                    type="text"
                                    required
                                    placeholder="Enter 6-digit OTP"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition shadow-sm font-bold tracking-widest text-center text-lg outline-none"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    maxLength="6"
                                    inputMode="numeric"
                                />
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg hover:bg-black focus:ring-4 focus:ring-gray-200 transition shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading
                                ? 'Processing...'
                                : showOTP
                                    ? 'Verify & Complete Registration'
                                    : 'Create Account'}
                        </button>
                    </form>

                    {/* Login Link */}
                    {!showOTP && (
                        <p className="text-center mt-8 text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-gray-900 font-bold hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                    )}

                </div>

                {/* Supporting Text */}
                <p className="text-center text-sm text-gray-400 mt-6">
                    Join Ashirwad Co-op Credit Society programs and events.
                </p>

            </div>
        </div>
    );
};

export default Register;