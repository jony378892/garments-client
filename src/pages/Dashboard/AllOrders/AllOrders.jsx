import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Shared/Loading";

export default function AllOrders() {
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: orders = [] } = useQuery({
    queryKey: ["all-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">All Orders</h2>
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
                    <button className="btn btn-xs btn-ghost">View</button>
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
