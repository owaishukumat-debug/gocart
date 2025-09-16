'use client'

import { assets } from "@/assets/assets"
import { useState } from "react"
import Image from "next/image"
import toast from "react-hot-toast"
import Loading from "@/components/Loading"

export default function AddProductPage() {
  const [loading, setLoading] = useState(false)
  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    mrp: "",  // New field for MRP
    price: "",
    category: "",
    stock: "",
    image: null,
  })

  const onChangeHandler = (e) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("name", productInfo.name)
      formData.append("description", productInfo.description)
      formData.append("mrp", productInfo.mrp)  // New
      formData.append("price", productInfo.price)
      formData.append("category", productInfo.category)
      formData.append("stock", productInfo.stock)

      if (productInfo.image) {
        formData.append("image", productInfo.image)
      }

      const res = await fetch("/api/admin/add-product", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()

      if (res.ok) {
        toast.success("Product added successfully!")

        // Reset form
        setProductInfo({
          name: "",
          description: "",
          mrp: "",
          price: "",
          category: "",
          stock: "",
          image: null,
        })
      } else {
        toast.error(data.error || "Something went wrong!")
      }
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong!")
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loading />

  return (
    <div className="mx-6 min-h-[70vh] my-16">
      <form
        onSubmit={onSubmitHandler}
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
            src={
              productInfo.image
                ? URL.createObjectURL(productInfo.image)
                : assets.upload_area
            }
            className="rounded-lg mt-2 h-16 w-auto"
            alt=""
            width={150}
            height={100}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setProductInfo({ ...productInfo, image: e.target.files[0] })
            }
            hidden
          />
        </label>

        <p>Product Name</p>
        <input
          name="name"
          onChange={onChangeHandler}
          value={productInfo.name}
          type="text"
          placeholder="Enter product name"
          className="border border-slate-300 outline-slate-400 w-full p-2 rounded"
          required
        />

        <p>Description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={productInfo.description}
          rows={4}
          placeholder="Enter product description"
          className="border border-slate-300 outline-slate-400 w-full p-2 rounded resize-none"
        />

        <p>MRP (Maximum Retail Price)</p>  {/* New Input */}
        <input
          name="mrp"
          onChange={onChangeHandler}
          value={productInfo.mrp}
          type="number"
          placeholder="Enter MRP"
          className="border border-slate-300 outline-slate-400 w-full p-2 rounded"
          required
        />

        <p>Selling Price</p>
        <input
          name="price"
          onChange={onChangeHandler}
          value={productInfo.price}
          type="number"
          placeholder="Enter selling price"
          className="border border-slate-300 outline-slate-400 w-full p-2 rounded"
          required
        />

        <p>Category</p>
        <input
          name="category"
          onChange={onChangeHandler}
          value={productInfo.category}
          type="text"
          placeholder="Enter category"
          className="border border-slate-300 outline-slate-400 w-full p-2 rounded"
        />

        <p>Stock Quantity</p>
        <input
          name="stock"
          onChange={onChangeHandler}
          value={productInfo.stock}
          type="number"
          placeholder="Enter stock quantity"
          className="border border-slate-300 outline-slate-400 w-full p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-slate-800 text-white px-12 py-2 rounded mt-10 mb-40 active:scale-95 hover:bg-slate-900 transition"
        >
          Submit
        </button>
      </form>
    </div>
  )
}