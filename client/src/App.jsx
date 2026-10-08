import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import EventDetail from './pages/EventDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">

                <Navbar />

                <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    <Routes>

                        {/* Public Pages */}
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />

                        {/* Event Pages */}
                        <Route path="/events/:id" element={<EventDetail />} />

                        {/* Authentication */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Member & Admin */}
                        <Route path="/dashboard" element={<UserDashboard />} />
                        <Route path="/admin" element={<AdminDashboard />} />

                        {/* Registration Status Pages */}
                        <Route
                            path="/payment-success"
                            element={<PaymentSuccess />}
                        />

                        <Route
                            path="/payment-failed"
                            element={<PaymentFailed />}
                        />

                        {/* 404 */}
                        <Route
                            path="*"
                            element={
                                <div className="min-h-[60vh] flex items-center justify-center">
                                    <div className="text-center">

                                        <p className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-3">
                                            ASHIRWAD CO-OP CREDIT SOCIETY
                                        </p>

                                        <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-4">
                                            404
                                        </h1>

                                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                                            Page Not Found
                                        </h2>

                                        <p className="text-gray-500 max-w-md mx-auto mb-7">
                                            The page you are looking for does not exist
                                            or may have been moved.
                                        </p>

                                        <Link
                                            to="/"
                                            className="inline-block bg-gray-900 hover:bg-black text-white font-bold px-7 py-3 rounded-lg transition"
                                        >
                                            Back to Programs & Events
                                        </Link>

                                    </div>
                                </div>
                            }
                        />

                    </Routes>

                </main>

            </div>
        </Router>
    );
}

export default App;