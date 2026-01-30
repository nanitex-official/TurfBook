import { useState, useEffect } from 'react';
import { Calendar, Clock, DollarSign, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const MyBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    // Mock bookings data - In production, fetch from API
    const mockBookings = [
        {
            id: 1,
            date: '2026-02-05',
            time: '10:00',
            duration: '2 Hours',
            price: 5500,
            status: 'Confirmed',
            createdAt: '2026-01-30',
        },
        {
            id: 2,
            date: '2026-02-08',
            time: '15:00',
            duration: '1 Hour',
            price: 4000,
            status: 'Confirmed',
            createdAt: '2026-01-29',
        },
        {
            id: 3,
            date: '2026-02-12',
            time: '18:00',
            duration: 'Half Day (4hrs)',
            price: 14000,
            status: 'Confirmed',
            createdAt: '2026-01-28',
        },
    ];

    useEffect(() => {
        // Simulate API call
        setLoading(true);
        setTimeout(() => {
            setBookings(mockBookings);
            setLoading(false);
        }, 500);
    }, []);

    const handleCancelBooking = (id) => {
        if (confirm('Are you sure you want to cancel this booking?')) {
            setBookings(bookings.filter(b => b.id !== id));
            // In production: await axios.delete(`/api/bookings/${id}`);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">My Bookings</h1>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : bookings.length === 0 ? (
                    <div className="card text-center py-16">
                        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No bookings yet
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Book your first slot to see it here
                        </p>
                        <a href="/book" className="btn-primary inline-flex mx-auto">
                            Book Now
                        </a>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking, index) => (
                            <motion.div
                                key={booking.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="card hover:shadow-2xl"
                            >
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    {/* Booking Details */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${booking.status === 'Confirmed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                    }`}
                                            >
                                                {booking.status}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                Booked on {formatDate(booking.createdAt)}
                                            </span>
                                        </div>

                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="flex items-start gap-3">
                                                <Calendar className="text-primary mt-1 flex-shrink-0" size={20} />
                                                <div>
                                                    <div className="text-sm text-gray-600">Date</div>
                                                    <div className="font-semibold">{formatDate(booking.date)}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <Clock className="text-primary mt-1 flex-shrink-0" size={20} />
                                                <div>
                                                    <div className="text-sm text-gray-600">Time & Duration</div>
                                                    <div className="font-semibold">
                                                        {booking.time} ({booking.duration})
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <DollarSign className="text-primary mt-1 flex-shrink-0" size={20} />
                                                <div>
                                                    <div className="text-sm text-gray-600">Total Price</div>
                                                    <div className="font-semibold text-primary text-lg">
                                                        ৳{booking.price.toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex md:flex-col gap-3 justify-end">
                                        <button
                                            onClick={() => handleCancelBooking(booking.id)}
                                            className="flex items-center gap-2 px-4 py-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all font-semibold"
                                        >
                                            <Trash2 size={18} />
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookingsPage;
