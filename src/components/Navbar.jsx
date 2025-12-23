import { Link } from "react-router";
import Logo from "./Shared/Logo";

import useAuth from "../hooks/useAuth";
import { IoMdMenu } from "react-icons/io";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logOutUser } = useAuth();
  // console.log(user);

  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        toast.success("Logout successful");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const links = (
    <>
      <div className="md:flex items-center hidden">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </div>
      <div className="flex items-center gap-3">
        {user ? (
          <>
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
              <Link className="hidden md:inline-block" to="/about">
                About Us
              </Link>
            </li>
            <li>
              <Link className="hidden md:inline-block" to="/contact">
                Contact
              </Link>
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
      <div className="flex-1 flex items-center">
        <div className="dropdown md:hidden">
          <div tabIndex={0} role="button" className="cursor-pointer">
            <IoMdMenu size={24} className="mr-2" />
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow-lg border border-gray-300"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <Logo />
      </div>
      <div className="flex-none ">
        <ul className="menu menu-horizontal px-1 items-center">{links}</ul>
      </div>
    </div>
  );
}
