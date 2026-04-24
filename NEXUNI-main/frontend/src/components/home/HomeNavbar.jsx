import React from 'react';
import { Link } from 'react-router-dom';

export default function HomeNavbar() {
    return (
        <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
            <div className="text-2xl font-black tracking-wide">NEXUNI</div>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                <a href="#" className="hover:text-white transition-colors">How it works</a>
                <a href="#" className="hover:text-white transition-colors">Freelancers</a>
                <a href="#" className="hover:text-white transition-colors">Marketplace</a>
            </nav>
            <div className="flex items-center gap-6">
                <Link to="/login" className="text-sm font-bold text-white hover:text-blue-300 transition-colors">Login</Link>
                <button className="bg-primary hover:bg-primary-hover text-white px-5 py-2 rounded-md font-bold text-sm shadow-md transition-all">Join Now</button>
            </div>
        </header>
    );
}
