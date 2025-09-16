'use client'
import { useEffect, useState } from "react"

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    // 👇 Filhaal dummy data use karo
    const dummyOrders = [
      { id: "ORD-101", customer: "Ali", amount: 2500, status: "Pending" },
      { id: "ORD-102", customer: "Sara", amount: 4000, status: "Shipped" },
      { id: "ORD-103", customer: "Awais", amount: 1200, status: "Delivered" },
    ]
    setOrders(dummyOrders)
    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  if (loading) return <p>Loading Orders...</p>

  return (
    <div className="p-5 text-slate-600">
      <h1 className="text-2xl mb-5">Orders</h1>
      <table className="w-full border border-slate-200 text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Customer</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr key={i} className="text-center">
              <td className="p-2 border">{order.id}</td>
              <td className="p-2 border">{order.customer}</td>
              <td className="p-2 border">Rs {order.amount}</td>
              <td className="p-2 border">{order.status}</td>
              <td className="p-2 border">
                {order.status === "Pending" && (
                  <button className="px-3 py-1 bg-green-500 text-white rounded">
                    Mark Shipped
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
