import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import { useRef, useState } from "react";
import RoleApprovalModal from "./RoleApprovalModal";

export default function ManageUsers() {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users");
      return result.data;
    },
  });

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    modalRef.current?.showModal();
  };

  const handleRoleUpdate = () => {
    refetch();
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Users</h2>
        <p className="text-gray-600">View and manage user roles</p>
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
                  <td>
                    <span
                      className={`badge ${
                        user.role === "admin"
                          ? "badge-error"
                          : user.role === "manager"
                          ? "badge-warning"
                          : "badge-primary"
                      }`}
                    >
                      {user.role || "user"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        user.status === "approved"
                          ? "badge-success"
                          : "badge-warning"
                      } badge-outline`}
                    >
                      {user.status || "pending"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => handleOpenModal(user)}
                      title="Edit Role"
                    >
                      <FaEdit size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Single Modal Instance */}
      {selectedUser && (
        <RoleApprovalModal
          ref={modalRef}
          user={selectedUser}
          onRoleUpdate={handleRoleUpdate}
        />
      )}
    </div>
  );
}
