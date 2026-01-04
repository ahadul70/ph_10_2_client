import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-slate-50 dark:bg-slate-950">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden">

                    {/* Left Info */}
                    <div className="bg-blue-600 p-12 text-white flex flex-col justify-between">
                        <div>
                            <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
                            <p className="text-blue-100 text-lg mb-12">
                                Have questions about importing, exporting, or our platform features? Our team is here to help you 24/7.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-500/50 flex items-center justify-center backdrop-blur"><FaPhoneAlt /></div>
                                    <div>
                                        <p className="text-sm opacity-70">Call us</p>
                                        <p className="font-bold text-lg">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-500/50 flex items-center justify-center backdrop-blur"><FaEnvelope /></div>
                                    <div>
                                        <p className="text-sm opacity-70">Email us</p>
                                        <p className="font-bold text-lg">support@impexphub.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-500/50 flex items-center justify-center backdrop-blur"><FaMapMarkerAlt /></div>
                                    <div>
                                        <p className="text-sm opacity-70">Visit us</p>
                                        <p className="font-bold text-lg">123 Trade Center, NY 10001</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <div className="flex gap-4">
                                {/* Social Icons Placeholder */}
                            </div>
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className="p-12">
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Send us a Message</h2>
                        <p className="text-slate-500 mb-8">We will get back to you within 24 hours.</p>

                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label font-semibold">First Name</label>
                                    <input type="text" className="input input-bordered bg-slate-50 dark:bg-slate-800" placeholder="John" />
                                </div>
                                <div className="form-control">
                                    <label className="label font-semibold">Last Name</label>
                                    <input type="text" className="input input-bordered bg-slate-50 dark:bg-slate-800" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label font-semibold">Email Address</label>
                                <input type="email" className="input input-bordered bg-slate-50 dark:bg-slate-800" placeholder="john@example.com" />
                            </div>
                            <div className="form-control">
                                <label className="label font-semibold">Message</label>
                                <textarea className="textarea textarea-bordered bg-slate-50 dark:bg-slate-800 h-32" placeholder="How can we help you?"></textarea>
                            </div>

                            <button type="button" className="btn btn-primary w-full btn-lg rounded-xl">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
