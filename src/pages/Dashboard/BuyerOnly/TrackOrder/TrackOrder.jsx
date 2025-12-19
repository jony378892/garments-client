import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

export default function TrackOrder() {
  const { orderId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: order } = useQuery({
    queryKey: ["order", orderId, user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/my-orders/${orderId}`);
      return result.data;
    },
  });

  return <div></div>;
}
