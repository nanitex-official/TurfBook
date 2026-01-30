import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Calendar, Users, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('bookings');
    const [bookings, setBookings] = useState([]);
    const [pricing, setPricing] = useState([]);
    const [turfDetails, setTurfDetails] = useState(null);
    const [editingItem, setEditingItem] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    // Mock data
    const mockBookings = [
        {
            id: 1,
            customerName: 'John Doe',
            customerEmail: 'john@example.com',
            date: '2026-02-05',
            time: '10:00',
            duration: '2 Hours',
            price: 5500,
            status: 'Confirmed',
        },
        {
            id: 2,
            customerName: 'Jane Smith',
            customerEmail: 'jane@example.com',
            date: '2026-02-08',
            time: '15:00',
            duration: '1 Hour',
            price: 4000,
            status: 'Confirmed',
        },
    ];

    const mockPricing = [
        { id: 1, duration: '1 Hour', weekday: 3000, weekend: 4000 },
        { id: 2, duration: '2 Hours', weekday: 5500, weekend: 7500 },
        { id: 3, duration: 'Half Day (4hrs)', weekday: 10000, weekend: 14000 },
        { id: 4, duration: 'Full Day (8hrs)', weekday: 18000, weekend: 26000 },
    ];

    const mockTurfDetails = {
        name: 'Prime Sports Arena',
        location: '123 Stadium Road, Sports District\nDowntown City, ST 12345',
        operatingHours: 'Monday - Friday: 6:00 AM - 11:00 PM\nSaturday - Sunday: 5:00 AM - 12:00 AM',
        capacity: 'Full Size: 11 vs 11 Players',
        amenities: ['Free WiFi', 'Parking', 'Safety Equipment', 'Changing Rooms'],
    };

    useEffect(() => {
        // Simulate API calls
        setBookings(mockBookings);
        setPricing(mockPricing);
        setTurfDetails(mockTurfDetails);
    }, []);

    // Booking Management
    const handleDeleteBooking = (id) => {
        if (confirm('Are you sure you want to delete this booking?')) {
            setBookings(bookings.filter(b => b.id !== id));
        }
    };

    const handleEditBooking = (booking) => {
        setEditingItem({ ...booking });
    };

    const handleSaveBooking = () => {
        setBookings(bookings.map(b => b.id === editingItem.id ? editingItem : b));
        setEditingItem(null);
    };

    // Pricing Management
    const handleDeletePricing = (id) => {
        if (confirm('Are you sure you want to delete this pricing?')) {
            setPricing(pricing.filter(p => p.id !== id));
        }
    };

    const handleEditPricing = (price) => {
        setEditingItem({ ...price });
    };

    const handleSavePricing = () => {
        setPricing(pricing.map(p => p.id === editingItem.id ? editingItem : p));
        setEditingItem(null);
    };

    const handleAddPricing = (newPricing) => {
        setPricing([...pricing, { ...newPricing, id: Date.now() }]);
        setShowAddForm(false);
    };

    // Turf Details Management
    const handleSaveTurfDetails = () => {
        setEditingItem(null);
        // In production: await axios.put('/api/turf', turfDetails);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const stats = [
        {
            label: 'Total Bookings',
            value: bookings.length,
            icon: Calendar,
            color: 'bg-blue-500',
        },
        {
            label: 'Total Revenue',
            value: `৳${bookings.reduce((sum, b) => sum + b.price, 0).toLocaleString()}`,
            icon: DollarSign,
            color: 'bg-green-500',
        },
        {
            label: 'Total Customers',
            value: new Set(bookings.map(b => b.customerEmail)).size,
            icon: Users,
            color: 'bg-purple-500',
        },
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

                {/* Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="card"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                                        <p className="text-3xl font-bold">{stat.value}</p>
                                    </div>
                                    <div className={`${stat.color} p-4 rounded-lg`}>
                                        <Icon className="text-white" size={24} />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Tabs */}
                <div className="mb-6 flex gap-4 border-b">
                    {['bookings', 'pricing', 'turf-details'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 px-4 font-semibold transition-colors capitalize ${activeTab === tab
                                ? 'text-primary border-b-2 border-primary'
                                : 'text-gray-600 hover:text-primary'
                                }`}
                        >
                            {tab.replace('-', ' ')}
                        </button>
                    ))}
                </div>

                {/* Bookings Management */}
                {activeTab === 'bookings' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Manage Bookings</h2>
                        </div>

                        {bookings.map((booking) => (
                            <div key={booking.id} className="card">
                                {editingItem?.id === booking.id ? (
                                    <div className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                value={editingItem.customerName}
                                                onChange={(e) => setEditingItem({ ...editingItem, customerName: e.target.value })}
                                                className="input-field"
                                                placeholder="Customer Name"
                                            />
                                            <input
                                                type="email"
                                                value={editingItem.customerEmail}
                                                onChange={(e) => setEditingItem({ ...editingItem, customerEmail: e.target.value })}
                                                className="input-field"
                                                placeholder="Customer Email"
                                            />
                                            <input
                                                type="date"
                                                value={editingItem.date}
                                                onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                                                className="input-field"
                                            />
                                            <input
                                                type="time"
                                                value={editingItem.time}
                                                onChange={(e) => setEditingItem({ ...editingItem, time: e.target.value })}
                                                className="input-field"
                                            />
                                            <select
                                                value={editingItem.duration}
                                                onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                                                className="input-field"
                                            >
                                                <option>1 Hour</option>
                                                <option>2 Hours</option>
                                                <option>Half Day (4hrs)</option>
                                                <option>Full Day (8hrs)</option>
                                            </select>
                                            <input
                                                type="number"
                                                value={editingItem.price}
                                                onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                                                className="input-field"
                                                placeholder="Price"
                                            />
                                        </div>
                                        <div className="flex gap-3">
                                            <button onClick={handleSaveBooking} className="btn-primary">
                                                <Save size={18} />
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditingItem(null)}
                                                className="btn-outline"
                                            >
                                                <X size={18} />
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-start">
                                        <div className="grid md:grid-cols-4 gap-4 flex-1">
                                            <div>
                                                <div className="text-sm text-gray-600">Customer</div>
                                                <div className="font-semibold">{booking.customerName}</div>
                                                <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-600">Date & Time</div>
                                                <div className="font-semibold">{formatDate(booking.date)}</div>
                                                <div className="text-sm text-gray-500">{booking.time}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-600">Duration</div>
                                                <div className="font-semibold">{booking.duration}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-600">Price</div>
                                                <div className="font-semibold text-primary text-lg">৳{booking.price.toLocaleString()}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditBooking(booking)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteBooking(booking.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Pricing Management */}
                {activeTab === 'pricing' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Manage Pricing</h2>
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="btn-primary"
                            >
                                <Plus size={18} />
                                Add Pricing
                            </button>
                        </div>

                        {showAddForm && (
                            <div className="card">
                                <h3 className="font-bold mb-4">Add New Pricing</h3>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const formData = new FormData(e.target);
                                        handleAddPricing({
                                            duration: formData.get('duration'),
                                            weekday: Number(formData.get('weekday')),
                                            weekend: Number(formData.get('weekend')),
                                        });
                                        e.target.reset();
                                    }}
                                    className="space-y-4"
                                >
                                    <input
                                        name="duration"
                                        className="input-field"
                                        placeholder="Duration (e.g., 3 Hours)"
                                        required
                                    />
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <input
                                            name="weekday"
                                            type="number"
                                            className="input-field"
                                            placeholder="Weekday Price"
                                            required
                                        />
                                        <input
                                            name="weekend"
                                            type="number"
                                            className="input-field"
                                            placeholder="Weekend Price"
                                            required
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <button type="submit" className="btn-primary">
                                            Add Pricing
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowAddForm(false)}
                                            className="btn-outline"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {pricing.map((price) => (
                            <div key={price.id} className="card">
                                {editingItem?.id === price.id ? (
                                    <div className="space-y-4">
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <input
                                                type="text"
                                                value={editingItem.duration}
                                                onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                                                className="input-field"
                                                placeholder="Duration"
                                            />
                                            <input
                                                type="number"
                                                value={editingItem.weekday}
                                                onChange={(e) => setEditingItem({ ...editingItem, weekday: Number(e.target.value) })}
                                                className="input-field"
                                                placeholder="Weekday Price"
                                            />
                                            <input
                                                type="number"
                                                value={editingItem.weekend}
                                                onChange={(e) => setEditingItem({ ...editingItem, weekend: Number(e.target.value) })}
                                                className="input-field"
                                                placeholder="Weekend Price"
                                            />
                                        </div>
                                        <div className="flex gap-3">
                                            <button onClick={handleSavePricing} className="btn-primary">
                                                <Save size={18} />
                                                Save
                                            </button>
                                            <button
                                                onClick={() => setEditingItem(null)}
                                                className="btn-outline"
                                            >
                                                <X size={18} />
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-center">
                                        <div className="grid md:grid-cols-3 gap-8 flex-1">
                                            <div>
                                                <div className="text-sm text-gray-600">Duration</div>
                                                <div className="font-semibold text-lg">{price.duration}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-600">Weekday Rate</div>
                                                <div className="font-semibold text-primary text-lg">৳{price.weekday.toLocaleString()}</div>
                                            </div>
                                            <div>
                                                <div className="text-sm text-gray-600">Weekend Rate</div>
                                                <div className="font-semibold text-primary text-lg">৳{price.weekend.toLocaleString()}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditPricing(price)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeletePricing(price.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Turf Details Management */}
                {activeTab === 'turf-details' && turfDetails && (
                    <div className="card">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Turf Details</h2>
                            {!editingItem && (
                                <button
                                    onClick={() => setEditingItem({ ...turfDetails })}
                                    className="btn-primary"
                                >
                                    <Edit size={18} />
                                    Edit Details
                                </button>
                            )}
                        </div>

                        {editingItem ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Turf Name</label>
                                    <input
                                        type="text"
                                        value={editingItem.name}
                                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                        className="input-field"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Location</label>
                                    <textarea
                                        value={editingItem.location}
                                        onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                                        className="input-field"
                                        rows="3"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Operating Hours</label>
                                    <textarea
                                        value={editingItem.operatingHours}
                                        onChange={(e) => setEditingItem({ ...editingItem, operatingHours: e.target.value })}
                                        className="input-field"
                                        rows="3"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Capacity</label>
                                    <input
                                        type="text"
                                        value={editingItem.capacity}
                                        onChange={(e) => setEditingItem({ ...editingItem, capacity: e.target.value })}
                                        className="input-field"
                                    />
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            setTurfDetails(editingItem);
                                            handleSaveTurfDetails();
                                        }}
                                        className="btn-primary"
                                    >
                                        <Save size={18} />
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={() => setEditingItem(null)}
                                        className="btn-outline"
                                    >
                                        <X size={18} />
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Turf Name</div>
                                    <div className="text-xl font-bold">{turfDetails.name}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Location</div>
                                    <div className="whitespace-pre-line">{turfDetails.location}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Operating Hours</div>
                                    <div className="whitespace-pre-line">{turfDetails.operatingHours}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Capacity</div>
                                    <div>{turfDetails.capacity}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-2">Amenities</div>
                                    <div className="flex flex-wrap gap-2">
                                        {turfDetails.amenities.map((amenity, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                                            >
                                                {amenity}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
