import React from 'react';
import { Link } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';

export default function LatestNews() {
    const news = [
        {
            title: "Impact of Digital Currencies on Global Trade",
            date: "Mar 15, 2026",
            category: "Market Trends",
            image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            excerpt: "Blockchain technology is reshaping how we settle international payments, offering faster and more secure transaction methods."
        },
        {
            title: "New Regulations for Cross-Border Shipping",
            date: "Mar 10, 2026",
            category: "Compliance",
            image: "https://images.unsplash.com/photo-1566576912906-254346c55e21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            excerpt: "Understanding the latest changes in customs regulations is crucial for maintaining a smooth supply chain in 2026."
        },
        {
            title: "The Rise of Sustainable Logistics",
            date: "Feb 28, 2026",
            category: "Sustainability",
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            excerpt: "Top logistics companies are committing to carbon-neutral fleets. Here is what this means for your shipping costs."
        }
    ];

    return (
        <section className="section-padding bg-slate-50 dark:bg-slate-900">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div className="text-center md:text-left mb-6 md:mb-0">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Insights</h2>
                        <p className="text-slate-600 dark:text-slate-400">News, trends, and regulations affecting global trade.</p>
                    </div>
                    <Link to="#" className="btn btn-outline rounded-full px-6 flex items-center gap-2 group">
                        View All News <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {news.map((item, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-2xl mb-4 aspect-video">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-slate-900 uppercase tracking-wide">
                                    {item.category}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                                <span>{item.date}</span>
                                <span>•</span>
                                <span>5 min read</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {item.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 line-clamp-2">
                                {item.excerpt}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
