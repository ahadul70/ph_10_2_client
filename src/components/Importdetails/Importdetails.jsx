import { useLoaderData } from "react-router";

export const ImportDetails = () => {
  const product = useLoaderData();
  //console.log("this is imports details", product);

  return (
    <div className="p-6">
      <img
        src={product.image}
        alt={product.name}
        className="w-64 h-64 object-cover rounded-xl shadow-md mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-white-700 font-medium">Price: {product.price}</p>
      <p className="text-white-700">Origin: {product.country}</p>
      <p className="text-yellow-500 font-semibold">⭐ {product.rating}</p>
      <p className="text-white-700">Quantity: {product.quantity}</p>
    </div>
  );
};
