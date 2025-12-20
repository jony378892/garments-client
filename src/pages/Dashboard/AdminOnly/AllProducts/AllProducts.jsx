import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Shared/Loading";
import ProductEditModal from "../../../../components/Shared/ProductEditModal";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function AllProducts() {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();
  const [selectedProduct, setSelectedProduct] = useState(null);

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
      toast.success(
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

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    modalRef.current?.showModal();
  };

  const handleUpdateProduct = async (data) => {
    await axiosSecure.patch(`/products/${selectedProduct._id}`, data);
    modalRef.current.close();
    setSelectedProduct(null);
    refetch();
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
                  <td className="flex">
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => handleShowModal(product)}
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      <FaTrash size={18} />
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
              onUpdate={handleUpdateProduct}
            />
          )}
        </>
      )}
    </div>
  );
}
