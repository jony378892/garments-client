import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Shared/Loading";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

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
  const addModalRef = useRef(null);
  const viewModalRef = useRef(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: "",
      note: "",
      status: "Cutting Completed",
      dateTime: new Date(),
    },
  });

  const {
    isLoading,
    data: orders = [],
    refetch,
  } = useQuery({
    queryKey: ["approved-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/managed-products/approved-orders`);
      return res.data;
    },
  });

  const handleAddTracking = (order) => {
    setSelectedOrder(order);
    reset({
      location: "",
      note: "",
      status: "Cutting Completed",
      dateTime: new Date().toISOString().slice(0, 16),
    });
    addModalRef.current.showModal();
  };

  const handleViewTracking = (order) => {
    setSelectedOrder(order);
    viewModalRef.current.showModal();
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await axiosSecure.post(
        `/managed-products/orders/${selectedOrder._id}/tracking`,
        data
      );

      if (result.data.modifiedCount) {
        toast.success("Tracking update added successfully!");
        addModalRef.current.close();
        reset();
        refetch();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add tracking update"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAddModal = () => {
    addModalRef.current.close();
    reset();
  };

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
                <th>Tracking</th>
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
                    <div className="flex gap-2">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleAddTracking(order)}
                      >
                        Add Update
                      </button>
                      {order.tracking && order.tracking.length > 0 && (
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => handleViewTracking(order)}
                        >
                          View ({order.tracking.length})
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Tracking Modal */}
          <dialog
            ref={addModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box max-w-2xl">
              <h3 className="font-bold text-lg mb-4">Add Tracking Update</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  {/* Status */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Status *</span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      {...register("status", {
                        required: "Status is required",
                      })}
                    >
                      {TRACKING_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    {errors.status && (
                      <span className="text-error text-sm mt-1">
                        {errors.status.message}
                      </span>
                    )}
                  </div>

                  {/* Location */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Location *
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Manufacturing Unit A, Dhaka"
                      className="input input-bordered w-full"
                      {...register("location", {
                        required: "Location is required",
                        minLength: {
                          value: 3,
                          message: "Location must be at least 3 characters",
                        },
                      })}
                    />
                    {errors.location && (
                      <span className="text-error text-sm mt-1">
                        {errors.location.message}
                      </span>
                    )}
                  </div>

                  {/* Date & Time */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Date & Time *
                      </span>
                    </label>
                    <input
                      type="datetime-local"
                      className="input input-bordered w-full"
                      {...register("dateTime", {
                        required: "Date and time is required",
                      })}
                    />
                    {errors.dateTime && (
                      <span className="text-error text-sm mt-1">
                        {errors.dateTime.message}
                      </span>
                    )}
                  </div>

                  {/* Note */}
                  <div className="form-control flex flex-col gap-1">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Note (Optional)
                      </span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered h-24 w-full"
                      placeholder="Additional details about this update..."
                      {...register("note")}
                    />
                  </div>
                </div>

                <div className="modal-action">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={handleCloseAddModal}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Adding..." : "Add Update"}
                  </button>
                </div>
              </form>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button onClick={handleCloseAddModal}>close</button>
            </form>
          </dialog>

          {/* View Tracking Modal */}
          <dialog
            ref={viewModalRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box max-w-3xl">
              <h3 className="font-bold text-lg mb-4">Tracking Timeline</h3>

              {selectedOrder && (
                <div className="mb-4 p-4 bg-base-200 rounded-lg">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-semibold">Order ID:</span>{" "}
                      {selectedOrder._id}
                    </div>
                    <div>
                      <span className="font-semibold">Product:</span>{" "}
                      {selectedOrder.productName}
                    </div>
                    <div>
                      <span className="font-semibold">Customer:</span>{" "}
                      {selectedOrder.email}
                    </div>
                    <div>
                      <span className="font-semibold">Quantity:</span>{" "}
                      {selectedOrder.quantity}
                    </div>
                  </div>
                </div>
              )}

              {selectedOrder?.tracking && selectedOrder.tracking.length > 0 ? (
                <div className="space-y-4">
                  {[...selectedOrder.tracking]
                    .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
                    .map((track, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              index === 0 ? "bg-primary" : "bg-gray-300"
                            }`}
                          />
                          {index !== selectedOrder.tracking.length - 1 && (
                            <div className="w-0.5 h-full bg-gray-300 my-1" />
                          )}
                        </div>

                        <div className="flex-1 pb-8">
                          <div className="bg-base-100 border border-base-300 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-semibold text-lg">
                                {track.status}
                              </span>
                              <span className="text-xs text-gray-500">
                                {new Date(track.dateTime).toLocaleString()}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 mb-1">
                              📍 {track.location}
                            </div>
                            {track.note && (
                              <div className="text-sm mt-2 p-2 bg-base-200 rounded">
                                {track.note}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  No tracking updates yet.
                </p>
              )}

              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      )}
    </div>
  );
}
