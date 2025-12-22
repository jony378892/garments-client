import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import { useState } from "react";
import Swal from "sweetalert2";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router";
import Loading from "../../../../components/Shared/Loading";

export default function ManageProducts() {
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    isLoading,
    refetch,
    data: products = [],
  } = useQuery({
    queryKey: ["managed-products", search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/managed-products?email=${user?.email}&searchText=${search}`
      );
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete the product!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/managed-products/${id}/delete`);
        // console.log(res.data);

        if (res.data.deletedCount) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({ title: "Cancelled", icon: "question" });
        }
      }
    });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold">Manage Products</h2>
        <label className="input">
          <FaSearch />
          <input
            type="search"
            onChange={handleSearch}
            placeholder="Search"
            className="focus:ring-0 focus:outline-none"
          />
        </label>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-44">
          <span className="loading loading-spinner"></span>
        </div>
      ) : products.length === 0 ? (
        <h2 className="text-center text-gray-500">No products found.</h2>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Payment Mode</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <th>{index + 1}</th>

                  <td>
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded" />
                    )}
                  </td>

                  <td className="font-medium">{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td className="capitalize">
                    {product.paymentMethod.replaceAll("_", " ")}
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <Link to={`/dashboard/update-product/${product._id}`}>
                        <button className="btn btn-sm btn-primary">Edit</button>
                      </Link>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
