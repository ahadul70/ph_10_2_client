import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Link } from 'react-router';

export default function Hero() {
    const slides = [
        {
            image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            title: "Global Limitless Logistics",
            subtitle: "Connect your business to the world with our premium import/export solutions.",
            cta: "Explore Services"
        },
        {
            image: "https://images.unsplash.com/photo-1494412574643-35d324698420?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80",
            title: "Secure & Fast Shipping",
            subtitle: "Real-time tracking and automated documentation for peace of mind.",
            cta: "Track Order"
        },
        {
            image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            title: "Maximize Your Trade",
            subtitle: "Join thousands of businesses scaling their operations with ImpExp Hub.",
            cta: "Get Started"
        }
    ];

    return (
        <section className="relative h-[85vh] w-full">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                speed={1000}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true}
                className="h-full w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-full w-full">
                            {/* Background with overlay */}
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            >
                                <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                            </div>

                            {/* Content */}
                            <div className="relative h-full container-custom flex flex-col justify-center items-center text-center text-white z-10 px-4">
                                <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-6 animate-in slide-in-from-bottom-5 duration-700">
                                    {slide.title}
                                </h1>
                                <p className="text-lg md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed animate-in slide-in-from-bottom-5 duration-1000 delay-200">
                                    {slide.subtitle}
                                </p>
                                <div className="flex gap-4 animate-in fade-in zoom-in duration-1000 delay-300">
                                    <Link
                                        to="/registration"
                                        className="btn btn-primary btn-lg rounded-full px-8 shadow-xl shadow-blue-900/20 border-none hover:scale-105 transition-transform"
                                    >
                                        {slide.cta}
                                    </Link>
                                    <Link
                                        to="/about"
                                        className="btn btn-outline btn-lg text-white rounded-full px-8 hover:bg-white hover:text-slate-900 transition-all"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Scroll Down Hint */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}
