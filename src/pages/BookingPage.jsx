import { useState, useEffect } from 'react';
import { Calendar, Clock, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';

const BookingPage = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState('1 Hour');
    const [rateType, setRateType] = useState('Weekday');
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    // Generate dates for the next 2 weeks
    const generateDates = () => {
        const dates = [];
        const today = new Date();

        for (let i = 0; i < 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
        }

        return dates;
    };

    // Generate time slots
    const timeSlots = [
        '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
        '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
        '18:00', '19:00', '20:00', '21:00', '22:00'
    ];

    const durations = [
        { label: '1 Hour', weekday: 3000, weekend: 4000 },
        { label: '2 Hours', weekday: 5500, weekend: 7500 },
        { label: 'Half Day (4hrs)', weekday: 10000, weekend: 14000 },
        { label: 'Full Day (8hrs)', weekday: 18000, weekend: 26000 },
    ];

    const dates = generateDates();

    useEffect(() => {
        // Set first available date by default
        if (dates.length > 0) {
            setSelectedDate(dates[0]);
            updateRateType(dates[0]);
        }
    }, []);

    const updateRateType = (date) => {
        const day = date.getDay();
        setRateType(day === 0 || day === 6 ? 'Weekend' : 'Weekday');
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        updateRateType(date);
        setSelectedTime(null);
    };

    const calculatePrice = () => {
        const duration = durations.find(d => d.label === selectedDuration);
        return rateType === 'Weekday' ? duration.weekday : duration.weekend;
    };

    const handleBooking = async () => {
        if (!selectedDate || !selectedTime) {
            alert('Please select both date and time');
            return;
        }

        setLoading(true);

        const bookingData = {
            date: selectedDate.toISOString(),
            time: selectedTime,
            duration: selectedDuration,
            rateType,
            price: calculatePrice(),
            customerName: 'Guest User', // In production, get from auth
            customerEmail: 'guest@example.com',
        };

        try {
            // For now, we'll just simulate the booking
            // await axios.post('http://localhost:5000/api/bookings', bookingData);

            alert('Booking confirmed! Your booking details have been saved.');

            // Reset form
            setSelectedTime(null);

        } catch (error) {
            console.error('Booking error:', error);
            alert('Booking failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const formatFullDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Book Your Slot</h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Booking Form */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Date Selection */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="card"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="text-primary" />
                                <h2 className="text-xl font-bold">Select Date</h2>
                            </div>

                            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-3">
                                {dates.map((date, index) => {
                                    const isSelected = selectedDate &&
                                        date.toDateString() === selectedDate.toDateString();

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleDateSelect(date)}
                                            className={`p-2 sm:p-3 rounded-lg border-2 transition-all ${isSelected
                                                ? 'border-primary bg-primary text-white'
                                                : 'border-gray-200 hover:border-primary hover:bg-primary/5'
                                                }`}
                                        >
                                            <div className="text-[10px] sm:text-xs opacity-75">
                                                {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                            </div>
                                            <div className="text-base sm:text-lg font-bold">
                                                {date.getDate()}
                                            </div>
                                            <div className="text-[10px] sm:text-xs opacity-75">
                                                {date.toLocaleDateString('en-US', { month: 'short' })}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Duration Selection */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="card"
                        >
                            <h2 className="text-lg md:text-xl font-bold mb-4">Select Duration</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {durations.map((duration) => (
                                    <button
                                        key={duration.label}
                                        onClick={() => setSelectedDuration(duration.label)}
                                        className={`p-3 rounded-lg border-2 transition-all ${selectedDuration === duration.label
                                            ? 'border-primary bg-primary text-white'
                                            : 'border-gray-200 hover:border-primary'
                                            }`}
                                    >
                                        {duration.label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Time Slot Selection */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="card"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Clock className="text-primary" />
                                <h2 className="text-lg md:text-xl font-bold">Select Time Slot</h2>
                            </div>

                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
                                {timeSlots.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`p-2 sm:p-3 rounded-lg border-2 transition-all font-medium text-sm sm:text-base ${selectedTime === time
                                            ? 'border-primary bg-primary text-white'
                                            : 'border-gray-200 hover:border-primary hover:bg-primary/5'
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Booking Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="card h-fit lg:sticky lg:top-24"
                    >
                        <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Booking Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Date</div>
                                <div className="font-semibold">
                                    {selectedDate ? formatFullDate(selectedDate) : 'Not selected'}
                                </div>
                            </div>

                            <div>
                                <div className="text-sm text-gray-600 mb-1">Time</div>
                                <div className="font-semibold">
                                    {selectedTime || 'Not selected'}
                                </div>
                            </div>

                            <div>
                                <div className="text-sm text-gray-600 mb-1">Duration</div>
                                <div className="font-semibold">{selectedDuration}</div>
                            </div>

                            <div>
                                <div className="text-sm text-gray-600 mb-1">Rate Type</div>
                                <div className="font-semibold">{rateType}</div>
                            </div>
                        </div>

                        <div className="border-t pt-4 mb-6">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-bold">Total Price</span>
                                <span className="text-3xl font-bold text-primary">
                                    ৳{calculatePrice().toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 flex gap-2">
                            <Info className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
                            <p className="text-sm text-blue-800">
                                Your booking will be confirmed immediately after submission.
                            </p>
                        </div>

                        <button
                            onClick={handleBooking}
                            disabled={!selectedDate || !selectedTime || loading}
                            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : 'Confirm Booking'}
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
