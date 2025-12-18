import { useState } from "react";

export default function PendingOrders() {
  const [orders] = useState([]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Orders</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8">
                  No pending orders
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o._id}>
                  <td>{o._id}</td>
                  <td>{o.customerName}</td>
                  <td>{o.items?.length}</td>
                  <td>${o.total}</td>
                  <td>
                    <button className="btn btn-sm btn-primary mr-2">
                      View
                    </button>
                    <button className="btn btn-sm">Contact</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
