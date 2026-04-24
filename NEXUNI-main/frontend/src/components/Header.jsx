import React from 'react';
import { Bell, Plus } from 'lucide-react';

export default function Header() {
    return (
        <header className="h-20 bg-transparent flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-4 flex-1">
                <h2 className="text-2xl font-bold text-white tracking-wide">Freelance Dashboard</h2>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-2 text-slate-300 hover:text-white transition-colors">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-brand-bg rounded-full"></span>
                </button>


            </div>
        </header>
    );
}
