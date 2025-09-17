"use client";
import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { assets } from "@/assets/assets"; // Tera original asset import

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    mrp: "",
    price: "",
    images: "",
    category: "",
    inStock: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For now: use temporary preview + save base64 / URL
      const imageUrl = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, images: imageUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/add-products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          mrp: parseFloat(form.mrp),
          price: parseFloat(form.price),
          images: form.images ? [form.images] : [],
          category: form.category,
          inStock: form.inStock,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to add product");
      }

      toast.success("Product added successfully!");
      setForm({
        name: "",
        description: "",
        mrp: "",
        price: "",
        images: "",
        category: "",
        inStock: true,
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("❌ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-6 min-h-[70vh] my-16">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto flex flex-col items-start gap-3 text-slate-500"
      >
        {/* Title */}
        <div>
          <h1 className="text-3xl">
            Add New <span className="text-slate-800 font-medium">Product</span>
          </h1>
          <p className="max-w-lg">Fill in the details below to add a product.</p>
        </div>

        {/* Image Upload */}
        <label className="mt-10 cursor-pointer">
          Product Image
          <Image
            src={form.images || assets.upload_area}
            className="rounded-lg mt-2 h-16 w-auto"
            alt=""
            width={150}
            height={100}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </label>

        <p>Product Name</p>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          type="text"
          placeholder="Enter product name"
          className="border border-slate-300 outline-slate-400 w-full p-2 rounded"
          required
        />

        <p>Description</p>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          placeholder="Enter product description"
          className="border border-slate-300 outline-slate-400 w-full p-2 rounded resize-none"
        />

        <p>MRP (Maximum Retail Price)</p>
        <input
          name="mrp"
          value={form.mrp}
          onChange={handleChange}
          type="number"
          placeholder="Enter MRP"
          className="border border-slate-300 outline-slate-400 w-full p-2 rounded"
          required
        />

        <p>Selling Price</p>
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          type="number"
          placeholder="Enter selling price"
          className="border border-slate-300 outline-slate-400 w-full p-2 rounded"
          required
        />

        <p>Category</p>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          type="text"
          placeholder="Enter category"
          className="border border-slate-300 outline-slate-400 w-full p-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-slate-800 text-white px-12 py-2 rounded mt-10 mb-40 active:scale-95 hover:bg-slate-900 transition"
        >
          {loading ? "Adding..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
