import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Shared/Loading";
import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ManageUsers() {
  const axiosSecure = useAxiosSecure();
  const [selectedUser, setSelectedUser] = useState(null);

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
        } catch {
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
    const user = users.find((u) => u._id === id);
    setSelectedUser(user || { _id: id });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitSuspend = async (data) => {
    if (!selectedUser) return;
    try {
      const payload = {
        status: "suspended",
        suspendReason: data.reason,
        suspendFeedback: data.feedback || "",
      };

      const res = await axiosSecure.patch(
        `/users/${selectedUser._id}/role`,
        payload
      );

      if (res.data.modifiedCount) {
        Swal.fire({
          title: "User Suspended!",
          text: "Successfully suspended user with provided reason.",
          icon: "success",
        });
        refetch();
        reset();
        setSelectedUser(null);
      } else {
        Swal.fire({
          title: "Error",
          text: "Something went wrong.",
          icon: "error",
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Failed to suspend user.",
        icon: "error",
      });
      console.error(err);
    }
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
                  <td className="flex gap-3">
                    {user.status !== "pending" ? (
                      <p
                        className={`font-bold uppercase ${
                          user.status == "approved"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {user.status}
                      </p>
                    ) : (
                      <>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleApproveUser(user._id)}
                          title="Edit Role"
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => handleSuspendUser(user._id)}
                          title="Suspend User"
                        >
                          Suspend
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* Suspend user modal */}
        {selectedUser && (
          <dialog open className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Suspend User</h3>
              <p className="text-sm text-gray-600 mb-4">
                Provide a reason and any additional feedback for suspending{" "}
                <strong>
                  {selectedUser.displayName || selectedUser.email}
                </strong>
              </p>

              <form
                onSubmit={handleSubmit(submitSuspend)}
                className="space-y-4"
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Reason for suspension *</span>
                  </label>
                  <input
                    {...register("reason", { required: "Reason is required" })}
                    className="input input-bordered"
                    placeholder="e.g., policy violation, repeated abuse"
                  />
                  {errors.reason && (
                    <span className="text-error text-sm">
                      {errors.reason.message}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Additional feedback (optional)
                    </span>
                  </label>
                  <textarea
                    {...register("feedback")}
                    className="textarea textarea-bordered"
                    placeholder="Optional notes to store with suspension"
                  />
                </div>

                <div className="modal-action">
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      reset();
                      setSelectedUser(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-warning"
                    disabled={isSubmitting}
                  >
                    Suspend
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
}
