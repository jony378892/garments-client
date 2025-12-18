import { Link } from "react-router";
import Logo from "./Shared/Logo";

import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import useCurrentUser from "../hooks/useCurrentUser";

export default function Navbar() {
  const { user, logOutUser } = useAuth();
  const { currentUser } = useCurrentUser();
  // console.log(user);

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        toast.success("Logout successfully");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/products">Products</Link>
      </li>
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <button
              className="cursor-pointer ml-3"
              popoverTarget="popover-1"
              style={{ anchorName: "--anchor-1" } /* as React.CSSProperties */}
            >
              Dashboard
            </button>

            <ul
              className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
              popover="auto"
              id="popover-1"
              style={
                { positionAnchor: "--anchor-1" } /* as React.CSSProperties */
              }
            >
              {currentUser.role === "admin" && (
                <>
                  <li>
                    <Link to="/dashboard/manage-users">User Management</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/all-product">All Product</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/all-orders">All Orders</Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/dashboard/profile">My Profile</Link>
              </li>
            </ul>
            <li>
              <button
                className="btn btn-error btn-sm ml-2"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </li>
            <figure>
              <img
                src={user.photoURL}
                alt=""
                className="rounded-full w-10 h-10 object-cover object-center"
              />
            </figure>
          </>
        ) : (
          <>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </div>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Logo />
      </div>
      <div className="flex-none ">
        <ul className="menu menu-horizontal px-1 items-center">{links}</ul>
      </div>
    </div>
  );
}
