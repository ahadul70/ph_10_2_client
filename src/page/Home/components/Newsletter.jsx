import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

export default function Newsletter() {
    return (
        <section className="py-24 bg-slate-100 dark:bg-slate-800">
            <div className="container-custom">
                <div className="bg-slate-900 rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-2xl">

                    {/* Decorative Circles */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-600/30 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-purple-600/30 blur-3xl"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Stay ahead of the curve
                            </h2>
                            <p className="text-slate-300 text-lg">
                                Get the latest trade insights, market trends, and exclusive offers delivered directly to your inbox.
                            </p>
                        </div>

                        <div className="md:w-1/2 w-full">
                            <form className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="flex-1 input input-lg rounded-full bg-white/10 border-white/20 text-white placeholder-white/50 focus:bg-white/20 focus:border-blue-400 focus:outline-none transition-all"
                                />
                                <button className="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-blue-500/30">
                                    Subscribe
                                    <FaPaperPlane className="ml-2 text-sm" />
                                </button>
                            </form>
                            <p className="text-slate-400 text-sm mt-4 text-center md:text-left">
                                No spam, unsubscribe at any time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
