import React from 'react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-6 py-16">

                {/* Page Introduction */}
                <div className="text-center mb-12">
                    <p className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-3">
                        CONTACT US
                    </p>

                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                        Get in Touch
                    </h1>

                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Have a question about our programs or events?
                        Get in touch with Ashirwad Co-op Credit Society.
                    </p>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 max-w-3xl mx-auto">

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Contact Information
                    </h2>

                    <div className="space-y-6">

                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                                Ashirwad Co-op Credit Society
                            </h3>
                            <p className="text-gray-600">
                                We are happy to assist you with questions regarding
                                our programs, seminars and events.
                            </p>
                        </div>

                        <div className="border-t border-gray-100 pt-5">
                            <h3 className="font-semibold text-gray-900 mb-1">
                                Email
                            </h3>
                            <p className="text-gray-600">
                                Contact details will be updated soon.
                            </p>
                        </div>

                        <div className="border-t border-gray-100 pt-5">
                            <h3 className="font-semibold text-gray-900 mb-1">
                                Phone
                            </h3>
                            <p className="text-gray-600">
                                Contact details will be updated soon.
                            </p>
                        </div>

                        <div className="border-t border-gray-100 pt-5">
                            <h3 className="font-semibold text-gray-900 mb-1">
                                Office
                            </h3>
                            <p className="text-gray-600">
                                Address details will be updated soon.
                            </p>
                        </div>

                    </div>

                </div>

                {/* Send Message */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 max-w-3xl mx-auto mt-8">

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Send Us a Message
                    </h2>

                    <form className="space-y-5">

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name
                            </label>

                            <input
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Message
                            </label>

                            <textarea
                                rows="5"
                                placeholder="Write your message..."
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-500 resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-lg transition"
                        >
                            Send Message
                        </button>

                    </form>

                </div>

            </div>
        </div>
    );
};

export default Contact;