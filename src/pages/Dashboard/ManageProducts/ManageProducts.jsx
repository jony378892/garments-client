import { useState } from "react";

export default function ManageProducts() {
  const [products] = useState([]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Products</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8">
                  No products yet
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p._id}>
                  <td>
                    <div className="w-16 h-16 overflow-hidden rounded">
                      <img
                        src={p.images?.[0]}
                        alt={p.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>${p.price}</td>
                  <td>{p.availableQuantity}</td>
                  <td>
                    <button className="btn btn-sm btn-outline mr-2">
                      Edit
                    </button>
                    <button className="btn btn-sm btn-error">Delete</button>
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
