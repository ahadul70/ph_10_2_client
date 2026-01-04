import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

export default function Testimonials() {
    const reviews = [
        {
            name: "Sarah Jenkins",
            role: "Logistics Manager, TechCorp",
            text: "ImpExp Hub revolutionized how we handle our international shipments. The dashboard is intuitive and real-time tracking is a game changer.",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            rating: 5
        },
        {
            name: "Michael Chen",
            role: "CEO, Chen Imports",
            text: "We scaled our operation from 2 to 15 countries in just a year, thanks to the streamlined processes provided by this platform.",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            rating: 5
        },
        {
            name: "Elena Rodriguez",
            role: "Operations Director, GlobalGoods",
            text: "The security and transparency of the smart contracts features gave us the confidence to trade with new suppliers efficiently.",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            rating: 4
        }
    ];

    return (
        <section className="section-padding bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
            <div className="container-custom text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Industry Leaders</h2>
                <p className="text-slate-600 dark:text-slate-400">Hear what our partners have to say about us.</p>
            </div>

            <div className="container-custom max-w-5xl">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    className="pb-12"
                >
                    {reviews.map((review, i) => (
                        <SwiperSlide key={i} className="h-full">
                            <div className="bg-white dark:bg-slate-950 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 h-full flex flex-col relative">
                                <FaQuoteLeft className="text-blue-100 dark:text-blue-900/30 text-5xl absolute top-4 right-4" />

                                <div className="flex items-center gap-1 mb-6 text-amber-400">
                                    {[...Array(5)].map((_, starIndex) => (
                                        <FaStar key={starIndex} className={starIndex < review.rating ? "text-amber-400" : "text-gray-300"} />
                                    ))}
                                </div>

                                <p className="text-slate-600 dark:text-slate-300 italic mb-8 relative z-10 flex-grow">
                                    "{review.text}"
                                </p>

                                <div className="flex items-center gap-4 mt-auto">
                                    <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-900" />
                                    <div className="text-left">
                                        <h4 className="font-bold text-slate-900 dark:text-white">{review.name}</h4>
                                        <p className="text-xs text-slate-500 uppercase tracking-wide">{review.role}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
