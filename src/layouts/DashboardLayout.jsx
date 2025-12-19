import { Link, Outlet } from "react-router";
import { FaHome, FaUser, FaUserCog } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { AiOutlineProduct } from "react-icons/ai";
import Logo from "../components/Shared/Logo";
import useRole from "../hooks/useRole";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout() {
  const { role } = useRole();

  return (
    <div>
      <Toaster></Toaster>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4">Fabrico Dashboard</div>
          </nav>
          <Outlet />
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow space-y-2 mt-10">
              {/* List item */}
              <li>
                <Link to="/">
                  <button
                    className="flex  items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Fabrico"
                  >
                    <FaHome size={20} />
                    <span className="is-drawer-close:hidden">Fabrico</span>
                  </button>
                </Link>
              </li>

              {role == "manager" && (
                <>
                  <li>
                    <Link to="/dashboard/add-product">
                      <button
                        className="flex  items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Add Product"
                      >
                        <FaUserCog size={20} />
                        <span className="is-drawer-close:hidden">
                          Add Product
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/manage-products">
                      <button
                        className="flex  items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Manage Products"
                      >
                        <AiOutlineProduct size={20} />
                        <span className="is-drawer-close:hidden">
                          Manage Products
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/pending-orders">
                      <button
                        className="flex  items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Pending Orders"
                      >
                        <FiPackage size={20} />
                        <span className="is-drawer-close:hidden">
                          Pending Orders
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/approved-orders">
                      <button
                        className="flex  items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Approved Orders"
                      >
                        <FiPackage size={20} />
                        <span className="is-drawer-close:hidden">
                          Approved Orders
                        </span>
                      </button>
                    </Link>
                  </li>
                </>
              )}
              {role == "admin" && (
                <>
                  {" "}
                  <li>
                    <Link to="/dashboard/manage-users">
                      <button
                        className="flex  items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Homepage"
                      >
                        <FaUserCog size={20} />
                        <span className="is-drawer-close:hidden">
                          Manage Users
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/all-products">
                      <button
                        className="flex  items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Homepage"
                      >
                        <AiOutlineProduct size={20} />
                        <span className="is-drawer-close:hidden">
                          All Products
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/all-orders">
                      <button
                        className="flex  items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Homepage"
                      >
                        <FiPackage size={20} />
                        <span className="is-drawer-close:hidden">
                          All Orders
                        </span>
                      </button>
                    </Link>
                  </li>
                </>
              )}
              {role == "buyer" && (
                <>
                  <li>
                    <Link to="/dashboard/my-orders">
                      <button
                        className="flex  items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="My Orders"
                      >
                        <AiOutlineProduct size={20} />
                        <span className="is-drawer-close:hidden">
                          My Orders
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard/track-order">
                      <button
                        className="flex  items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                        data-tip="Track Order"
                      >
                        <FiPackage size={20} />
                        <span className="is-drawer-close:hidden">
                          Track Order
                        </span>
                      </button>
                    </Link>
                  </li>
                </>
              )}

              <li>
                <Link to="/dashboard/profile">
                  <button
                    className="flex  items-center gap-2 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Profile"
                  >
                    <FaUser size={16} />
                    <span className="is-drawer-close:hidden">Profile</span>
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
