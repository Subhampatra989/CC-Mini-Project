import React from 'react';
import { Sparkles } from 'lucide-react';

export default function MonetizeBanner() {
    return (
        <div className="mt-20 bg-gradient-to-br from-[#3b5998] to-[#253f7c] rounded-3xl p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl border border-white/10 relative overflow-hidden">
            {/* Decorative background circle */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 mix-blend-screen"></div>

            <div className="relative z-10 w-full md:w-1/2 space-y-6">
                <h2 className="text-4xl md:text-5xl font-black leading-[1.1] text-white">Ready to monetize your skills?</h2>
                <p className="text-blue-100 text-sm leading-relaxed max-w-md font-medium">Join thousands of creators, designers, and tech experts who have turned their passion into a career on NEXUNI.</p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button className="bg-white text-slate-900 hover:bg-slate-50 px-6 py-3 rounded-md font-bold shadow-lg transition-colors">Start Selling Now</button>
                    <button className="bg-[#2a4382]/50 hover:bg-[#1e3266] border border-blue-400/30 text-white px-6 py-3 rounded-md font-bold transition-colors backdrop-blur-sm">Learn More</button>
                </div>
            </div>

            {/* Fake UI Overlay Graphic */}
            <div className="relative z-10 w-full md:w-auto flex justify-center lg:justify-end">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl w-full max-w-[320px]">
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">EARNINGS FORECAST</p>
                                <p className="text-2xl font-black text-slate-900">$2,450.00</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                <div className="bg-blue-600 h-full rounded-full w-[75%] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"></div>
                            </div>
                            <div className="flex items-center justify-between text-[11px] font-bold">
                                <span className="text-slate-400">Weekly Progress</span>
                                <span className="text-blue-600">75%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
