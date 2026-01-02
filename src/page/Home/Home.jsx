import React from "react";
import { PopularProducts } from "../../components/Popularproducts/PopularProducts";

const productspromise = fetch(
  "https://phserver-nine.vercel.app/popularproducts"
).then((res) => res.json());

export default function Home() {
  return (
    <>
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-20 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        {/* Left side - text */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Connect Markets,{" "}
            <span className="text-blue-400">Empower Trade</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-md mx-auto md:mx-0">
            Manage your imports and exports with precision — track shipments,
            streamline logistics, and expand your global reach effortlessly.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <button className="px-6 py-3 bg-blue-400 hover:bg-blue-600 rounded-full font-semibold transition">
              Start Trading
            </button>
            <button className="px-6 py-3 border border-blue-400 rounded-full hover:bg-blue-400/10 transition">
              Explore Dashboard
            </button>
          </div>
        </div>

        {/* Right side - image */}
        <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1040/1040230.png"
            alt="Global Trade"
            className="w-80 md:w-[450px] object-contain drop-shadow-2xl"
          />
        </div>
      </section>
      <PopularProducts productspromise={productspromise}></PopularProducts>
      <section id="features" className="py-20 px-6 md:px-16 bg-slate-900">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Tools for Global Trade
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Smart Imports",
              desc: "Easily manage import requests, update quantities, and track real-time data.",
            },
            {
              title: "Seamless Exports",
              desc: "Control your outbound shipments with streamlined export management.",
            },
            {
              title: "Analytics Dashboard",
              desc: "Gain insights into trade performance, trends, and profit margins.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-8 bg-slate-800 rounded-2xl hover:scale-105 transition transform shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-3 text-blue-400">
                {f.title}
              </h3>
              <p className="text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section
        id="partners"
        className="py-20 px-6 md:px-16 bg-gradient-to-b from-slate-900 to-slate-800"
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          Trusted by Global <span className="text-blue-400">Partners</span>
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10">
          We collaborate with industry-leading logistics companies, exporters,
          and importers across continents to make global trade faster and
          smarter.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center justify-center  ">
          {[
            "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
            "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
            "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
            "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
          ].map((logo, i) => (
            <div key={i} className="flex justify-center">
              <img
                src={logo}
                alt="Partner Logo"
                className="h-12 md:h-16 opacity-60 hover:opacity-100 transition"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
