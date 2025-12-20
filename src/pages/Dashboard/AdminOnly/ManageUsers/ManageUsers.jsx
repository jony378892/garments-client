import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaEdit, FaUserCheck, FaUserTimes } from "react-icons/fa";
import Loading from "../../../../components/Shared/Loading";
import Swal from "sweetalert2";

export default function ManageUsers() {
  const axiosSecure = useAxiosSecure();

  const {
    isLoading,
    data: users = [],
    refetch,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users");
      return result.data;
    },
  });

  const handleApproveUser = async (id) => {
    Swal.fire({
      title: "Approve the user",
      text: "You won't be able to revert this!",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/users/${id}/role`, {
            status: "approved",
          });

          if (res.data.modifiedCount) {
            Swal.fire({
              title: "User Approved!",
              text: "Successfully approved user.",
              icon: "success",
            });
            refetch();
          } else {
            Swal.fire({
              title: "Error",
              text: "Something went wrong.",
              icon: "error",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "Error approving user.",
            icon: "error",
          });
          // console.log(error)
        }
      }
    });
  };

  const handleSuspendUser = async (id) => {
    Swal.fire({
      title: "Suspend the user",
      text: "You won't be able to revert this!",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, suspend!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/users/${id}/role`, {
            status: "suspended",
          });

          if (res.data.modifiedCount) {
            Swal.fire({
              title: "User Suspended!",
              text: "Successfully suspended user.",
              icon: "success",
            });
            refetch();
          } else {
            Swal.fire({
              title: "Error",
              text: "Something went wrong.",
              icon: "error",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "Error approving user.",
            icon: "error",
          });
          // console.log(error)
        }
      }
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Users</h2>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="font-medium">{user.displayName}</div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td
                    className={`font-semibold ${
                      user.status == "approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {user.status}
                  </td>
                  <td className="flex">
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => handleApproveUser(user._id)}
                      title="Edit Role"
                    >
                      <FaUserCheck size={16} />
                    </button>
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => handleSuspendUser(user._id)}
                      title="Edit Role"
                    >
                      <FaUserTimes size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
