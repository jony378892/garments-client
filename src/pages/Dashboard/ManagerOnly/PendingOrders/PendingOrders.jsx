import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Shared/Loading";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";

export default function PendingOrders() {
  const axiosSecure = useAxiosSecure();
  const {
    isLoading,
    refetch,
    data: orders = [],
  } = useQuery({
    queryKey: ["pending-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/managed-products/pending`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const handleApprove = async (id) => {
    const result = await Swal.fire({
      title: "Approve this order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Approve",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.patch(
        `managed-products/orders/${id}/approve`
      );

      if (res.data.modifiedCount) {
        refetch();
        Swal.fire("Approved!", "Order has been approved.", "success");
      }
    }
  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: "Reject this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.patch(
        `/managed-products/orders/${id}/reject`
      );

      if (res.data.modifiedCount) {
        Swal.fire("Rejected!", "Order has been rejected.", "success");
        refetch();
      }
    }
  };

  const handleView = (order) => {
    Swal.fire({
      title: "Order Details",
      html: `
        <p><b>Order ID:</b> ${order._id}</p>
        <p><b>User:</b> ${order.email}</p>
        <p><b>Product:</b> ${order.productName}</p>
        <p><b>Quantity:</b> ${order.quantity}</p>
      `,
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Pending Orders</h2>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Order Date</th>
              <th>Actions</th>
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
                <td>
                  <div className="flex flex-col items-center gap-2">
                    {order.approvalStatus === "approved" ? (
                      <p className="text-green-500 font-semibold">Approved</p>
                    ) : order.approvalStatus === "rejected" ? (
                      <p className="text-red-500 font-semibold">Rejected</p>
                    ) : (
                      <>
                        <button
                          className="btn btn-xs btn-success"
                          onClick={() => handleApprove(order._id)}
                        >
                          Approve
                        </button>

                        <button
                          className="btn btn-xs btn-error"
                          onClick={() => handleReject(order._id)}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    <button
                      className="btn btn-xs"
                      onClick={() => handleView(order)}
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {orders.length === 0 && (
        <h2 className="text-center text-gray-500 mt-20">No pending orders.</h2>
      )}
    </div>
  );
}
