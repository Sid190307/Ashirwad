import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-5xl mx-auto px-6 py-16">

                {/* Page Introduction */}
                <div className="text-center mb-12">
                    <p className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-3">
                        WHO WE ARE
                    </p>

                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                        Learn. Connect. Grow.
                    </h1>

                    <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
                        Explore seminars, workshops, financial awareness programs,
                        career sessions and community events organized by Ashirwad
                        Co-op Credit Society for students, professionals and the
                        wider community.
                    </p>
                </div>

                {/* Main Information Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">

                    {/* What We Offer */}
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        What We Offer
                    </h2>

                    <p className="text-gray-600 leading-relaxed">
                        Our programs provide opportunities for students, professionals
                        and the wider community to learn, connect and participate in
                        meaningful educational, awareness and community activities.
                    </p>

                    {/* Who Can Participate */}
                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Who Can Participate?
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            Our programs are designed for college students, commerce
                            students, professionals and members of the wider community.
                        </p>
                    </div>

                    {/* Our Focus */}
                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Our Focus
                        </h2>

                        <p className="text-gray-600 leading-relaxed">
                            We focus on creating opportunities for learning, financial
                            awareness, professional development and community
                            participation through our programs and events.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default About;