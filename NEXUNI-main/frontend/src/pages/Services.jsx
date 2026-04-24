import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Filter, Star, MoreHorizontal, ChevronLeft, ChevronRight, Code, PenTool, Edit3, Video, FileText } from 'lucide-react';

export default function Services() {
    const [servicesData, setServicesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getIconForCategory = (category) => {
        switch(category) {
            case 'Development': return Code;
            case 'Design & Creative': return PenTool;
            case 'Writing': return Edit3;
            case 'Video & Audio': return Video;
            default: return FileText;
        }
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/services');
                const data = await res.json();
                
                if (data.success) {
                    // Group services by category
                    const grouped = {};
                    data.data.forEach(service => {
                        const cat = service.category || 'Other';
                        if (!grouped[cat]) {
                            grouped[cat] = {
                                category: cat.toUpperCase(),
                                icon: getIconForCategory(cat),
                                items: []
                            };
                        }
                        
                        grouped[cat].items.push({
                            id: service._id,
                            title: service.title,
                            price: service.pricing?.basePrice || 0,
                            experience: 'EXPERT', // Hardcoded for now until user profile has experience level
                            published: new Date(service.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                            rating: service.rating || 5.0,
                            reviews: service.reviews || 0,
                            user: service.sellerId?.name || 'Anonymous',
                            avatar: service.sellerId?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
                            thumbnail: service.thumbnail === 'no-photo.jpg' ? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop' : service.thumbnail
                        });
                    });

                    setServicesData(Object.values(grouped));
                }
            } catch (err) {
                console.error("Failed to fetch services", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-7xl mx-auto space-y-8 pb-20">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Browse Services</h1>
                    <p className="text-slate-300">Manage and discover professional freelance listings across the ecosystem.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/10 text-sm font-medium">
                            Category <ChevronDown className="w-4 h-4 text-slate-400" />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/10 text-sm font-medium">
                            Price Range <ChevronDown className="w-4 h-4 text-slate-400" />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/10 text-sm font-medium">
                            Experience <ChevronDown className="w-4 h-4 text-slate-400" />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/10 text-sm font-medium">
                            Rating <ChevronDown className="w-4 h-4 text-slate-400" />
                        </button>
                        
                        <div className="w-px h-6 bg-white/10 mx-2"></div>
                        
                        <button className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
                            <Filter className="w-4 h-4" /> Clear All
                        </button>
                    </div>
                    
                    <div className="text-sm text-slate-300">
                        {isLoading ? 'Loading...' : `Showing results`}
                    </div>
                </div>

                {/* Main List */}
                <div className="bg-brand-card rounded-2xl overflow-hidden shadow-card min-h-[400px]">
                    {/* List Header */}
                    <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                        <div className="col-span-12 lg:col-span-5 text-xs font-bold text-slate-400 uppercase tracking-widest">Service Title</div>
                        <div className="hidden lg:block lg:col-span-1 text-xs font-bold text-slate-400 uppercase tracking-widest">Price</div>
                        <div className="hidden lg:block lg:col-span-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Experience</div>
                        <div className="hidden lg:block lg:col-span-2 text-xs font-bold text-slate-400 uppercase tracking-widest">Published</div>
                        <div className="hidden lg:block lg:col-span-1 text-xs font-bold text-slate-400 uppercase tracking-widest">Rating</div>
                        <div className="hidden lg:flex lg:col-span-1 text-xs font-bold text-slate-400 uppercase tracking-widest justify-end">Actions</div>
                    </div>

                    {/* Services Groups */}
                    {isLoading ? (
                        <div className="flex items-center justify-center h-64 text-slate-400 font-bold">Loading Services...</div>
                    ) : servicesData.length === 0 ? (
                        <div className="flex items-center justify-center h-64 text-slate-400 font-bold">No services found. Be the first to create one!</div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {servicesData.map((group, gIndex) => {
                                const GroupIcon = group.icon;
                                return (
                                    <div key={gIndex} className="pb-2">
                                        {/* Group Header */}
                                        <div className="px-6 py-4 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-50/30">
                                            <GroupIcon className="w-4 h-4 text-slate-400" />
                                            {group.category}
                                        </div>
                                        
                                        {/* Group Items */}
                                        <div className="divide-y divide-slate-50">
                                            {group.items.map((item) => (
                                                <div key={item.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-slate-50/50 transition-colors group cursor-pointer">
                                                    <div className="col-span-12 lg:col-span-5 flex items-center gap-4">
                                                        <img src={item.thumbnail} alt={item.title} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                                                        <div>
                                                            <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{item.title}</h4>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <img src={item.avatar} alt={item.user} className="w-5 h-5 rounded-full object-cover border border-slate-200" />
                                                                <span className="text-xs text-slate-500">{item.user}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-6 lg:col-span-1 mt-2 lg:mt-0 font-bold text-slate-900">
                                                        ₹{item.price.toLocaleString()}
                                                    </div>
                                                    <div className="col-span-6 lg:col-span-2 mt-2 lg:mt-0">
                                                        <span className={`inline-flex px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                                                            item.experience === 'EXPERT' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'
                                                        }`}>
                                                            {item.experience}
                                                        </span>
                                                    </div>
                                                    <div className="col-span-4 lg:col-span-2 mt-2 lg:mt-0 text-sm text-slate-500">
                                                        {item.published}
                                                    </div>
                                                    <div className="col-span-4 lg:col-span-1 mt-2 lg:mt-0 flex items-center gap-1">
                                                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                                        <span className="text-sm font-bold text-slate-900">{item.rating}</span>
                                                        <span className="text-xs text-slate-400">({item.reviews})</span>
                                                    </div>
                                                    <div className="col-span-4 lg:col-span-1 flex justify-end mt-2 lg:mt-0">
                                                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                                            <MoreHorizontal className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-300">
                        Showing results
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-1">
                            <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-brand-bg font-bold shadow-lg">1</button>
                        </div>
                        <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
