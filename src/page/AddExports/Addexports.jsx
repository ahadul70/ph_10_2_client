import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import useAxiosSecurity from "../../context/AuthContext/useAxiosSecurity";

const CreateExportProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const axiosSecurity = useAxiosSecurity();

  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    originCountry: "",
    rating: "",
    quantity: "",
    seller: user?.displayName || user?.email || "Anonymous",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setProduct(prev => ({
        ...prev,
        seller: user.displayName || user.email || "Anonymous"
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // convert numeric fields
    const payload = {
      ...product,
      price: parseFloat(product.price),
      rating: parseFloat(product.rating),
      quantity: parseInt(product.quantity, 10),
    };

    try {
      await axiosSecurity.post("/addexports", payload);
      await axiosSecurity.post("/products", payload);

      setMessage("✅ Product added successfully!");
      setProduct({
        name: "",
        image: "",
        price: "",
        originCountry: "",
        rating: "",
        quantity: "",
        seller: user?.displayName || user?.email || "Anonymous",
      });
    } catch (err) {
      console.error("Submission Error:", err.response?.data || err.message);
      setMessage(`❌ Failed to add product: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 border-slate-900 rounded-lg shadow-lg bg-slate-500 mb-5 ">
        <h2 className="text-2xl font-bold mb-5 text-center text-white">
          Add Export Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full p-2 border rounded border-black text-white"
            required
          />

          <input
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Product Image URL"
            className="w-full p-2 border rounded border-black  text-whitek"
          />

          {product.image && (
            <img
              src={product.image}
              alt="Preview"
              className="w-full h-40 object-cover rounded"
            />
          )}

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 border rounded border-black  text-white"
            required
          />

          <input
            name="originCountry"
            value={product.originCountry}
            onChange={handleChange}
            placeholder="Origin Country"
            className="w-full p-2 border rounded border-black  text-white"
          />

          <input
            type="number"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            placeholder="Rating (0 - 5)"
            min="0"
            max="5"
            step="0.1"
            className="w-full p-2 border rounded border-black  text-white"
          />

          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            placeholder="Available Quantity"
            className="w-full p-2 border rounded border-black  text-white"
            required
          />

          <div className="space-y-1">
            <label className="text-white text-sm font-medium ml-1">Seller</label>
            <input
              name="seller"
              value={product.seller}
              readOnly
              className="w-full p-2 border rounded border-black bg-slate-600 text-gray-300 cursor-not-allowed"
              placeholder="Seller Name"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
          >
            Add Export/Product
          </button>
        </form>

        {message && (
          <p className="mt-4  text-black text-center text-sm font-medium">
            {message}
          </p>
        )}
      </div>{" "}
    </>
  );
};

export default CreateExportProduct;
