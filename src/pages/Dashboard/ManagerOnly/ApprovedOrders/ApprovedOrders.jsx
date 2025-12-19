import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Shared/Loading";

export default function ApproveOrders() {
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: orders = [] } = useQuery({
    queryKey: ["approved-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/managed-products/approved-orders");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Approved Orders</h2>
      </div>

      {orders.length === 0 ? (
        <h2 className="text-center text-gray-500">No approved orders.</h2>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Order Date</th>
                <th>Tracking Info</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="font-mono text-xs">{order._id}</td>
                  <td>{order.email}</td>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
