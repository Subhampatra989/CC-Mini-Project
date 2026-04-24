import React from 'react';
import { Shield } from 'lucide-react';

export default function HeroSection() {
    return (
        <div className="max-w-7xl mx-auto px-8 pt-16 flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2 space-y-8">
                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-200">NEW: AI-MATCHING FOR FREELANCERS</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-black leading-[1.1]">
                    Your Freelance & <br />Second-Hand <br /><span className="text-blue-500">Marketplace</span>
                </h1>
                <p className="text-slate-300 text-lg leading-relaxed max-w-lg">
                    Connect with top-tier creative talent or find amazing deals on pre-loved tech and gear. All secured by Nexuni trust.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                    <button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-md font-bold shadow-md transition-all">Become a Consumer</button>
                    <button className="bg-white hover:bg-slate-50 text-slate-900 px-6 py-3 rounded-md font-bold shadow-md transition-all border border-transparent">Become a Seller</button>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <div className="flex -space-x-3">
                        <img src="https://api.dicebear.com/7.x/notionists/svg?seed=user1&backgroundColor=e2e8f0" alt="user" className="w-10 h-10 rounded-full border-2 border-brand-bg bg-white" />
                        <img src="https://api.dicebear.com/7.x/notionists/svg?seed=user2&backgroundColor=fef08a" alt="user" className="w-10 h-10 rounded-full border-2 border-brand-bg bg-white" />
                        <img src="https://api.dicebear.com/7.x/notionists/svg?seed=user3&backgroundColor=fed7aa" alt="user" className="w-10 h-10 rounded-full border-2 border-brand-bg bg-white" />
                    </div>
                    <span className="text-xs text-slate-300 font-medium tracking-wide">Joined by <strong className="text-white">12k+</strong> users this month</span>
                </div>
            </div>
            <div className="w-full lg:w-1/2 relative mt-12 lg:mt-0">
                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-brand-bg/50 aspect-video lg:aspect-square max-h-[500px]">
                    <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1000" alt="Workspace" className="w-full h-full object-cover rounded-2xl" />
                </div>
                <div className="absolute -bottom-6 left-6 md:-left-8 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-slate-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">TRUSTED SELLERS</p>
                        <p className="text-sm font-black text-slate-900">Verified Professional Badge</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
