'use client'
import { assets } from "@/assets/assets"
import { useState } from "react"
import Image from "next/image"
import toast from "react-hot-toast"
import Loading from "@/components/Loading"

export default function CreateProduct() {
    const [loading, setLoading] = useState(false)
    const [productInfo, setProductInfo] = useState({
        name: "",
        description: "",
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
            // 👇 Yahan tum API call karoge
            // await fetch("/api/admin/products", { method: "POST", body: JSON.stringify(productInfo) })

            toast.success("Product added successfully!")
        } catch (err) {
            toast.error("Something went wrong!")
        } finally {
            setLoading(false)
        }
    }

    return !loading ? (
        <div className="mx-6 min-h-[70vh] my-16">
            <form
                onSubmit={onSubmitHandler}
                className="max-w-3xl mx-auto flex flex-col items-start gap-3 text-slate-500"
            >
                {/* Title */}
                <div>
                    <h1 className="text-3xl ">Add New <span className="text-slate-800 font-medium">Product</span></h1>
                    <p className="max-w-lg">Fill in the details below to add a product.</p>
                </div>

                {/* Image Upload */}
                <label className="mt-10 cursor-pointer">
                    Product Image
                    <Image
                        src={productInfo.image ? URL.createObjectURL(productInfo.image) : assets.upload_area}
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

                <p>Price</p>
                <input
                    name="price"
                    onChange={onChangeHandler}
                    value={productInfo.price}
                    type="number"
                    placeholder="Enter price"
                    className="border border-slate-300 outline-slate-400 w-full p-2 rounded"
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
                />

                <button className="bg-slate-800 text-white px-12 py-2 rounded mt-10 mb-40 active:scale-95 hover:bg-slate-900 transition">
                    Submit
                </button>
            </form>
        </div>
    ) : (
        <Loading />
    )
}
