import React from 'react';
import { FaGlobe, FaHandshake, FaAward } from 'react-icons/fa';

export default function About() {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-white dark:bg-slate-950">
            {/* Header */}
            <div className="container-custom text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Powering Global Trade</h1>
                <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                    ImpExpHub is the leading platform connecting businesses to global markets, simplifying logistics, and ensuring secure transactions for everyone.
                </p>
            </div>

            {/* Image Block */}
            <div className="container-custom mb-24">
                <div className="rounded-3xl overflow-hidden shadow-2xl h-[500px] relative">
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="Office Team"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-10">
                        <div className="text-white">
                            <h3 className="text-3xl font-bold mb-2">Our Mission</h3>
                            <p className="max-w-xl text-lg opacity-90">To democratize access to global supply chains, enabling small and large businesses to trade with confidence and clarity.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values Grid */}
            <div className="bg-slate-50 dark:bg-slate-900 py-20">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-sm text-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-6 text-2xl">
                                <FaGlobe />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Global Connectivity</h3>
                            <p className="text-slate-500">Access to markets in over 150 countries with a single click.</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-sm text-center">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6 text-2xl">
                                <FaHandshake />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Trusted Partnerships</h3>
                            <p className="text-slate-500">Every supplier is vetted and verified for your peace of mind.</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-sm text-center">
                            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/40 rounded-full flex items-center justify-center text-amber-600 mx-auto mb-6 text-2xl">
                                <FaAward />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Excellence First</h3>
                            <p className="text-slate-500">Award-winning support and industry-leading technology.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
