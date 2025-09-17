"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";

export default function LatestProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const displayQuantity = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/admin/products");
        const data = await res.json();

        // Saare products le lo, latest order pe
        setAllProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // sirf latest 4 dikhane ke liye slice
  const latestProducts = allProducts.slice(0, displayQuantity);

  return (
    <div className="px-6 my-20 max-w-6xl mx-auto">
      <Title
        title="Latest Products"
        description={`Showing ${
          latestProducts.length
        } of ${allProducts.length} products`}
        href="/shop"
      />

      <div className="mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12">
        {latestProducts.length > 0 ? (
          latestProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        ) : (
          <p className="text-slate-500">No products found</p>
        )}
      </div>
    </div>
  );
}
