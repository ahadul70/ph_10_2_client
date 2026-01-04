import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function FAQ() {
    const faqs = [
        {
            q: "How does ImpExp Hub verify suppliers?",
            a: "We use a rigorous 5-step verification process including business license validation, physical address checks, and financial history reviews to ensure all partners are legitimate."
        },
        {
            q: "What payment methods are supported?",
            a: "We support major credit cards (Visa, MasterCard), bank transfers (SWIFT/IBAN), and Letter of Credit services for large secure transactions."
        },
        {
            q: "Can I track my shipment in real-time?",
            a: "Yes, our dashboard provides real-time GPS tracking for all shipments booked through our logistics partners."
        },
        {
            q: "Is there a free trial for the dashboard?",
            a: "Yes, you can explore the dashboard features with a free Basic account. Premium analytics require a subscription upgrade."
        }
    ];

    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (i) => {
        setActiveIndex(activeIndex === i ? null : i);
    }

    return (
        <section className="section-padding bg-white dark:bg-slate-950">
            <div className="container-custom max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-slate-600 dark:text-slate-400">Everything you need to know about our services.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className={`border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 ${activeIndex === i ? 'shadow-lg bg-slate-50 dark:bg-slate-900 border-blue-200 dark:border-blue-900' : 'bg-white dark:bg-slate-950'}`}
                        >
                            <button
                                onClick={() => toggle(i)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className={`text-lg font-semibold ${activeIndex === i ? 'text-blue-600' : 'text-slate-800 dark:text-slate-200'}`}>
                                    {faq.q}
                                </span>
                                <FaChevronDown className={`transition-transform duration-300 ${activeIndex === i ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${activeIndex === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="p-6 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-transparent">
                                    {faq.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
