import { use, useEffect, useState } from "react";
import { Link } from "react-router";

export const Importproducts = () => {
  const [imports, setImports] = useState([]);

  // Load imports initially
  useEffect(() => {
    fetchImports();
  }, []);

  const fetchImports = async () => {
    const res = await fetch("https://phserver-nine.vercel.app/myimports");
    const data = await res.json();
    setImports(data);
  };

  const handleRemove = async (id) => {
    await fetch(`https://phserver-nine.vercel.app/myimports/${id}`, {
      method: "DELETE",
    });
    setImports((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        My Imported Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {imports.map((p) => (
          <div
            key={p._id}
            className="bg-slate-400 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold text-white">{p.name}</h2>
              <p className="text-white font-medium">{p.price}</p>
              <p className="text-white text-sm">Origin: {p.country}</p>
              <p className="text-yellow-500 font-semibold">⭐ {p.rating}</p>
              <p className="text-white">Available: {p.quantity}</p>
              <Link to={`/importdetails/${p._id}`}>
                <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition">
                  See Details
                </button>
              </Link>
              <button
                onClick={() => handleRemove(p._id)}
                className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-xl transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
