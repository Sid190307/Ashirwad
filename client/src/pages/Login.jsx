import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showOTP, setShowOTP] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login, verifyOTP } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!showOTP) {
                const data = await login(email, password);

                if (data.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            } else {
                const data = await verifyOTP(email, otp);

                if (data.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            }
        } catch (err) {
            if (err.needsVerification) {
                setShowOTP(true);
                setError(
                    'Your account is not verified. A new OTP has been sent to your email.'
                );
            } else {
                setError(err.message || err);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center py-12">
            <div className="w-full max-w-md">

                {/* Login Card */}
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <p className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-3">
                            ASHIRWAD CO-OP CREDIT SOCIETY
                        </p>

                        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
                            Welcome Back
                        </h1>

                        <p className="text-gray-500">
                            Sign in to access your account and manage your programs and events.
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-center border border-red-100 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Login / OTP Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {!showOTP ? (
                            <>
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
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-700 focus:border-gray-700 transition shadow-sm outline-none"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </>
                        ) : (
                            /* OTP */
                            <div>
                                <div className="text-center mb-5">
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                                        Verify Your Account
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Enter the 6-digit OTP sent to your email address.
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
                                    ? 'Verify OTP & Sign In'
                                    : 'Sign In'}
                        </button>
                    </form>

                    {/* Register Link */}
                    {!showOTP && (
                        <p className="text-center mt-8 text-gray-600">
                            Don't have an account?{' '}
                            <Link
                                to="/register"
                                className="text-gray-900 font-bold hover:underline"
                            >
                                Create an Account
                            </Link>
                        </p>
                    )}

                </div>

                {/* Supporting Text */}
                <p className="text-center text-sm text-gray-400 mt-6">
                    Secure access to Ashirwad Co-op Credit Society programs and events.
                </p>

            </div>
        </div>
    );
};

export default Login;