import React from "react";
import { PopularProducts } from "../../components/Popularproducts/PopularProducts";

const productspromise = fetch(`${import.meta.env.VITE_API_URL}/products`).then(
  (res) => res.json()
);

export default function Home() {
  return (
    <>
      <PopularProducts productspromise={productspromise}></PopularProducts>
    </>
  );
}
