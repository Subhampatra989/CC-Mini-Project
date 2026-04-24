import React, { useState, useEffect } from 'react';
import { FileText, CreditCard, PlusSquare, Tag, Info, Trash2, Edit2, Plus, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function MyFreelanceService() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Development');
    const [description, setDescription] = useState('');
    
    // Pricing
    const [basePrice, setBasePrice] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('1 Day');
    const [revisions, setRevisions] = useState('1 Revision');
    const [currency, setCurrency] = useState('INR');

    // Extras
    const [extras, setExtras] = useState([{ name: '', description: '', price: '' }]);
    
    // Tags
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);
    
    // Edit state
    const [editingId, setEditingId] = useState(null);

    // API stuff
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchMyServices();
    }, []);

    const fetchMyServices = async () => {
        try {
            const userStr = localStorage.getItem('user');
            if (!userStr) return;
            const { token } = JSON.parse(userStr);

            const res = await fetch('http://localhost:5000/api/services/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setServices(data.data);
            }
        } catch (err) {
            console.error('Failed to fetch services', err);
        }
    };

    const handleEditClick = (service) => {
        setEditingId(service._id);
        setTitle(service.title);
        setCategory(service.category);
        setDescription(service.description);
        
        if (service.pricing) {
            if (service.pricing.basePrice) setBasePrice(service.pricing.basePrice);
            if (service.pricing.deliveryTime) setDeliveryTime(service.pricing.deliveryTime);
            if (service.pricing.revisions) setRevisions(service.pricing.revisions);
            if (service.pricing.currency) setCurrency(service.pricing.currency);
        }
        
        if (service.extras && service.extras.length > 0) {
            setExtras(service.extras);
        } else {
            setExtras([{ name: '', description: '', price: '' }]);
        }
        
        if (service.tags && service.tags.length > 0) {
            setTags(service.tags);
        } else {
            setTags([]);
        }
        // Scroll to top to show form
        document.getElementById('scroll-container')?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setTitle('');
        setCategory('Development');
        setDescription('');
        setBasePrice('');
        setDeliveryTime('1 Day');
        setRevisions('1 Revision');
        setCurrency('INR');
        setExtras([{ name: '', description: '', price: '' }]);
        setTags([]);
        setTagInput('');
    };

    const handleDeleteService = async (serviceId) => {
        if (!window.confirm('Are you sure you want to delete this service?')) return;
        
        try {
            const userStr = localStorage.getItem('user');
            if (!userStr) return;
            const { token } = JSON.parse(userStr);

            const res = await fetch(`http://localhost:5000/api/services/${serviceId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                fetchMyServices();
            } else {
                setError(data.message || 'Failed to delete service');
            }
        } catch (err) {
            console.error('Failed to delete service', err);
            setError('Failed to delete service');
        }
    };

    const handleAddExtra = () => {
        setExtras([...extras, { name: '', description: '', price: '' }]);
    };

    const handleRemoveExtra = (index) => {
        setExtras(extras.filter((_, i) => i !== index));
    };

    const handleExtraChange = (index, field, value) => {
        const newExtras = [...extras];
        newExtras[index][field] = value;
        setExtras(newExtras);
    };

    const handleAddTag = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setIsLoading(true);

        try {
            const userStr = localStorage.getItem('user');
            if (!userStr) throw new Error('Please login first.');
            const { token } = JSON.parse(userStr);
            
            if(!title || !description || !basePrice) {
                throw new Error("Please fill in all required fields.");
            }

            const payload = {
                title,
                category,
                subcategory: 'General',
                description,
                pricing: {
                    basePrice: Number(basePrice),
                    deliveryTime,
                    revisions,
                    currency
                },
                extras: extras.filter(ex => ex.name && ex.price).map(ex => ({ ...ex, price: Number(ex.price) })),
                tags,
                status: 'Published'
            };

            const method = editingId ? 'PUT' : 'POST';
            const url = editingId 
                ? `http://localhost:5000/api/services/${editingId}`
                : 'http://localhost:5000/api/services';

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || `Failed to ${editingId ? 'update' : 'publish'} service`);

            setSuccess(true);
            
            // Reset form
            cancelEdit();

            fetchMyServices();
            
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const displayServices = services.filter(service => service._id !== editingId);

    return (
        <div id="scroll-container" className="flex-1 overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto space-y-8 pb-20">
                {/* Header */}
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">My Freelance Service</h2>
                    <p className="text-slate-300">Set up your freelance service professionally to attract premium clients.</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/40 text-red-100 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-400"/> {error}
                    </div>
                )}
                
                {success && (
                    <div className="bg-emerald-500/10 border border-emerald-500/40 text-emerald-100 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400"/> Service published successfully!
                    </div>
                )}

                {/* Main Form Container */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Service Details */}
                    <div className="bg-brand-card rounded-2xl p-8 shadow-card">
                        <div className="flex items-center gap-3 mb-6">
                            <FileText className="w-6 h-6 text-primary" />
                            <h2 className="text-xl font-bold text-slate-900">Service Details</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Service Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    placeholder="I will design a high-converting landing page for your SaaS..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                                <select 
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer">
                                    <option value="Development">Development</option>
                                    <option value="Design & Creative">Design & Creative</option>
                                    <option value="Writing">Writing</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Video & Audio">Video & Audio</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                                <textarea
                                    rows="5"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    placeholder="Describe your service in detail. What makes you different?"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Setup */}
                    <div className="bg-brand-card rounded-2xl p-8 shadow-card">
                        <div className="flex items-center gap-3 mb-6">
                            <CreditCard className="w-6 h-6 text-primary" />
                            <h2 className="text-xl font-bold text-slate-900">Pricing Setup</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-1">
                                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Base Price</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3.5 text-slate-400 font-bold">₹</span>
                                    <input
                                        type="number"
                                        value={basePrice}
                                        onChange={(e) => setBasePrice(e.target.value)}
                                        required
                                        placeholder="0.00"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-7 pr-3 text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-bold"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-1">
                                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Delivery Time</label>
                                <select 
                                    value={deliveryTime}
                                    onChange={(e) => setDeliveryTime(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer">
                                    {[...Array(30)].map((_, i) => (
                                        <option key={i} value={`${i + 1} ${i === 0 ? 'Day' : 'Days'}`}>
                                            {i + 1} {i === 0 ? 'Day' : 'Days'}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:col-span-1">
                                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Revisions</label>
                                <select 
                                    value={revisions}
                                    onChange={(e) => setRevisions(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer">
                                    <option value="1 Revision">1 Revision</option>
                                    <option value="2 Revisions">2 Revisions</option>
                                    <option value="Unlimited">Unlimited</option>
                                </select>
                            </div>
                            <div className="md:col-span-1">
                                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Currency</label>
                                <select 
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer">
                                    <option value="INR">INR</option>
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="GBP">GBP</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Service Extras */}
                    <div className="bg-brand-card rounded-2xl p-8 shadow-card">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <PlusSquare className="w-6 h-6 text-primary" />
                                <h2 className="text-xl font-bold text-slate-900">Service Extras</h2>
                            </div>
                        </div>

                        {extras.map((extra, index) => (
                            <div key={index} className="flex items-center gap-4 mb-4">
                                <div className="flex-1 grid grid-cols-12 gap-4">
                                    <div className="col-span-3">
                                        {index === 0 && <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Extra Name</label>}
                                        <input
                                            type="text"
                                            value={extra.name}
                                            onChange={(e) => handleExtraChange(index, 'name', e.target.value)}
                                            placeholder="e.g. Fast 24h Delivery"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        />
                                    </div>
                                    <div className="col-span-7">
                                        {index === 0 && <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>}
                                        <input
                                            type="text"
                                            value={extra.description}
                                            onChange={(e) => handleExtraChange(index, 'description', e.target.value)}
                                            placeholder="Brief explanation of the extra"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        {index === 0 && <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Price (₹)</label>}
                                        <input
                                            type="number"
                                            value={extra.price}
                                            onChange={(e) => handleExtraChange(index, 'price', e.target.value)}
                                            placeholder="50.00"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-center font-bold"
                                        />
                                    </div>
                                </div>
                                <div className={index === 0 ? "pt-6" : ""}>
                                    <button type="button" onClick={() => handleRemoveExtra(index)} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tags & Skills */}
                    <div className="bg-brand-card rounded-2xl p-8 shadow-card">
                        <div className="flex items-center gap-3 mb-6">
                            <Tag className="w-6 h-6 text-primary" />
                            <h2 className="text-xl font-bold text-slate-900">Tags & Skills</h2>
                        </div>

                        <div className="space-y-4">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleAddTag}
                                placeholder="Search or add tags (press enter)..."
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-slate-900 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            />
                            <div className="flex flex-wrap gap-2">
                                {tags.map(tag => (
                                    <span key={tag} onClick={() => handleRemoveTag(tag)} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-sm font-semibold border border-slate-200 cursor-pointer hover:border-red-400 hover:text-red-500 transition-colors flex items-center gap-1 group">
                                        {tag} <Trash2 className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-8">
                        <div className="flex items-center gap-3 text-slate-300">
                            <Info className="w-5 h-5" />
                            <p className="text-sm">By publishing, you agree to our Seller Guidelines and<br />Service Level Agreements.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {editingId && (
                                <button type="button" onClick={cancelEdit} className="px-6 py-2.5 rounded-lg font-bold text-sm border border-slate-400 text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
                                    Cancel
                                </button>
                            )}
                            <button type="submit" disabled={isLoading} className={`px-6 py-2.5 rounded-lg font-bold text-sm bg-primary text-white transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-hover shadow-premium hover:shadow-lg'}`}>
                                {isLoading ? (editingId ? 'Updating...' : 'Publishing...') : (editingId ? 'Update Service' : 'Publish Service')}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Added Component: Created Services Table */}
                <div className="space-y-4 pt-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white tracking-wide">Created Services</h3>
                    </div>

                    <div className="bg-brand-card rounded-2xl overflow-hidden p-2 shadow-card">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left min-w-[600px]">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Service / Project</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Base Price</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {displayServices.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-8 text-center text-slate-500 font-medium tracking-wide">No services found. Create one above!</td>
                                        </tr>
                                    ) : (
                                        displayServices.map((service) => (
                                            <tr key={service._id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                                                            <FileText className="w-5 h-5 text-slate-400" />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-bold text-slate-900">{service.title}</span>
                                                            <span className="text-xs text-slate-500">{service.category}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex px-2.5 py-1 rounded text-xs font-bold ${service.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                                                        {service.status || 'Draft'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-bold text-slate-900">
                                                    {service.pricing?.currency === 'USD' ? '$' : '₹'}
                                                    {service.pricing?.basePrice}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button 
                                                            type="button"
                                                            onClick={() => handleEditClick(service)}
                                                            className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                            title="Edit Service"
                                                        >
                                                            <Edit2 className="w-5 h-5" />
                                                        </button>
                                                        <button 
                                                            type="button"
                                                            onClick={() => handleDeleteService(service._id)}
                                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete Service"
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
