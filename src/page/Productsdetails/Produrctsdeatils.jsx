import React, { useEffect, useRef, useContext, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import useAxiosSecurity from "../../context/AuthContext/useAxiosSecurity";
import axios from "axios";
import { FaStar, FaShoppingCart, FaCheckCircle, FaTruck, FaShieldAlt, FaComments } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("desc");
  const [relatedProducts, setRelatedProducts] = useState([]);

  const axiosSecurity = useAxiosSecurity(); // For authorized actions
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const importref = useRef(null);

  // Fetch product public data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
        setProduct(res.data);

        // Fetch related products (mock logic for now, or real if API supports)
        const relatedRes = await axios.get(`${import.meta.env.VITE_API_URL}/popularproducts`);
        setRelatedProducts(relatedRes.data.filter(p => p._id !== id).slice(0, 4));

      } catch (err) {
        console.error("Failed to load product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleImportClick = () => {
    if (!user) {
      navigate("/login", { state: { from: `/productdetails/${id}` } });
      return;
    }
    importref.current.showModal();
  };

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
      // Use toast instead of alert ideally
      alert("Product imported successfully!");
      navigate("/dashboard/my-imports");
    } catch (err) {
      console.error("Import failed:", err);
      alert("Import failed. Please try again.");
    }
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg"></span></div>;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-slate-50 dark:bg-slate-900">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white">Product Not Found</h1>
        <Link to="/allproducts" className="btn btn-primary mt-4">Back to Marketplace</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="text-sm breadcrumbs mb-6 text-slate-500">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/allproducts">Marketplace</Link></li>
            <li className="font-bold text-slate-900 dark:text-white">{product.name}</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Gallery Section */}
          <div className="space-y-4">
            <div className="rounded-3xl overflow-hidden bg-white dark:bg-slate-900 shadow-lg border border-slate-100 dark:border-slate-800">
              <img src={product.image || "https://placehold.co/600x400"} alt={product.name} className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-xl overflow-hidden cursor-pointer border border-transparent hover:border-blue-500 transition-all">
                  <img src={product.image} className="w-full h-20 object-cover" alt="Thumbnail" />
                </div>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-primary badge-outline font-bold">{product.category || "Commodity"}</span>
              <div className="flex items-center text-amber-400 text-sm">
                <FaStar /> <span className="ml-1 text-slate-600 dark:text-slate-400 font-semibold">{product.rating} (50+ Reviews)</span>
              </div>
            </div>

            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">{product.name}</h1>

            <div className="flex items-end gap-3 mb-6 border-b border-slate-200 dark:border-slate-800 pb-6">
              <span className="text-5xl font-black text-blue-600">${product.price}</span>
              <span className="text-slate-500 mb-2">/ unit</span>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8">
              Premium quality {product.name} sourced directly from verified suppliers in {product.country}.
              Ideal for bulk import orders with guaranteed fast shipping and secure handling.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center"><FaCheckCircle /></div>
                <div>
                  <h4 className="font-bold text-sm">In Stock</h4>
                  <p className="text-xs text-slate-500">{product.quantity} units available</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center"><FaTruck /></div>
                <div>
                  <h4 className="font-bold text-sm">Fast Shipping</h4>
                  <p className="text-xs text-slate-500">2-5 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center"><FaShieldAlt /></div>
                <div>
                  <h4 className="font-bold text-sm">Verified Seller</h4>
                  <p className="text-xs text-slate-500">{product.seller || "ImpExp Guaranteed"}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleImportClick}
                className="btn btn-primary btn-lg flex-1 rounded-xl shadow-lg shadow-blue-500/20"
              >
                Start Import Request
              </button>
              <button className="btn btn-outline btn-lg rounded-xl">Contact Seller</button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          <div className="tabs tabs-boxed bg-slate-100 dark:bg-slate-800 p-1 rounded-xl inline-flex w-full sm:w-auto">
            {['desc', 'specs', 'reviews'].map(tab => (
              <a
                key={tab}
                className={`tab tab-lg flex-1 sm:flex-none ${activeTab === tab ? 'tab-active !bg-white dark:!bg-slate-700 shadow-sm rounded-lg text-blue-600' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'desc' ? 'Description' : tab === 'specs' ? 'Specifications' : 'Reviews'}
              </a>
            ))}
          </div>

          <div className="mt-6 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
            {activeTab === 'desc' && (
              <div className="prose dark:prose-invert max-w-none">
                <h3>About this item</h3>
                <p>{product.description || "No description provided for this product. Please contact the seller for more details."}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              </div>
            )}
            {activeTab === 'specs' && (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <tbody>
                    <tr><th className="w-1/3">Origin Country</th><td>{product.country}</td></tr>
                    <tr><th>Seller</th><td>{product.seller || "Verified Partner"}</td></tr>
                    <tr><th>Stock Status</th><td>{product.quantity > 0 ? 'In Stock' : 'Out of Stock'}</td></tr>
                    <tr><th>Shipping Method</th><td>Air / Sea Freight</td></tr>
                  </tbody>
                </table>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-bold">4.8</h3>
                  <div className="flex text-amber-400"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                  <span className="text-slate-500">Based on 124 reviews</span>
                </div>
                {[1, 2].map(r => (
                  <div key={r} className="border-b border-slate-100 dark:border-slate-800 pb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                      <div>
                        <p className="font-bold text-sm">John Doe</p>
                        <div className="flex text-amber-400 text-xs"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                      </div>
                      <span className="ml-auto text-xs text-slate-400">2 days ago</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 italic">"Excellent quality product and very fast shipping. Will order again!"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Related Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <Link key={p._id} to={`/productdetails/${p._id}`} className="card bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-all border border-slate-100 dark:border-slate-800">
                <figure><img src={p.image} alt={p.name} className="h-48 w-full object-cover" /></figure>
                <div className="card-body p-4">
                  <h3 className="card-title text-base">{p.name}</h3>
                  <p className="text-blue-600 font-bold">${p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Import Modal */}
      <dialog ref={importref} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-8 rounded-3xl">
          <h3 className="font-bold text-2xl mb-4">Confirm Import</h3>
          <p className="text-slate-500 mb-6">You are about to place an order for <span className="font-bold text-slate-900 dark:text-white">{product.name}</span>.</p>

          <form onSubmit={handleOnSubmit}>
            <div className="form-control mb-6">
              <label className="label font-bold">Quantity Required</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="input input-lg input-bordered w-full"
                min="1"
                max={product.quantity}
              />
              <label className="label">
                <span className="label-text-alt text-slate-400">Available: {product.quantity}</span>
                <span className="label-text-alt font-bold text-blue-600">Total: ${(quantity * product.price).toFixed(2)}</span>
              </label>
            </div>

            {quantity > product.quantity && (
              <div className="alert alert-error text-sm py-2 mb-4">Exceeds available stock</div>
            )}

            <div className="modal-action flex gap-2">
              <button type="button" className="btn btn-ghost flex-1" onClick={handleCloseModal}>Cancel</button>
              <button type="submit" className="btn btn-primary flex-1" disabled={quantity > product.quantity || quantity <= 0}>
                Confirm Order
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ProductDetails;
