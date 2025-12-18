import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Shared/Loading";
import { FaEdit } from "react-icons/fa";

export default function AllProducts() {
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const result = await axiosSecure.get("/products");
      return result.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  console.log(products);

  return (
    <div>
      {products.length == 0 ? (
        <h2>No product found.</h2>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Created By</th>
                <th>Edit</th>
                <th>Show On Home</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    <figure>
                      <img
                        src={product.images[1]}
                        className="rounded-full w-14 h-14"
                        alt=""
                      />
                    </figure>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.createdBy}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => handleEditProduct(user)}
                      title="Edit Role"
                    >
                      <FaEdit size={18} />
                    </button>
                  </td>
                  <td>
                    <input type="checkbox" defaultChecked className="toggle" />
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
