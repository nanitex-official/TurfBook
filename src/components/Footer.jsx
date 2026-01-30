import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Clock } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Book Now', path: '/book' },
        { name: 'My Bookings', path: '/my-bookings' },
        { name: 'Sign In', path: '/signin' },
    ];

    const socialLinks = [
        { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
        { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
        { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
    ];

    const operatingHours = [
        { day: 'Monday - Friday', time: '6:00 AM - 11:00 PM' },
        { day: 'Saturday - Sunday', time: '5:00 AM - 12:00 AM' },
    ];

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {/* About Section */}
                    <div className="space-y-4">
                        <h3 className="text-white text-xl font-bold mb-4">TurfBook</h3>
                        <p className="text-sm leading-relaxed">
                            Premium quality turf for your perfect game. Experience the best sports facility with state-of-the-art amenities.
                        </p>
                        <div className="flex space-x-4 pt-2">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors"
                                        aria-label={social.label}
                                    >
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-sm hover:text-primary transition-colors flex items-center"
                                    >
                                        <span className="mr-2">→</span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start space-x-3">
                                <MapPin size={18} className="mt-1 flex-shrink-0 text-primary" />
                                <span className="text-sm">123 Sports Avenue, Dhaka 1212, Bangladesh</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Phone size={18} className="mt-1 flex-shrink-0 text-primary" />
                                <span className="text-sm">+880 1234-567890</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Mail size={18} className="mt-1 flex-shrink-0 text-primary" />
                                <span className="text-sm">info@turfbook.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Operating Hours */}
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-bold mb-4">Operating Hours</h3>
                        <ul className="space-y-3">
                            {operatingHours.map((schedule, index) => (
                                <li key={index} className="flex items-start space-x-3">
                                    <Clock size={18} className="mt-1 flex-shrink-0 text-primary" />
                                    <div className="text-sm">
                                        <div className="font-semibold text-white">{schedule.day}</div>
                                        <div className="text-gray-400">{schedule.time}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-400 text-center md:text-left">
                            © {currentYear} TurfBook. All rights reserved.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                Terms of Service
                            </a>
                            <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                                Refund Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
