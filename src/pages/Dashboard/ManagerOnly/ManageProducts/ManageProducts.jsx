import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Shared/Loading";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import ProductEditModal from "../../../../components/Shared/ProductEditModal";
import Swal from "sweetalert2";
import { FaSearch } from "react-icons/fa";

export default function ManageProducts() {
  const [search, setSearch] = useState("");
  const axiosSecure = useAxiosSecure();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const modalRef = useRef();
  const { user } = useAuth();

  const {
    isLoading,
    refetch,
    data: products = [],
  } = useQuery({
    queryKey: ["managed-products", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/managed-products?email=${user?.email}&searchText=${search}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (selectedProduct && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [selectedProduct]);

  if (isLoading) return <Loading />;

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete the product!",
    }).then(async () => {
      const res = await axiosSecure.delete(`/managed-products/${id}/delete`);
      // console.log(res.data);

      if (res.data.deletedCount) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      } else {
        toast.error("Something went wrong. Try again later.");
      }
    });
  };

  const handleShowModal = (product) => {
    setSelectedProduct(product);
  };

  const handleUpdate = async (updatedData) => {
    const { _id, ...updatedPayload } = updatedData;
    // console.log(updatedPayload);
    const res = await axiosSecure.patch(
      `/managed-products/${_id}/update`,
      updatedPayload
    );

    if (res.data.modifiedCount) {
      refetch();

      toast.success("Product updated successfully");
      modalRef.current.close();
    } else {
      toast.error("No changes made");
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    refetch();
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

      {products.length === 0 ? (
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
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => handleShowModal(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedProduct && (
            <ProductEditModal
              ref={modalRef}
              product={selectedProduct}
              onUpdate={handleUpdate}
            />
          )}
        </div>
      )}
    </div>
  );
}
