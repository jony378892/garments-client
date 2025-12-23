import useCurrentUser from "../../../hooks/useCurrentUser";
import Loading from "../../../components/Shared/Loading";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

export default function MyProfile() {
  const { currentUser, currentUserLoading } = useCurrentUser();
  const { logOutUser } = useAuth();

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  if (currentUserLoading) {
    return <Loading />;
  }

  const {
    displayName,
    email,
    photoURL,
    role,
    status,
    createdAt,
    suspendReason,
  } = currentUser || {};

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-xl p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={photoURL}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border"
          />

          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold">{displayName}</h2>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="divider my-6"></div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium">{displayName}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="font-medium">{email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Role</p>
            <p className="font-medium capitalize">{role}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Account Status</p>
            <p className="font-medium capitalize">{status}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Suspended Feedback</p>
            <p className="font-medium capitalize">{suspendReason}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Member Since</p>
            <p className="font-medium">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex">
          <button
            className="btn btn-outline btn-error hover:text-white"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
