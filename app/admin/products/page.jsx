'use client'

import { useState } from "react"
import { PencilIcon, TrashIcon, X } from "lucide-react"
import toast from "react-hot-toast"

export default function ManageProducts() {
    const [products, setProducts] = useState([
        { id: 1, name: "iPhone 15", description: "Latest Apple iPhone", price: 1200, category: "Mobile", stock: 10 },
        { id: 2, name: "Samsung Galaxy S23", description: "Samsung flagship", price: 999, category: "Mobile", stock: 5 },
        { id: 3, name: "MacBook Pro", description: "Apple laptop", price: 2500, category: "Laptop", stock: 3 },
    ])

    const [editingProduct, setEditingProduct] = useState(null)

    const handleDelete = (id) => {
        setProducts(products.filter(product => product.id !== id))
        toast.success("Product deleted!")
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()
        setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p))
        toast.success("Product updated successfully!")
        setEditingProduct(null)
    }

    return (
        <div className="p-6">
            {/* Heading same as Add Product */}
            <h1 className="text-3xl text-slate-500">
  Manage <span className="text-slate-800 font-medium">Products</span>
</h1>


            {/* Products Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-sm">
                    <thead className="bg-slate-100 text-slate-600">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Stock</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-t hover:bg-slate-50">
                                <td className="p-3">{product.id}</td>
                                <td className="p-3">{product.name}</td>
                                <td className="p-3">${product.price}</td>
                                <td className="p-3">{product.stock}</td>
                                <td className="p-3 flex gap-3">
                                    <button
                                        onClick={() => setEditingProduct(product)}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                                    >
                                        <PencilIcon size={14} /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                                    >
                                        <TrashIcon size={14} /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Product Modal */}
            {editingProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-lg relative shadow-lg">
                        <button
                            onClick={() => setEditingProduct(null)}
                            className="absolute top-3 right-3 text-slate-500 hover:text-slate-700"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-xl font-semibold text-slate-700 mb-4">
                            Edit <span className="text-green-600">Product</span>
                        </h2>

                        <form onSubmit={handleEditSubmit} className="flex flex-col gap-3 text-slate-600">
                            <input
                                type="text"
                                value={editingProduct.name}
                                onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                placeholder="Product Name"
                                className="border border-slate-300 rounded-lg p-2"
                            />
                            <textarea
                                rows={3}
                                value={editingProduct.description}
                                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                placeholder="Description"
                                className="border border-slate-300 rounded-lg p-2 resize-none"
                            />
                            <input
                                type="number"
                                value={editingProduct.price}
                                onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                                placeholder="Price"
                                className="border border-slate-300 rounded-lg p-2"
                            />
                            <input
                                type="text"
                                value={editingProduct.category}
                                onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                                placeholder="Category"
                                className="border border-slate-300 rounded-lg p-2"
                            />
                            <input
                                type="number"
                                value={editingProduct.stock}
                                onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                                placeholder="Stock Quantity"
                                className="border border-slate-300 rounded-lg p-2"
                            />

                            <button
                                type="submit"
                                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition mt-2"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
