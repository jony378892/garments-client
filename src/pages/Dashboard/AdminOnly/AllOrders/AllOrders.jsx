import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Shared/Loading";
import { Link } from "react-router";
import { useState } from "react";

export default function AllOrders() {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("");

  const {
    isLoading,
    refetch,
    data: orders = [],
  } = useQuery({
    queryKey: ["all-orders", filter],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?filter=${filter}`);
      return res.data;
    },
  });

  const handleFilter = (e) => {
    setFilter(e.target.value);
    refetch();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">All Orders</h2>
        <select
          defaultValue="Filter by status"
          className="select w-36"
          onChange={handleFilter}
        >
          <option disabled={true}>Filter by status</option>
          <option value="">All </option>
          <option>approved</option>
          <option>pending</option>
          <option>cancelled</option>
        </select>
      </div>

      {orders.length === 0 ? (
        <h2 className="text-center text-gray-500">No orders found.</h2>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>#</th>
                <th>Order ID</th>
                <th>User</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <th>{index + 1}</th>

                  <td className="font-mono text-xs">{order._id}</td>
                  <td>
                    <div className="font-medium">{order.email}</div>
                  </td>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>
                  <td>{order.status}</td>
                  <td>
                    <Link
                      className="hover:text-blue-500 underline underline-offset-4 "
                      to={`/dashboard/order-details/${order._id}`}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
