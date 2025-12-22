import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Shared/Loading";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";

const TRACKING_STATUSES = [
  "Cutting Completed",
  "Sewing Started",
  "Finishing",
  "QC Checked",
  "Packed",
  "Shipped",
  "Out for Delivery",
];

export default function ApproveOrders() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const modalRef = useRef(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    data: approvedOrders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["approved-orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/managed-products/approved-orders");
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "Cutting Completed",
      location: "",
      note: "",
    },
  });

  const openModal = (order) => {
    setSelectedOrder(order);
    reset({
      status: "Cutting Completed",
      location: "",
      note: "",
    });
    modalRef.current.showModal();
  };

  const closeModal = () => {
    modalRef.current.close();
    setSelectedOrder(null);
    reset();
  };

  const onSubmit = async (data) => {
    if (!selectedOrder) return;

    try {
      setSubmitting(true);
      const res = await axiosSecure.post(
        `/managed-products/orders/${selectedOrder._id}/track`,
        data
      );

      if (res.data.modifiedCount) {
        toast.success("Tracking update added");
        closeModal();
        refetch();
      }
    } catch (err) {
      toast.error("Failed to add tracking update");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Approved Orders</h2>

      {approvedOrders.length === 0 ? (
        <p className="text-center text-gray-500">No approved orders found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Approved Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {approvedOrders.map((order) => (
                <tr key={order._id}>
                  <td className="font-mono text-xs">{order._id}</td>
                  <td>{order.email}</td>
                  <td>{order.productName}</td>
                  <td>{order.quantity}</td>
                  <td>
                    {order.approvedAt
                      ? new Date(order.approvedAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    <button
                      onClick={() => openModal(order)}
                      className="btn btn-sm btn-primary"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-lg">
          <h3 className="font-bold text-lg mb-4">Add Tracking Update</h3>

          {selectedOrder && (
            <p className="text-sm mb-4 text-gray-600">
              Order: <strong>{selectedOrder.productName}</strong>
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control flex flex-col gap-2">
              <label className="label font-semibold">Status</label>
              <select
                className="select select-bordered"
                {...register("status", { required: true })}
              >
                {TRACKING_STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="form-control flex flex-col gap-2">
              <label className="label font-semibold">Location</label>
              <input
                className="input input-bordered"
                placeholder="Factory / Warehouse / Hub"
                {...register("location", { required: true })}
              />
              {errors.location && (
                <span className="text-error text-sm">Location is required</span>
              )}
            </div>

            <div className="form-control flex flex-col gap-2">
              <label className="label font-semibold">Note (optional)</label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Additional info..."
                {...register("note")}
              />
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={closeModal}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submitting}
              >
                {submitting ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={closeModal}>close</button>
        </form>
      </dialog>
    </div>
  );
}
