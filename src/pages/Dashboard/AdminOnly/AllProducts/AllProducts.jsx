import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loading from "../../../../components/Shared/Loading";
import ProductEditModal from "../../../../components/Shared/ProductEditModal";

export default function AllProducts() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const modalRef = useRef();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { isLoading, data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    modalRef.current?.showModal();
  };

  const handleUpdateProduct = async (data) => {
    await axiosSecure.patch(`/products/${selectedProduct._id}`, data);
    modalRef.current.close();
    setSelectedProduct(null);
    queryClient.invalidateQueries(["products"]);
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
                      className="rounded-full w-14 h-14"
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
                      checked={product.showOnHome}
                      readOnly
                    />
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => handleShowModal(product)}
                    >
                      <FaEdit size={18} />
                    </button>
                    <button className="btn btn-sm btn-ghost">
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
