import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Shared/Loading";

const TRACKING_STEPS = [
  "Cutting Completed",
  "Sewing Started",
  "Finishing",
  "QC Checked",
  "Packed",
  "Shipped",
  "Out for Delivery",
];

export default function TrackOrder() {
  const { orderId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["order-tracking", orderId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${orderId}/tracking`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (!data) return <p className="text-center">No tracking found.</p>;

  const tracking = [...data.tracking].sort(
    (a, b) => new Date(a.dateTime) - new Date(b.dateTime)
  );

  const currentStatus = tracking.at(-1)?.status;
  const progress =
    ((TRACKING_STEPS.indexOf(currentStatus) + 1) / TRACKING_STEPS.length) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Order Summary */}
      <div className="bg-base-100 shadow rounded-lg p-4">
        <h2 className="text-xl font-bold">{data.productName}</h2>
        <p className="text-sm text-gray-600">
          Order ID: <span className="font-mono">{data.orderId}</span>
        </p>
        <p className="text-sm">Quantity: {data.quantity}</p>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>{currentStatus}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <progress
          className="progress progress-primary w-full"
          value={progress}
          max="100"
        />
      </div>

      {/* Timeline */}
      <ul className="timeline timeline-vertical">
        {tracking.map((step, i) => (
          <li key={i}>
            <div className="timeline-start text-xs text-gray-500">
              {new Date(step.dateTime).toLocaleString()}
            </div>

            <div className="timeline-middle">
              <div
                className={`w-3 h-3 rounded-full ${
                  step.status === currentStatus ? "bg-primary" : "bg-gray-300"
                }`}
              />
            </div>

            <div className="timeline-end">
              <h4 className="font-semibold">{step.status}</h4>
              <p className="text-sm text-gray-600">📍 {step.location}</p>
              {step.note && (
                <p className="text-xs text-gray-500 mt-1">{step.note}</p>
              )}
            </div>

            <hr />
          </li>
        ))}
      </ul>

      {/* Optional Map */}
      {/* <OrderMap location={tracking.at(-1)?.location} /> */}
    </div>
  );
}
