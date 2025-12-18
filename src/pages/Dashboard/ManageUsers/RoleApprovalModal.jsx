import React, { forwardRef } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RoleApprovalModal = forwardRef(({ user, onRoleUpdate }, ref) => {
  const axiosSecure = useAxiosSecure();

  const approveUser = async () => {
    try {
      await axiosSecure.patch(`/users/${user._id}/role`, {
        status: "approved",
      });
      onRoleUpdate();
      ref.current.close();
    } catch (error) {
      console.error("Error approving user");
    }
  };

  const rejectUser = async () => {
    try {
      await axiosSecure.patch(`/users/${user._id}/role`, {
        status: "rejected",
      });
      onRoleUpdate();
      ref.current.close();
    } catch (error) {
      console.error("Error rejecting user");
    }
  };

  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-2">User Approval</h3>

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {user.displayName || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Current Status:</span>{" "}
            <span
              className={`badge ${
                user.status === "approved"
                  ? "badge-success"
                  : user.status === "rejected"
                  ? "badge-error"
                  : "badge-warning"
              } badge-outline`}
            >
              {user.status || "pending"}
            </span>
          </p>
        </div>

        <div className="modal-action">
          <button className="btn btn-error btn-outline" onClick={rejectUser}>
            Reject
          </button>

          <button className="btn btn-success" onClick={approveUser}>
            Approve
          </button>

          <button className="btn btn-ghost" onClick={() => ref.current.close()}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
});

export default RoleApprovalModal;
