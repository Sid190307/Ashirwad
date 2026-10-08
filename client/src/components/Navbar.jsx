import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gray-900 shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">

                    {/* Logo / Brand */}
                    <Link
                        to="/"
                        className="text-white text-xl font-bold"
                    >
                        Ashirwad Co-op Credit Society
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">

                        <Link
                            to="/"
                            className="text-gray-200 hover:text-white transition"
                        >
                            Programs & Events
                        </Link>

                        <Link
                            to="/about"
                            className="text-gray-200 hover:text-white transition"
                        >
                            About Us
                        </Link>

                        <Link
                            to="/contact"
                            className="text-gray-200 hover:text-white transition"
                        >
                            Contact Us
                        </Link>

                        {user ? (
                            <>
                                <Link
                                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                                    className="text-gray-200 hover:text-white transition"
                                >
                                    My Dashboard
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="bg-gray-700 hover:bg-black text-white px-4 py-2 rounded-md transition"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-200 hover:text-white transition"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="bg-white text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-md font-semibold transition"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;