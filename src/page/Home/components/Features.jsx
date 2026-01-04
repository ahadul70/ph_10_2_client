import React from 'react';
import { FaGlobeAmericas, FaShieldAlt, FaChartLine, FaShip, FaHeadset, FaFileContract } from 'react-icons/fa';

export default function Features() {
    const features = [
        {
            icon: FaGlobeAmericas,
            title: "Global Reach",
            desc: "Connect with partners in over 150 countries instantly."
        },
        {
            icon: FaShieldAlt,
            title: "Secure Transactions",
            desc: "Bank-grade encryption for all your financial data."
        },
        {
            icon: FaChartLine,
            title: "Real-time Analytics",
            desc: "Track performance with advanced dashboard insights."
        },
        {
            icon: FaShip,
            title: "Logistics Support",
            desc: "Integrated shipping solutions with top carriers."
        },
        {
            icon: FaHeadset,
            title: "24/7 Support",
            desc: "Dedicated account managers always ready to help."
        },
        {
            icon: FaFileContract,
            title: "Smart Contracts",
            desc: "Automated documentation and compliance handling."
        }
    ];

    return (
        <section className="section-padding bg-slate-50 dark:bg-slate-900">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-2">Why Choose Us</h2>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to trade globally</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        We provide a comprehensive ecosystem for importers and exporters to thrive in the modern economy.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100 dark:border-slate-700"
                        >
                            <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <feature.icon size={28} />
                            </div>
                            <h4 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                                {feature.title}
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
