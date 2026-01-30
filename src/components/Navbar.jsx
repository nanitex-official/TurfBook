import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, BookOpen, Shield, LogIn, UserPlus, User, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Check localStorage for user session on mount
    useEffect(() => {
        const userSession = localStorage.getItem('userSession');
        if (userSession) {
            const session = JSON.parse(userSession);
            setIsSignedIn(session.isSignedIn);
            setIsAdmin(session.isAdmin || false);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const navItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/book', label: 'Book Now', icon: Calendar },
        { path: '/my-bookings', label: 'My Bookings', icon: BookOpen },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="bg-primary text-white font-bold text-xl px-3 py-1 rounded-lg">
                            TF
                        </div>
                        <span className="text-xl font-bold text-gray-900">TurfBook</span>
                    </Link>

                    {/* Navigation Items */}
                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center gap-2 font-medium transition-colors ${isActive
                                            ? 'text-primary'
                                            : 'text-gray-600 hover:text-primary'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}

                        {/* Admin Link - Only show when signed in as admin */}
                        {isSignedIn && isAdmin && (
                            <Link
                                to="/admin"
                                className="flex items-center gap-2 font-medium text-gray-600 hover:text-primary transition-colors"
                            >
                                <Shield size={20} />
                                <span>Admin</span>
                            </Link>
                        )}

                        {/* Sign In & Sign Up Buttons - Only show when NOT signed in */}
                        {!isSignedIn ? (
                            <div className="flex items-center gap-3 ml-2">
                                <Link
                                    to="/signin"
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-primary font-medium transition-colors"
                                >
                                    <LogIn size={18} />
                                    <span>Sign In</span>
                                </Link>
                                <Link
                                    to="/signup"
                                    className="btn-primary"
                                >
                                    <UserPlus size={18} />
                                    <span>Sign Up</span>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3 ml-2">
                                <Link
                                    to="/my-bookings"
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-primary font-medium transition-colors"
                                >
                                    <User size={18} />
                                    <span>Profile</span>
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsSignedIn(false);
                                        setIsAdmin(false);
                                        localStorage.removeItem('userSession');
                                        alert('Signed out successfully!');
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 font-medium transition-colors"
                                >
                                    <LogOut size={18} />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-gray-700 hover:text-primary transition-colors"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden border-t border-gray-200 overflow-hidden"
                        >
                            <div className="py-4 space-y-2">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = location.pathname === item.path;

                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                                isActive
                                                    ? 'bg-primary/10 text-primary font-semibold'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            <Icon size={20} />
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                })}

                                {/* Admin Link - Mobile */}
                                {isSignedIn && isAdmin && (
                                    <Link
                                        to="/admin"
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        <Shield size={20} />
                                        <span>Admin</span>
                                    </Link>
                                )}

                                {/* Auth Buttons - Mobile */}
                                {!isSignedIn ? (
                                    <div className="space-y-2 pt-2 border-t border-gray-200 mt-2">
                                        <Link
                                            to="/signin"
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            <LogIn size={20} />
                                            <span>Sign In</span>
                                        </Link>
                                        <Link
                                            to="/signup"
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
                                        >
                                            <UserPlus size={20} />
                                            <span>Sign Up</span>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-2 pt-2 border-t border-gray-200 mt-2">
                                        <Link
                                            to="/my-bookings"
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            <User size={20} />
                                            <span>Profile</span>
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setIsSignedIn(false);
                                                setIsAdmin(false);
                                                localStorage.removeItem('userSession');
                                                alert('Signed out successfully!');
                                            }}
                                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                                        >
                                            <LogOut size={20} />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
