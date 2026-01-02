import React, { useEffect, useRef, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import useAxiosSecurity from "../../context/AuthContext/useAxiosSecurity";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const axiosSecurity = useAxiosSecurity();

  const [quantity, setQuantity] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const importref = useRef(null);

  useEffect(() => {
    axiosSecurity.get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Failed to load product:", err));
  }, [id, axiosSecurity]);

  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: `/productdetails/${id}` } });
    }
  }, [user, navigate, id]);

  const handleImportRef = () => importref.current.showModal();
  const handleCloseModal = () => importref.current.close();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      alert("Enter a valid quantity");
      return;
    }

    const importData = {
      productId: product._id,
      quantity,
      name: product.name,
      image: product.image,
      price: product.price,
      rating: product.rating,
      country: product.country,
      seller: product.seller || "Anonymous",
    };

    try {
      await axiosSecurity.post("/myimports", importData);
      handleCloseModal();
      alert("Product imported successfully!");
      navigate("/dashboard/my-imports");
    } catch (err) {
      console.error("Import failed:", err);
      alert("Import failed. Please try again.");
    }
  };

  if (!product) {
    return (
      <div className="text-center mt-20  bg-gradient-to-b from-slate-900 to-slate-800">
        <h1 className="text-4xl font-bold text-red-500">
          404 - Product Not Found
        </h1>
        <p className="text-gray-500 mt-4">
          The product you’re looking for doesn’t exist or was removed.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6  bg-gradient-to-b from-slate-900 to-slate-800">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
      <img
        src={product.image || null}
        alt={product.name}
        className="w-full max-w-md mx-auto h-64 object-cover rounded-xl shadow-md"
      />
      <div className="mt-4 space-y-2">
        <p className="text-xl font-semibold">Price: ${product.price}</p>
        <p>Origin: {product.country}</p>
        <p>Rating: ⭐ {product.rating}</p>
        <p>Available: {product.quantity}</p>
        {product.seller && (
          <p className="text-blue-400 font-medium italic">Seller: {product.seller}</p>
        )}
      </div>

      <button className="btn btn-primary mt-4" onClick={handleImportRef}>
        Import Now
      </button>

      <dialog ref={importref} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Import Product</h3>
          <form onSubmit={handleOnSubmit}>
            <fieldset className="fieldset">
              <label className="label">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter order amount"
                min="1"
                max={product.quantity}
              />
            </fieldset>

            {quantity > product.quantity && (
              <p className="text-red-500 text-sm mt-2">
                Quantity exceeds available stock ({product.quantity})
              </p>
            )}

            <div className="modal-action">
              <button
                type="submit"
                className="btn"
                disabled={quantity > product.quantity || quantity <= 0}
              >
                Submit
              </button>
              <button type="button" className="btn" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ProductDetails;
