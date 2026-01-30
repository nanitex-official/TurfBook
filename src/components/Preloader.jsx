import { motion } from 'framer-motion';
import { useEffect } from 'react';

const Preloader = ({ onLoadingComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onLoadingComplete();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onLoadingComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark"
        >
            {/* Animated Logo */}
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <motion.div
                    animate={{
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="bg-white rounded-2xl p-8 shadow-2xl"
                >
                    <div className="flex items-center gap-4">
                        <div className="bg-primary text-white font-bold text-5xl px-6 py-4 rounded-xl shadow-lg">
                            TF
                        </div>
                        <div className="text-left">
                            <div className="text-4xl font-bold text-gray-900">TurfBook</div>
                            <div className="text-sm text-gray-600 mt-1">Premium Turf Booking</div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Preloader;
