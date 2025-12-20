import { useMemo } from "react";
import { useLocation } from "react-router";
import { Helmet } from "react-helmet-async";

const pageTitles = {
  "/": "Home | Fabrico",
  "/about": "About | Fabrico",
  "/contact": "Contact | Fabrico",
  "/products": "Products | Fabrico",
  "/login": "Login | Fabrico",
  "/register": "Register | Fabrico",

  // Dashboard
  "/dashboard": "Dashboard | Fabrico",
  "/dashboard/all-products": "All Products | Fabrico",
  "/dashboard/all-orders": "All Orders | Fabrico",
  "/dashboard/manage-users": "Manage Users | Fabrico",
  "/dashboard/add-product": "Add Product | Fabrico",
  "/dashboard/manage-products": "Manage Products | Fabrico",
  "/dashboard/pending-orders": "Pending Orders | Fabrico",
  "/dashboard/approved-orders": "Approved Orders | Fabrico",
  "/dashboard/my-orders": "My Orders | Fabrico",
  "/dashboard/profile": "My Profile | Fabrico",
};

export default function TitleManager() {
  const { pathname } = useLocation();

  const title = useMemo(() => {
    // Exact match first
    if (pageTitles[pathname]) return pageTitles[pathname];

    // Handle dynamic routes
    if (pathname.startsWith("/product/")) return "Product Details | Fabrico";
    if (pathname.startsWith("/order-form/")) return "Order Form | Fabrico";
    if (pathname.startsWith("/dashboard/order-details/"))
      return "Order Details | Fabrico";
    if (pathname.startsWith("/dashboard/track-order/"))
      return "Track Order | Fabrico";

    return "Fabrico";
  }, [pathname]);

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}
