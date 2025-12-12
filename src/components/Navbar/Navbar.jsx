import { Link } from "react-router";
import Logo from "../Logo/Logo";

import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logOutUser } = useAuth();
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
        <Link to="/products">All Product</Link>
      </li>
      <li>
        <Link to="/about">About Us</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      {user ? (
        <>
          <li>
            <button className="btn btn-error ml-2" onClick={handleLogOut}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="flex-none ">
        <ul className="menu menu-horizontal px-1 items-center">{links}</ul>
      </div>
    </div>
  );
}
