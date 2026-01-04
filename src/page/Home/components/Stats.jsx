import React from 'react';

export default function Stats() {
    const stats = [
        { label: "Active Users", value: "15k+" },
        { label: "Countries Served", value: "120" },
        { label: "Transactions", value: "$500M+" },
        { label: "Partners", value: "2.5k" },
    ];

    return (
        <section className="py-20 bg-blue-600 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 0 L100 100 L0 100 Z" fill="white" />
                </svg>
            </div>

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
                    {stats.map((stat, i) => (
                        <div key={i} className="p-4">
                            <div className="text-4xl md:text-5xl font-extrabold mb-2">{stat.value}</div>
                            <div className="text-blue-100 font-medium tracking-wide text-sm uppercase">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
