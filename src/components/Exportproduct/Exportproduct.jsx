import { useEffect, useRef, useState } from "react";

export const Exportproduct = () => {
  const [exports, setExports] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const exportref = useRef(null);

  // Load exports initially
  useEffect(() => {
    fetchExports();
  }, []);

  const fetchExports = async () => {
    try {
      const res = await fetch("https://phserver-nine.vercel.app/myexports");
      const data = await res.json();
      setExports(data);
    } catch (err) {
      console.error("Error fetching exports:", err);
    }
  };

  // Remove product
  const handleRemove = async (id) => {
    try {
      await fetch(`https://phserver-nine.vercel.app/myexports/${id}`, {
        method: "DELETE",
      });
      setExports((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error removing export:", err);
    }
  };

  // Open modal with selected product
  const handleExportRef = (product) => {
    setSelectedProduct(product);
    exportref.current.showModal();
  };

  // Close modal
  const handleCloseModal = () => {
    exportref.current.close();
    setSelectedProduct(null);
  };

  // Submit updated data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://https://phserver-nine.vercel.app/myexports/myexports/${selectedProduct._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(selectedProduct),
        }
      );

      if (res.ok) {
        // Update UI immediately
        setExports((prev) =>
          prev.map((p) => (p._id === selectedProduct._id ? selectedProduct : p))
        );
        handleCloseModal();
      }
    } catch (err) {
      console.error("Error updating export:", err);
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {exports.map((p) => (
          <div
            key={p._id}
            className=" bg-slate-400 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
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

              <button
                onClick={() => handleExportRef(p)}
                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition"
              >
                Update
              </button>

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

      {/* Update Modal */}
      <dialog ref={exportref} className="modal modal-bottom sm:modal-middle">
        {selectedProduct && (
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Product</h3>
            <form onSubmit={handleSubmit} className="space-y-2 mt-2">
              <input
                type="text"
                value={selectedProduct.name}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    name: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                placeholder="Name"
              />
              <input
                type="number"
                value={selectedProduct.price}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    price: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                placeholder="Price"
              />
              <input
                type="text"
                value={selectedProduct.country}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    country: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                placeholder="Country"
              />
              <input
                type="number"
                value={selectedProduct.quantity}
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    quantity: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
                placeholder="Quantity"
              />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </dialog>
    </div>
  );
};
