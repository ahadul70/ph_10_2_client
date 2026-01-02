import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const CreateExportProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: from } });
    }
  }, [user, navigate, from]);
  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    originCountry: "",
    rating: "",
    quantity: "",
  });
  const [message, setMessage] = useState("");

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
      await axios.post("https://phserver-nine.vercel.app/addexports", payload, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage("✅ Product added successfully!");
      setProduct({
        name: "",
        image: "",
        price: "",
        originCountry: "",
        rating: "",
        quantity: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add product.");
    }
    try {
      await axios.post("https://phserver-nine.vercel.app/products", payload, {
        headers: { "Content-Type": "application/json" },
      });

      setMessage("✅ Product added successfully!");
      setProduct({
        name: "",
        image: "",
        price: "",
        originCountry: "",
        rating: "",
        quantity: "",
      });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add product.");
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
