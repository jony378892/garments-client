import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import Loading from "../../../../../components/Shared/Loading";

export default function OrderDetails() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data } = useQuery({
    queryKey: ["order-details", id],
    queryFn: async () => {
      const result = await axiosSecure.get(`/orders/${id}`);
      return result.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return <div>{data._id}</div>;
}
