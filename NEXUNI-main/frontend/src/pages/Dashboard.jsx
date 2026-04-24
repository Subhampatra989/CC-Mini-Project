import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ExternalLink } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Top Feature Banners */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link to="/my-freelance-service" className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer border border-white/5 block">
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-brand-bg/50 z-10 transition-colors group-hover:from-slate-900/80"></div>
                        <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop" alt="Desk" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay" />
                        <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                            <h3 className="text-2xl font-bold text-white">MY Freelance Service</h3>
                        </div>
                    </Link>

                    <Link to="/services" className="relative h-64 rounded-2xl overflow-hidden group cursor-pointer border border-white/5 block">
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-emerald-900/50 z-10 transition-colors group-hover:from-slate-900/80"></div>
                        <img src="https://images.unsplash.com/photo-1544396821-4ea4ce1ded0c?q=80&w=2069&auto=format&fit=crop" alt="Plant" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay" />
                        <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                            <h3 className="text-2xl font-bold text-white">Take Services</h3>
                        </div>
                    </Link>
                </div>

                {/* Analytics Overview */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white tracking-wide">Analytics Overview</h3>
                        <button className="flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors">
                            Last 7 Days <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-brand-card p-6 rounded-2xl">
                            <p className="text-slate-500 text-sm font-semibold mb-2">Total Sales</p>
                            <div className="flex items-baseline gap-2">
                                <h4 className="text-2xl font-black text-slate-900">$12,480.00</h4>
                                <span className="text-xs font-bold text-emerald-500">+12%</span>
                            </div>
                        </div>

                        <div className="bg-brand-card p-6 rounded-2xl">
                            <p className="text-slate-500 text-sm font-semibold mb-2">Profile Views</p>
                            <div className="flex items-baseline gap-2">
                                <h4 className="text-2xl font-black text-slate-900">45.2k</h4>
                                <span className="text-xs font-bold text-emerald-500">+5.4%</span>
                            </div>
                        </div>

                        <div className="bg-brand-card p-6 rounded-2xl">
                            <p className="text-slate-500 text-sm font-semibold mb-2">Conversion Rate</p>
                            <div className="flex items-baseline gap-2">
                                <h4 className="text-2xl font-black text-slate-900">3.2%</h4>
                                <span className="text-xs font-bold text-rose-500">-0.8%</span>
                            </div>
                        </div>

                        <div className="bg-brand-card p-6 rounded-2xl">
                            <p className="text-slate-500 text-sm font-semibold mb-2">Pending Orders</p>
                            <div className="flex items-baseline gap-2">
                                <h4 className="text-2xl font-black text-slate-900">18</h4>
                                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded uppercase">Action</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Orders & Chats */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Recent Orders */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white tracking-wide">Recent Orders</h3>
                            <button className="text-sm font-bold text-slate-300 hover:text-white transition-colors">View All</button>
                        </div>

                        <div className="bg-brand-card rounded-2xl overflow-hidden p-2">
                            <table className="w-full text-left">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Product / Service</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Customer</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Date</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Status</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded bg-slate-100 border border-slate-200"></div>
                                                <span className="text-sm font-bold text-slate-900">UI Design Kit</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">Sarah Miller</td>
                                        <td className="px-6 py-4 text-sm text-slate-500">Oct 24, 2023</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-2.5 py-1 rounded bg-emerald-100 text-emerald-700 text-xs font-bold">Completed</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-900">$120.00</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded bg-slate-100 border border-slate-200"></div>
                                                <span className="text-sm font-bold text-slate-900">Logo Branding</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">TechCorp Inc.</td>
                                        <td className="px-6 py-4 text-sm text-slate-500">Oct 23, 2023</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-2.5 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold">In Progress</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-900">$450.00</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded bg-slate-100 border border-slate-200"></div>
                                                <span className="text-sm font-bold text-slate-900">Wireless Earbuds</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">Alex Chen</td>
                                        <td className="px-6 py-4 text-sm text-slate-500">Oct 23, 2023</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-2.5 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-bold">Pending</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-900">$89.99</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Active Chats */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white tracking-wide">Active Chats</h3>
                            <button className="text-slate-300 hover:text-white transition-colors">
                                <ExternalLink className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="bg-brand-card rounded-2xl p-4 space-y-2">
                            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <p className="text-sm font-bold text-slate-900 truncate">Mark Thompson</p>
                                        <span className="text-[10px] font-medium text-slate-400">12:45 PM</span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate">Is the UI kit updated for Figma?</p>
                                </div>
                                <div className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">2</div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <p className="text-sm font-bold text-slate-900 truncate">Design Studio</p>
                                        <span className="text-[10px] font-medium text-slate-400">Yesterday</span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate">The logo package is ready for downl...</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <p className="text-sm font-bold text-slate-900 truncate">Elena Rodriguez</p>
                                        <span className="text-[10px] font-medium text-slate-400">Oct 22</span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate">Thank you for the quick delivery!</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
