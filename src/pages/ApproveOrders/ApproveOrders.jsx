import { useState } from "react";

export default function ApproveOrders() {
  const [orders] = useState([]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Approve Orders</h2>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="p-6 text-center text-gray-600">
            No orders to approve
          </div>
        ) : (
          orders.map((o) => (
            <div key={o._id} className="card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Order #{o._id}</div>
                  <div className="text-sm text-gray-500">{o.customerName}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn btn-sm btn-success">Approve</button>
                  <button className="btn btn-sm btn-ghost">Reject</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
