import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecurity from "../../context/AuthContext/useAxiosSecurity";

export const ImportDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const axiosSecurity = useAxiosSecurity();

  useEffect(() => {
    axiosSecurity.get(`/myimports/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Failed to load import details:", err));
  }, [id, axiosSecurity]);

  if (!product) return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="p-6">
      <img
        src={product.image}
        alt={product.name}
        className="w-64 h-64 object-cover rounded-xl shadow-md mb-4"
      />
      <h1 className="text-2xl font-bold mb-2 text-white">{product.name}</h1>
      <p className="text-gray-300 font-medium">Price: {product.price}</p>
      <p className="text-gray-300">Origin: {product.country}</p>
      <p className="text-yellow-500 font-semibold">⭐ {product.rating}</p>
      <p className="text-gray-300">Quantity: {product.quantity}</p>
    </div>
  );
};
