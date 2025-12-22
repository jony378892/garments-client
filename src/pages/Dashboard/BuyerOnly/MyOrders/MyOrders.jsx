import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Shared/Loading";
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import { Link } from "react-router";

export default function MyOrders() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    isLoading,
    refetch,
    data: orders = [],
  } = useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-orders`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Cancel this order?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.patch(`/my-orders/${id}/cancel`);
      if (res.data.modifiedCount) {
        Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
        refetch();
      } else {
        Swal.fire("Error", "Could not cancel this order.", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">My Orders</h2>
      </div>

      {orders.length === 0 ? (
        <h2 className="text-center text-gray-500">No orders found.</h2>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="font-mono text-xs">{order._id}</td>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>
                  <td>{order.status}</td>
                  <td className="capitalize">{order.paymentMethod}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Link to={`/dashboard/track-order/${order._id}`}>
                        <button className="btn btn-sm btn-primary">
                          View{" "}
                        </button>
                      </Link>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleCancel(order._id)}
                      >
                        Cancel{" "}
                      </button>
                    </div>
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
