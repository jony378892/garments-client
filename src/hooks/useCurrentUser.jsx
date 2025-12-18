import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

export default function useCurrentUser() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isLoading: currentUserLoading, data: currentUser } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);

      return res.data;
    },
  });

  return { currentUser, currentUserLoading };
}
