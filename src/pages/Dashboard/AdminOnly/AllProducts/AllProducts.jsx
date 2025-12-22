import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Shared/Loading";
import Swal from "sweetalert2";
import { Link } from "react-router";

export default function AllProducts() {
  const axiosSecure = useAxiosSecure();

  const {
    isLoading,
    refetch,
    data: products = [],
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  const handleProductListing = async (product) => {
    const result = await axiosSecure.patch(`/products/${product._id}/home`, {
      showOnHomepage: !product.showOnHomepage,
    });
    if (result.data.modifiedCount) {
      Swal.fire(
        `Product ${
          !product.showOnHomepage
            ? "Added on homepage"
            : "removed from homepage"
        }`
      );
      refetch();
    }
  };

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await axiosSecure.delete(`/products/${id}/delete`);

        if (result.data.deletedCount) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        } else {
          Swal.fire({
            title: "Opps!",
            text: "Something went wrong.",
            icon: "error",
          });
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="overflow-x-auto">
      {products.length === 0 ? (
        <h2>No product found.</h2>
      ) : (
        <>
          <table className="table table-zebra">
            <thead>
              <tr>
                <th></th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Created By</th>
                <th>Show On Home</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <th>{index + 1}</th>
                  <td>
                    <img
                      src={product.images?.[0]}
                      className="rounded-sm w-14 h-14"
                      alt=""
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.createdBy}</td>
                  <td>
                    <input
                      type="checkbox"
                      className="toggle"
                      checked={product.showOnHomepage}
                      onChange={() => handleProductListing(product)}
                    />
                  </td>
                  <td className="flex gap-3">
                    <Link to={`/dashboard/update-product/${product._id}/admin`}>
                      <button className="btn btn-sm btn-primary">Edit</button>
                    </Link>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
