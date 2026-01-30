import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users, Wifi, Car, Shield, Home as HomeIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const HomePage = () => {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const heroImages = [
        {
            url: 'https://images.unsplash.com/photo-1624880357913-a8539238245b?q=80&w=2070',
            title: 'Turf Field',
            position: 'center 50%',
        },
        {
            url: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=2070',
            title: 'Football Turf',
            position: 'center 40%',
        },
        {
            url: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=2070',
            title: 'Cricket Turf',
            position: 'center 45%',
        },
        {
            url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2070',
            title: 'Indoor Turf',
            position: 'center 50%',
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const infoCards = [
        {
            icon: MapPin,
            title: 'Location',
            content: '123 Stadium Road, Sports District\nDowntown City, ST 12345',
        },
        {
            icon: Clock,
            title: 'Operating Hours',
            content: 'Monday - Friday: 6:00 AM - 11:00 PM\nSaturday - Sunday: 5:00 AM - 12:00 AM',
        },
        {
            icon: Users,
            title: 'Capacity',
            content: 'Full Size: 11 vs 11 Players\nPerfect for tournaments',
        },
    ];

    const amenities = [
        { icon: Wifi, label: 'Free WiFi' },
        { icon: Car, label: 'Parking' },
        { icon: Shield, label: 'Safety Equipment' },
        { icon: HomeIcon, label: 'Changing Rooms' },
    ];

    const pricingPlans = [
        { duration: '1 Hour', weekday: '৳3,000', weekend: '৳4,000' },
        { duration: '2 Hours', weekday: '৳5,500', weekend: '৳7,500' },
        { duration: 'Half Day (4hrs)', weekday: '৳10,000', weekend: '৳14,000' },
        { duration: 'Full Day (8hrs)', weekday: '৳18,000', weekend: '৳26,000' },
    ];

    return (
        <div className="overflow-x-hidden">
            {/* Hero Section with Carousel */}
            <section className="relative min-h-screen h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
                {/* Background Images Carousel */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('${heroImages[currentImageIndex].url}')`,
                            backgroundPosition: heroImages[currentImageIndex].position,
                        }}
                    />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
                <div className="absolute inset-0 bg-primary/10" />

                {/* Carousel Indicators */}
                <div className="absolute bottom-16 md:bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2 md:gap-3 z-20">
                    {heroImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`transition-all duration-300 rounded-full ${
                                index === currentImageIndex
                                    ? 'w-12 h-3 bg-white'
                                    : 'w-3 h-3 bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6"
                        style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.5)' }}
                    >
                        Prime Sports Arena
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg sm:text-xl md:text-3xl mb-8 md:mb-10 text-white font-light px-4"
                        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}
                    >
                        Premium Quality Turf for Your Perfect Game
                    </motion.p>
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                        onClick={() => navigate('/book')}
                        className="btn-primary text-base md:text-lg px-6 py-3 md:px-10 md:py-5 shadow-2xl hover:scale-105 transition-transform duration-300 mx-auto"
                    >
                        <Calendar className="w-6 h-6" />
                        Book Your Slot Now
                    </motion.button>
                </div>
            </section>

            {/* Info Cards */}
            <section className="py-12 md:py-16 px-4 max-w-7xl mx-auto">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 -mt-20 md:-mt-32 relative z-20">
                    {infoCards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <div key={index} className="info-card card">
                                <Icon className="w-12 h-12 text-primary mb-4" />
                                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                                <p className="text-gray-600 whitespace-pre-line">{card.content}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* About Section */}
            <section className="py-12 md:py-20 px-4 bg-white">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">About Our Turf</h2>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Prime Sports Arena features a state-of-the-art artificial turf that
                            provides the perfect playing surface for soccer, cricket, and other
                            sports. Our facility is equipped with professional-grade lighting for
                            night matches and comfortable seating for spectators.
                        </p>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Whether you're organizing a friendly match, training session, or
                            competitive tournament, our turf offers the ideal environment for
                            players of all skill levels.
                        </p>

                        {/* Amenities */}
                        <div className="grid grid-cols-2 gap-4">
                            {amenities.map((amenity, index) => {
                                const Icon = amenity.icon;
                                return (
                                    <div key={index} className="flex items-center gap-3 text-gray-700">
                                        <Icon className="w-5 h-5 text-primary" />
                                        <span>{amenity.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="rounded-2xl overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1589487391730-58f20eb2c308?q=80&w=2074"
                            alt="Turf aerial view"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-12 md:py-20 px-4 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="section-title">Pricing Plans</h2>

                    {/* Desktop Table View */}
                    <div className="hidden md:block bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="grid grid-cols-3 bg-primary text-white font-bold text-lg">
                            <div className="p-4 md:p-6">Duration</div>
                            <div className="p-4 md:p-6">Weekday Rate</div>
                            <div className="p-4 md:p-6">Weekend Rate</div>
                        </div>

                        {pricingPlans.map((plan, index) => (
                            <div
                                key={index}
                                className={`grid grid-cols-3 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                            >
                                <div className="p-4 md:p-6 font-semibold text-base md:text-lg">{plan.duration}</div>
                                <div className="p-4 md:p-6 text-primary font-bold text-base md:text-lg">{plan.weekday}</div>
                                <div className="p-4 md:p-6 text-primary font-bold text-base md:text-lg">{plan.weekend}</div>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden space-y-3">
                        {pricingPlans.map((plan, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
                            >
                                <div className="bg-primary text-white px-4 py-3 font-bold text-base">
                                    {plan.duration}
                                </div>
                                <div className="p-4 space-y-2.5">
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-gray-600 text-sm font-medium">Weekday</span>
                                        <span className="text-primary font-bold text-lg">{plan.weekday}</span>
                                    </div>
                                    <div className="h-px bg-gray-200"></div>
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-gray-600 text-sm font-medium">Weekend</span>
                                        <span className="text-primary font-bold text-lg">{plan.weekend}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-primary to-primary-dark text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Ready to Play?</h2>
                    <p className="text-base md:text-xl mb-6 md:mb-8 text-white/90">
                        Book your slot now and experience the best turf facility in the city.
                        Easy booking process and instant confirmation!
                    </p>
                    <button
                        onClick={() => navigate('/book')}
                        className="bg-white text-primary hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300 inline-flex items-center gap-2 shadow-2xl hover:scale-105"
                    >
                        <Calendar className="w-5 h-5" />
                        Book Your Slot
                    </button>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
